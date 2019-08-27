import _ from 'lodash';

export default function () {
	// 实体：深圳入库子表
	let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"delegeteBillNo": "",
		"inventoryCode": "",
		"inventoryName": "",
		"specificationType": "",
		"goodsName": "",
		"taxNo": "",
		"taxName": "",
		"attachNo": "",
		"param": "",
		"plannedVehicleOrder": "",
		"batchNo": "",
		"supplierBatchNo": "",
		"brand": "",
		"brandName": "",
	};

	_.assign(this, defaults);
}
