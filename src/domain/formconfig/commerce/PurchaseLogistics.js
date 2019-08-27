import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		text: true,
		key: "itemCode",
		name: "表业务主键编号",
		prop: "itemCode"
	},
	{
		text: true,
		key: "purchaseOrderNo",
		name: "采购订单编号",
		prop: "purchaseOrderNo"
	},
	{
		date: true,
		key: "supplierDeliveryTime",
		name: "供应商计划交货时间",
		prop: "supplierDeliveryTime"
	},
	{
		text: true,
		key: "contactId",
		name: "交货联系人id",
		prop: "contactId"
	},
	{
		text: true,
		key: "contactName",
		name: "交货联系人",
		prop: "contactName"
	},
	{
		text: true,
		key: "tel",
		name: "交货联系电话",
		prop: "tel"
	},
	{
		text: true,
		key: "receiveBoxQuantity",
		name: "计划收货箱数",
		prop: "receiveBoxQuantity",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		text: true,
		key: "cardBoardQuantity",
		name: "计划卡板数",
		prop: "cardBoardQuantity",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: true,
		text: true,
		key: "chequeAmount",
		name: "支票金额",
		prop: "chequeAmount",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		text: true,
		key: "deliveryAddress",
		name: "交货地点",
		prop: "deliveryAddress"
	},
	{
		text: true,
		key: "goodsDesc",
		name: "监管商品描述",
		prop: "goodsDesc"
	},
	{
		text: true,
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo"
	},
	{
		text: true,
		key: "entryNo",
		name: "委托单分录号",
		prop: "entryNo"
	},
	{
		text: true,
		key: "specificationType",
		name: "规格型号",
		prop: "specificationType"
	},
	{
		text: true,
		key: "inventoryName",
		name: "存货名称",
		prop: "inventoryName"
	},
	{
		text: true,
		key: "inventoryCode",
		name: "存货编码",
		prop: "inventoryCode"
	},
	{
		text: true,
		key: "unit",
		name: "计量单位",
		prop: "unit"
	},
	{
		text: true,
		key: "quantity",
		name: "数量",
		prop: "quantity",
		rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		text: true,
		key: "deliverUnitCode",
		name: "发货方编码",
		prop: "deliverUnitCode"
	},
	{
		text: true,
		key: "deliverUnitName",
		name: "发货方名称",
		prop: "deliverUnitName"
	},
	{
		text: true,
		key: "clientContactId",
		name: "联系人id",
		prop: "clientContactId"
	},
	{
		text: true,
		key: "clientContactName",
		name: "联系人姓名",
		prop: "clientContactName"
	},
	{
		text: true,
		key: "contactTel",
		name: "联系人电话",
		prop: "contactTel"
	},
	{
		text: true,
		key: "area",
		name: "所在区域",
		prop: "area"
	}
]