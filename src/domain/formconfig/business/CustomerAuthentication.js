import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
  {
    title: "企业认证信息", showline: true, list: [
      {
        type: "string",
        key: "companyName",
        name: "公司名称",
        prop: "companyName",
        disabled: true,
        rules,
      },
      {
        type: "string",
        key: "jc",
        name: "简称",
        prop: "jc",
        rules,
      },
      {
        type: "string",
        key: "sjfl",
        name: "商机分类",
        prop: "sjfl",
        rules,
      },
      {
        type: "string",
        key: "hzzt",
        name: "合作状态",
        prop: "hzzt",
        rules,
      },
      {
        type: "string",
        key: "yyzz",
        name: "营业执照编码",
        prop: "yyzz",
        rules,
      },
      {
        type: "string",
        key: "registeredAddress",
        name: "注册地址",
        prop: "registeredAddress",
        rules,
      },
      {
        type: "string",
        key: "companyNature",
        name: "企业性质",
        prop: "companyNature",
        rules,
      },
      {
        type: "string",
        key: "industry",
        name: "所属行业",
        prop: "industry",
        rules,
      },
      {
        type: "string",
        key: "zczj",
        name: "注册资金(万)",
        prop: "zczj",
        rules,
      },
      {
        type: "string",
        key: "zcbb",
        name: "注册币别",
        prop: "zcbb",
        rules,
      },
      {
        type: "string",
        key: "contacts",
        name: "企业联系人",
        prop: "contacts",
        rules,
      },
      {
        type: "string",
        key: "phone",
        name: "企业电话",
        prop: "phone",
        rules,
      },
    ]
  },
  {
    title: "个人认证信息", showline: true, list: [
      {
        type: "string",
        key: "name",
        name: "负责人姓名",
        prop: "name",
        disabled: true,
        rules,
      },
      {
        type: "string",
        key: "post",
        name: "职务",
        prop: "post",
        rules,
      },
      {
        type: "string",
        key: "mobile",
        name: "电话",
        prop: "mobile",
        rules,
      },
      {
        type: "string",
        key: "email",
        name: "邮箱",
        prop: "email",
        rules,
      },
      {
        type: "string",
        key: "drzh",
        name: "登入帐号",
        prop: "drzh",
        rules,
      },
      {
        type: "string",
        key: "admin",
        name: "管理员",
        prop: "admin",
        rules,
      },
      {
        type: "string",
        key: "active",
        name: "帐号激活",
        prop: "active",
        rules,
      },
      {
        type: "string",
        key: "disable",
        name: "帐号禁用",
        prop: "disable",
        rules,
      },
    ]
  },
  {
    title: "收资资料", showline: true, list: [
      {
        type: "string",
        key: "shdz",
        name: "收货地区",
        prop: "shdz",
        disabled: true,
        rules,
      },
      {
        type: "string",
        key: "shr",
        name: "收货人",
        prop: "shr",
        rules,
      },
      {
        type: "string",
        key: "dh",
        name: "电话",
        prop: "dh",
        rules,
      },
      {
        type: "string",
        key: "sj",
        name: "手机",
        prop: "sj",
        rules,
      },
    ]
  },
  {
    title: "网上客户受理", showline: true, list: [
      {
        type: "string",
        key: "zjdr",
        name: "主接单人",
        prop: "zjdr",
        rules,
      },
      {
        type: "string",
        key: "zgdr",
        name: "主跟单人",
        prop: "zgdr",
        rules,
      },
      {
        type: "string",
        key: "yjgs",
        name: "业绩归属业务员",
        prop: "yjgs",
        rules,
      },
      {
        type: "string",
        key: "wjgsq",
        name: "业绩归属有效期至",
        prop: "wjgsq",
        rules,
      },
      {
        type: "string",
        key: "jzfl",
        name: "记帐分类",
        prop: "jzfl",
        rules,
      },
      {
        type: "string",
        key: "jsbb",
        name: "结算币别",
        prop: "jsbb",
        rules,
      },
      {
        type: "string",
        key: "zq",
        name: " 帐期",
        prop: "zq",
        rules,
      },
      {
        type: "string",
        key: "sjbhq",
        name: "商机保护截止日期",
        prop: "sjbhq",
        rules,
      },
    ]
  }
]