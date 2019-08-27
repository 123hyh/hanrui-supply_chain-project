import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "billCode",
		name: "随附单据编码",
		prop: "billCode",
		readonly: true,
		rules
	},
	{
		type: 'string',
		key: "billName",
		name: "随附单据名称",
		prop: "billName",
		rules
	},
	{
		type: 'string',
		key: "billAbb",
		name: "简称",
		prop: "billAbb",
		rules
	},
	{
		type: 'checkbox',
		key: "siImport",
		name: "是否进口",
		prop: "siImport"
	},
	{
		type: 'checkbox',
		key: "siExport",
		name: "是否出口",
		prop: "siExport"
	},
	{
		type: 'checkbox',
		key: "siFollow",
		name: "是否关注",
		prop: "siFollow"
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]