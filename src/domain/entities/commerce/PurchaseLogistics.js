import _ from 'lodash';

export default function () {
    // 实体：采购订单物流信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"purchaseOrderNo": "",
		"supplierDeliveryTime": "",
		"contactId": "",
		"contactName": "",
		"tel": "",
		"receiveBoxQuantity": "",
		"cardBoardQuantity": "",
		"chequeAmount": "",
		"deliveryAddress": "",
		"goodsDesc": "",
		"delegeteBillNo": "",
		"entryNo": "",
		"specificationType": "",
		"inventoryName": "",
		"inventoryCode": "",
		"unit": "",
		"quantity": "",
		"deliverUnitCode": "",
		"deliverUnitName": "",
		"clientContactId": "",
		"clientContactName": "",
		"contactTel": "",
		"area": ""

      };

    _.assign(this, defaults);
}
