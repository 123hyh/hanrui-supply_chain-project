import _ from 'lodash';

export default function () {
    // 实体：进口报关计划单商品信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"orderNos": "",
		"goodsCode": "",
		"goodsName": "",
		"goodsModel": "",
		"goodsNameCustom": "",
		"taxNo": "",
		"attachmentNo": "",
		"parameter": "",
		"mark": "",
		"startNo": "",
		"endNo": "",
		"netWeight": "",
		"grossWeight": "",
		"brand": "",
		"sourceArea": "",
		"orderPrice": "",
		"orderCurrency": "",
		"customPrice": "",
		"quantity": "",
		"unit": "",
		"customAmount": "",
		"piece": "",
		"superviseTerm": "",
		"exemption": "",
		"remark": "",
		"originalCurrencyToRmb": "",
		"rmbPrice": "",
		"targetCurrencyToRmb": "",
		"receiveQuantity": "",
		"notRelevanceQuantity": "",
		"outputQuantity": "",
		"tariff": "",
		"vat": "",
		"transportFee": "",
		"insuranceFee": "",
		"otherFee": "",
		"totalAmount": "",
		"storageLocation": "",
		"lineNo": "",
		"notCargoQuantity": "",
		"mergeOrderNo": "",
		"exportAmountSettlement": "",
		"batchNo": "",
		"superviseMode": "",
		"customsCheck": "",
		"attachmentQuantity": ""

      };

    _.assign(this, defaults);
}
