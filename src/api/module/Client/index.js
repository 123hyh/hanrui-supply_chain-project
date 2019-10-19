export default {
	// 委托方银行信息
	getClientBlankData(data) {
		return this.getALLBankData(data);
	},
	// 新增|修改委托方银行信息
	changeClientBlankData(data) {
		return this.changeAllBankData(data);
	},
	// 删除委托方 银行信息
	deleteClientBlankData(code) {
		return this.deleteBankData(code);
	},
	// 委托方-查询
	queryclientSearch(data) {
		return this._getData({
			url: '/client/search',
			method: 'POST',
			data: this._handlePage(data)
		});
	},
	// 委托方-新增
	addclientData(data) {
		return this._getData({
			url: '/client/',
			method: 'POST',
			data
		});
	},
	// 委托方-修改
	editclientData(data) {
		return this._getData({
			url: '/client/',
			method: 'PUT',
			data
		});
	},
	// 委托方-删除
	deleteclientData(codeNo) {
		return this._getData({
			url: '/client/' + codeNo,
			method: 'DELETE'
		});
	},
	// 委托方-加载编码
	getclientCode() {
		return this._getCode('WTFX');
	},
	// 委托方-获取单条
	searchOneclientData(clientNo) {
		return this._getData({
			url: '/client/searchOne?clientNo=' + clientNo,
			method: 'GET'
		});
	},

	// 委托方-财务信息-新增
	addclientfinanceData(data = {}) {
		return this._getData({
			url: '/clientfinance/',
			method: 'POST',
			data
		});
	},
	// 委托方-财务信息-修改
	editclientfinanceData(data = {}) {
		return this._getData({
			url: '/clientfinance/',
			method: 'PUT',
			data
		});
	},
	// 委托方-财务信息-获取单条

	searchclientfinanceData(data) {
		return this._getData({
			url: '/clientfinance/search',
			method: 'POST',
			data: this._handlePage(data)
		});
	},

	//委托方加入黑名单
	addClientBlacklist(clientNo) {
		return this._getData({
			url: `/client/pullBlack/${clientNo}`,
			method: 'GET'
		});
	},
	// 分页查询 业务员
	getClientsalesmanData(data = {}) {
		return this._getData({
			url: `/clientsalesman/search`,
			method: 'POST',
			data: this._handlePage(data)
		});
	},
	// 分页查询 商务员
	getClientbusinesspartData(data = {}) {
		return this._getData({
			url: `/clientbusinesspart/search`,
			method: 'POST',
			data: this._handlePage(data)
		});
	}
};
