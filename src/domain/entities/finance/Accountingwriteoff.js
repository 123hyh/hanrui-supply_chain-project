import _ from 'lodash';

export default function () {
    // 实体：账务核销申请单
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"billNo": "",
		"bizDate": "",
		"billState": "",
		"sourceBillType": "",
		"sourceBillNo": "",
		"salesman": "",
		"delegeteBillNo": "",
		"delegete": "",
		"receiveMoney": "",
		"businessMan": "",
		"chargeItem": "",
		"applyAmount": "",
		"receiveAmount": "",
		"receiveBalance": "",
		"managerApproval": "",
		"auditor": "",
		"approvalNo": "",
		"serviceCharge": "",
		"financeApproval": "",
		"auditTime": "",
		"approvalOpinion": "",
		"financeAuditor": "",
		"financeAuditTime": "",
		"writeOffCause": "",
		"remark": "",
		"causeType": ""

      };

    _.assign(this, defaults);
}
