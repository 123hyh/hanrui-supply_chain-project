export default [
// 	{
// 		type: "string",
// 		key: "agreementNo",
// 		name: "协议编号",
// 		prop: "agreementNo",
// 		disabled: true,
// 	},
	{
		type: "string",
		key: "email",
		name: "授权邮箱",
		prop: "email",
		rules: [{
			type: 'email',
			message: '邮箱错误',
			trigger: 'blur'
		}]
	},
	/* {
		type: "checkbox",
		key: "status",
		name: "状态",
		prop: "status"
	} */
]