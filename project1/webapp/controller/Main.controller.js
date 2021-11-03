sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox'
    
], function (Controller, JSONModel, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("project1.controller.Main", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
        },
        // 클릭했을 때 detail로 넘어가기 
		onListItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				productPath = oEvent.getSource().getBindingContext("bookservice").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {layout: oNextUIState.layout, product: product});

			var oItem = oEvent.getSource();
			oItem.setNavigated(true);
			var oParent = oItem.getParent();
            this.iIndex = oParent.indexOfItem(oItem);
        },
        // 검색 기능 
		onSearch: function (oEvent) {
            // build filter array
			var oTableSearchState = [],
		        sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState.push(new Filter("title", FilterOperator.Contains, sQuery));
            }

            // filter binding
           this.getView().byId("bookserviceTable").getBinding("items").filter(oTableSearchState);

		}
	});
}, true);
