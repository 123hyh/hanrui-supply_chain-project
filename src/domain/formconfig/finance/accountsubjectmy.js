export default [
	{
		title: "", showtitle: true, hurdles: [
			{
				name: "inputobj",
				type: "input",
				label: " 科目编号"
			},
			{
				name: "inputobj",
				type: "input",
				label: "科目名称"
			},
			{
				name: "inputobj",
				type: "input",
				label: "科目名称"
			},
			{
				name: "selectobj",
				type: "select",
				label: "科目类别",
				options: [
					{
						value: "1",
						label: "下拉一"
					},
					{
						value: "2",
						label: "下拉二"
					}
				]
			},
			{
				name: "radioobj",
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
				name: "selectobj",
				type: "select",
				label: "科目格式",
				options: [
					{
						value: "1",
						label: "下拉一"
					},
					{
						value: "2",
						label: "下拉二"
					},
					{
						value: "3",
						label: "下拉二"
					}
				]
			},
			{
				name: "switchobj",
				type: "switch",
				label: "日记帐"
			},
			{
				name: "switchobj",
				type: "switch",
				label: "外币核算"
			},
			{
				name: "selectobj",
				type: "select",
				label: "币种",
				options: [
					{
						value: "1",
						label: "下拉一"
					},
					{
						value: "2",
						label: "下拉二"
					},
					{
						value: "3",
						label: "下拉二"
					}
				]
			},
			{
				name: "switchobj",
				type: "switch",
				label: "数量管理"
			},
			{
				name: "selectobj",
				type: "select",
				label: "单位",
				options: [
					{
						value: "1",
						label: "下拉一"
					},
					{
						value: "2",
						label: "下拉二"
					},
					{
						value: "3",
						label: "下拉二"
					}
				]
			},
			{
				name: "switchobj",
				type: "switch",
				label: "期未调汇"
			},
			{
				name: "inputobj",
				type: "input",
				label: " 助记码"
			},
			{
				name: "textareaobj",
				type: "textarea",
				label: "科目说明",
				big: true
			}]
	},
	{
		title: "辅助核算", showtitle: true, hurdles: [
			{

				name: "radioobj",
				type: "radio",
				label: "项目",
				options: [
					{
						value: "1",
						label: "单一核算项目"
					},
					{
						value: "2",
						label: "多核算项目"
					}
				]
			},
			{
				name: "checkboxobj",
				type: "checkbox",
				label: "项目",
				options: [
					{
						value: "1",
						label: "往来单位"
					},
					{
						value: "2",
						label: "部门"
					},
					{
						value: "2",
						label: "人员"
					}
				]
			},
			{
				name: "inputbuttonobj",
				type: "inputbutton",
				label: "核算项目"
			},
			{
				name: "inputobj",
				type: "input",
				label: "项目备注"
			},
			{
				name: "switchobj",
				type: "switch",
				label: "科目有效"
			}
		]
	}
]