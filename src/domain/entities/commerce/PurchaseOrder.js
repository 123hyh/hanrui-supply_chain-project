import _ from 'lodash';

export default function () {
    // 实体：采购订单
    let defaults = {
		"id": null,
		"tenantId": null,
		"purchaseOrderNo": "",
		"bizDate": "",
		"clientCode": "",
		"clientName": "",
		"salesmanId": "",
		"salesmanName": "",
		"bizType": "",
		"dealMode": "",
		"settlementMode": "",
		"status": null,
		"supplierCode": "",
		"supplierName": "",
		"followPersonId": "",
		"followPersonName": "",
		"reportGateType": "",
		"trusteeReceivableMode": "",
		"contractNo": "",
		"entrustOrderNo": "",
		"sourceBillType": "",
		"customerCode": "",
		"customerName": "",
		"purchaseUnitCode": "",
		"purchaseUnitName": "",
		"tradeMode": "",
		"chargeMode": "",
		"receiveOrganizationCode": "",
		"receiveOrganizationName": "",
		"storageCode": "",
		"storageName": "",
		"sellerCurrency": "",
		"buyerCurrency": "",
		"tallyPersonId": "",
		"tallyPersonName": "",
		"customerOrderNo": "",
		"orderRemark": "",
		"followRemark": "",
		"apGoodsAmountSum": "",
		"orderAmount": "",
		"currency": "",
		"payMode": "",
		"auditor": "",
		"auditTime": ""

      };

    _.assign(this, defaults);
}
