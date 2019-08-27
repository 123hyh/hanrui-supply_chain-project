import validate from '@/domain/common/validate';
export default [
// 	{
// 		type: "string",
// 		key: "solutionNo",
// 		name: "方案编号",
// 		prop: "solutionNo",
// 		disabled: true,
// 	},
	{
		type: "string",
		key: "start",
		name: "大于等于",
		prop: "start",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "end",
		name: "小于",
		prop: "end",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "rate",
		name: "费率",
		prop: "rate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	}
]