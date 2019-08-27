import _ from 'lodash';

export default function () {
    // 实体：事务类型
    let defaults = {
		"id": "",
		"transactionCode": "",
		"bizType": "",
		"biType": "",
		"srType": "",
		"transactionName": "",
		"status": "",
		"outType": "",
		"inType": "",
		"outStatus": "",
		"inStatus": "",
		"outStock": "",
		"inCost": "",
		"outCost": "",
		"unit": ""

      };

    _.assign(this, defaults);
}
