import _ from 'lodash';

export default function () {
    // 实体：调度单子表-委托信息
    let defaults = {
		"consignee": "",
		"delegeteBillNo": "",
		"deliveryNo": "",
		"sendLine": "",
		"deliveryTimeSegment":"",
		"transportTimeEfficiency":""
      };

    _.assign(this, defaults);
}
