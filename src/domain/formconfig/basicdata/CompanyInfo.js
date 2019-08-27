import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
  {
    type: "string",
    key: "companyCode",
    name: "公司编码",
    prop: "companyCode",
    readonly: true,
    rules
  },
  {
    type: "string",
    btn: true,
    key: "parentName",
    name: "公司",
    prop: "parentName",
    readonly: true,
    /*  rules:[
       {required: true, message: '必填'}
     ] */
  },
  {
    type: "string",
    key: "companyName",
    name: "名称",
    prop: "companyName",
    rules
  },
  {
    type: "string",
    key: "registNumber",
    name: "注册号/税号",
    prop: "registNumber",
    rules
  },
  {
    type: "select",
    selectOption: [],
    key: "province",
    name: "省",
    prop: "province",
    rules
  },
  {
    type: "select",
    selectOption: [],
    key: "city",
    name: "市",
    prop: "city",
    rules
  },
  {
    type: "select",
    selectOption: [],
    key: "district",
    name: "区县",
    prop: "district",
    rules
  },
  {
    type: "string",
    key: "address",
    name: "详细地址",
    prop: "address",
    rules
  },
  {
    type: "string",
    key: "corporate",
    name: "法人代表",
    prop: "corporate",
    rules
  },
  {
    type: "number",
    key: "registFund",
    name: "注册资金(万)",
    prop: "registFund",
    rules: [{
      validator: validate.validateNum,
      trigger: ['blur', 'change']
    }],
    rules
  },
  {
    type: "string",
    key: "scope",
    name: "经营范围",
    prop: "scope"
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "companyStatus",
    key: "companyStatus",
    name: "状态",
    prop: "companyStatus"
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "companyType",
    key: "companyType",
    name: "类型",
    prop: "companyType"
  },
  {
    type: "date",
    key: "registTime",
    name: "注册日期",
    prop: "registTime"
  },
  {
    type: "string",
    key: "registDepart",
    name: "登记机关",
    prop: "registDepart"
  },
  {
    type: "select",
    selectOption: [],
    selectKey: "buildType",
    key: "buildType",
    name: "办公楼类型",
    prop: "buildType"
  },
  {
    type: "string",
    key: "telephone",
    name: "电话",
    prop: "telephone",
    rules
  },
  {
    type: "string",
    key: "fax",
    name: "传真",
    prop: "fax"
  },
  {
    type: "string",
    key: "companyLicense",
    name: "营业执照",
    prop: "companyLicense"
  },
  {
    type: "string",
    key: "website",
    name: "公司网址",
    prop: "website",
    rules: [{
      validator: validate.validateUrl,
      trigger: 'blur'
    }]
  },
  {
    type: "string",
    key: "email",
    name: "E-MAIL",
    prop: "email",
    rules: [{
      type: "email",
      message: "格式错误",
      trigger: 'blur'
    }]
  },
  {
    type: "textarea",
    key: "remark",
    name: "备注",
    prop: "remark"
  }
]