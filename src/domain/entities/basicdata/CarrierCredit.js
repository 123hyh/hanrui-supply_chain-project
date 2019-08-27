import _ from 'lodash';

export default function () {
    // 实体：承运商信用评估
    let defaults = {
		"id": "",
		"tenantId": "",
		"carrierCode": "",
		"creditCode": "",
		"creditType": "",
		"supplierType": "",
		"processMode": "",
		"verifyResult": "",
		"supplierDesc": "",
		"relieveTerm": "",
		"relievePerson": "",
		"operatePerson": ""

      };

    _.assign(this, defaults);
}
