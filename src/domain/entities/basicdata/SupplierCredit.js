import _ from 'lodash';

export default function () {
    // 实体：供应商信用评估
    let defaults = {
		"id": "",
		"tenantId": "",
		"supplierCode": "",
		"creditCode": "",
		"creditType": "",
		"processMode": "",
		"supplierType": "",
		"verifyResult": "",
		"supplierDesc": "",
		"relieveTerm": false,
		"relievePerson": "",
		"operatePerson": ""

      };

    _.assign(this, defaults);
}
