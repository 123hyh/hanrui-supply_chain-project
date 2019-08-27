import _ from 'lodash';

export default function () {
    // 实体：委托订单付款信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"status": "",
		"settlementMode": "",
		"chequeNo": "",
		"paymentDate": "",
		"amount": "",
		"currency": "",
		"takeTicketDate": "",
		"ticketDueDate": "",
		"hasSettlement": "",
		"settlementAmount": "",
		"settlementCurrentcy": "",
		"exchangeRate": "",
		"orderType": ""

      };

    _.assign(this, defaults);
}
