export default {
	// 查询欠款明细分页
	getArrearsList(data = {}) {
		return this._getData({
			url: `/receivesettlement/searchArrearsDetails`,
			method: 'POST',
			data: this._handlePage(data)
		});
	},
	// 导出欠款明细Excel报表
	exportArrears(data) {
		return this._getData({
			url: `/receivesettlement/exportArrearsDetails`,
			method: `POST`,
			data,
			responseType: 'blob'
		});
	}
};
