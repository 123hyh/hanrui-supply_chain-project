import _ from 'lodash';

export default function () {
    // 实体：仓库使用授权
    let defaults = {
		"id": "",
		"authWarehouseCode": "",
		"authWarehouseName": "",
		"warehouseNo": "",
		"fiscalYear": "",
		"period": "",
		"initEnd": false,
		// "status": false

      };

    _.assign(this, defaults);
}
