import _ from 'lodash';

export default function () {
    // 实体：关务监管条件
    let defaults = {
		"id": "",
		"tenantId": "",
		"billCode": "",
		"billName": "",
		"billAbb": "",
		"siImport": false,
		"siExport": false,
		"siFollow": false,
		"remark": ""

      };

    _.assign(this, defaults);
}
