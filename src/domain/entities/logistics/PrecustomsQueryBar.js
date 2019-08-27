import _ from 'lodash';

export default function () {
    // 实体：待报关列表
    let defaults = {
		"entrustOrderNo": "",
		"godownEntryNo": "",
		"warehouseNo": "",
		"customsFormType": "",
      };

    _.assign(this, defaults);
}
