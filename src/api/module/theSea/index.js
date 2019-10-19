export default {
	/* 越海接口 */
	_setTheSea(url, data) {
		// 过滤空值参数
		if (Object.prototype.toString.call(data)) {
			let param = {};
			for (let key in data) {
				if (data.hasOwnProperty(key) && data[key] !== '')
					param[key] = data[key];
			}
			data = param;
		}

		return this._getTheSeaData({
			url,
			method: 'POST',
			data: this._handlePage(data)
		});
	},
	// 获取入库明细分页
	getWarehousingDetailData(data) {
		return this._setTheSea('/extInstorage/search', data);
	},
	// 出库分页
	getOutboundDetailsData(data) {
		return this._setTheSea('/extOutstorage/search', data);
	},
	// 即使库存分页
	getJustInTimeInventoryData(data) {
		return this._setTheSea('/extInventory/search', data);
	}
};
