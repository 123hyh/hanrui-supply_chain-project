export default {
	visible: false,
	title: '商品信息',
	content: {
		fromConfig: {
			data: {},
			config: [
			  {
				itemtitle: "来货",
				isitemtitle: true,
				itemconfig: [
				  {
            name: "unitName",
            type: "inputbutton",
            label: "来货编码"
				  },
				  {
					name: "subjectName",
					label: "科目名称",
					type: "input"
				  },
				  {
					name: "subjectType",
					label: "科目类别",
					type: "select",
					selectapi: "subjectType",
					options: []
				  },
				  {
					name: "balanceAspect",
					type: "radio",
					label: "余额方向",
					options: [
					  {
						value: "1",
						label: "借方"
					  },
					  {
						value: "2",
						label: "贷方"
					  }
					]
				  },
				  {
					name: "subjectFormat",
					label: "科目格式",
					type: "select",
					selectapi: "subjectFormat",
					options: []
				  },
				  {
					name: "accountingByDaty",
					type: "switch",
					label: "日记帐"
				  },
				  {
					name: "externalCurrencyAccounting",
					type: "switch",
					label: "外币核算"
				  },
				  {
					name: "currency",
					label: "币种",
					type: "select",
					selectapi: "currencyName",
					options: []
				  },
				  {
					name: "quantityManage",
					type: "switch",
					label: "数量管理"
				  },
				  {
					name: "unitName",
					type: "inputbutton",
					label: "单位"
				  },
				  {
					name: "changeRateTermEnd",
					type: "switch",
					label: "期未调汇"
				  },
				  {
					name: "memoCode",
					label: "助记码",
					type: "input"
				  },
				  {
					name: "subjectRemark",
					type: "textarea",
					label: "科目说明",
					big: true,
				  }
				],
				show:'',// 不显示
				edit:'', // 不编辑
			  },
			  {
				itemtitle: "附加",
				isitemtitle: true,
				itemconfig: [
				  {
					name: "accountingItem",
					label: "核算",
					type: "select",
					selectapi: "accountingItem",
					options: []
				  },
				  {
					name: "dealings",
					type: "switch",
					label: "往来单位"
				  },
				  {
					name: "department",
					type: "switch",
					label: "部门"
				  },
				  {
					name: "person",
					type: "switch",
					label: "人员"
				  },
				  {
					name: "accountingItemName",
					type: "inputbutton",
					label: "核算项目"
				  },
				  {
					name: "itemRemark",
					type: "textarea",
					label: "项目备注",
					big: true
				  },
				  {
					name: "effective",
					type: "switch",
					label: "科目有效"
				  }
				],
			  }
			],
		},
		buttonConfig: [{
			name:'cancel',
			lable: '取消',
			type: ''
		}, {
			name:'call',
			lable: '确定',
			type: 'primary'
		}],
	}
}
