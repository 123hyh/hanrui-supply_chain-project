import _ from 'lodash';

export default function () {
    // 实体：管制品申请表
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"controlledGoodsCode": "",
		"formDate": "",
		"singlePrice": "",
		"documentType": "",
		"totalValue": "",
		"entrustOrderNo": "",
		"category": "",
		"model": "",
		"applicant": "",
		"applicantName": "",
		"brand": "",
		"brandName": "",
		"copies": "",
		"singleNubs": "",
		"currency": "",
		"receiptNo": "",
		"applyDate": "",
		"hasApproval": false,
		"noFinalCustomer": false,
		"description": "",
		"preClassNo": "",
		"ccats": "",
		"hasApprovalDate": "",
		"entryPerson": "",
		"remark": ""

      };

    _.assign(this, defaults);
}
