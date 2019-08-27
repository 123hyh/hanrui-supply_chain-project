import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
/* 	{
		type: 'string',
		key: "itemCode",
		name: "表业务主键编号",
		prop: "itemCode"
	},
	{
		type: 'string',
		key: "customerNo",
		name: "编码",
		prop: "customerNo"
	}, */
	{
		type: 'string',
		key: "contact",
		name: "联系人",
    prop: "contact",
    rules
	},
	{
		type: 'string',
		key: "tel",
		name: "办公电话",
		prop: "tel"
	},
	{
		btn: true,
		readonly:true,
		type: 'string',
		key: "dispatchLineName",
		name: "发运路线",
    prop: "dispatchLineName",
    rules
	},
	{
		type: 'string',
		key: "receiveArea",
		name: "收货区域",
    prop: "receiveArea",
    rules
	},
	{
		type: 'string',
		key: "areaCode",
		name: "区域编码",
		prop: "areaCode"
	},
	{
		type: 'string',
		key: "receiveShortName",
		name: "收货公司简称",
		prop: "receiveShortName"
	},
	{
		btn: true,
		readonly:true,
		type: 'string',
		key: "receiveCompanyName",
		name: "收货公司",
    prop: "receiveCompanyName",
    rules
	},
	{
		type: 'string',
		key: "destination",
		name: "目的地",
    prop: "destination",
    rules
	},
	{
		type: 'string',
		key: "duty",
		name: "职务",
		prop: "duty"
	},
	{
		type: 'string',
		key: "phone",
		name: "移动电话",
    prop: "phone",
    rules
	},
	{
		type: 'string',
		key: "fax",
		name: "传真",
		prop: "fax"
	},
	{
		type: 'string',
		key: "email",
		name: "E-mail",
		prop: "email"
	},
	{
		type: 'string',
		key: "postcode",
		name: "邮政编码",
		prop: "postcode"
	},
	{
		selectOption: [],
		type: 'select',
		key: "province",
		name: "省份",
		prop: "province"
	},
	{
		selectOption: [],
		type: 'select',
		key: "city",
		name: "市",
		prop: "city"
	},
	{
		selectOption: [],
		type: 'select',
		key: "county",
		name: "区县",
		prop: "county"
	},
	{
		type: 'string',
		key: "contactAddress",
		name: "联系地址",
    prop: "contactAddress",
    rules
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	/* {
		selectOption: [],
		type: 'select',
		key: "auditStatus",
		name: "审核状态",
		prop: "auditStatus"
	}, */
	{
		selectOption: [],
		type: 'select',
		key: "bizType",
		name: "业务类型",
		prop: "bizType",
		selectKey: 'businessType'
	},
	/* {
		type: 'string',
		key: "reviewPerson",
		name: "复核人",
		prop: "reviewPerson"
	},
	{
		type: 'date',
		key: "reviewTime",
		name: "复核时间",
		prop: "reviewTime"
	}, */
	/* {
		type: 'checkbox',
		key: "review",
		name: "是否复核",
		prop: "review"
	} *//* ,
	{
		selectOption: [],
		type: 'select',
		key: "status",
		name: "状态",
		prop: "status",
		selectKey: 'orderStatus'
	} */
]