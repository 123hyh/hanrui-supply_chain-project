import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default {
  list: [
    {
      type: 'string',
      key: "organizationName",
      name: "财务组织名称",
      prop: "organizationName",
      readonly: true,
      btn: true,
      rules,
      group: '1'
    },
    {
      selectOption: [],
      type: 'select',
      key: "chargeUpType",
      name: "记帐分类",
      prop: "chargeUpType",
      selectKey: 'classificationOfAccounts',
      rules,
      group: '1'
    },
    {
      type: 'select',
      key: "settlementCurrency",
      name: "结算币种",
      prop: "settlementCurrency",
      selectOption: [],
      selectKey: 'currencyName',
      group: '1',
      rules
    },
    {
      selectOption: [],
      type: 'select',
      key: "settlementMode",
      name: "结算方式",
      prop: "settlementMode",
      selectKey: 'settlementMethod', group: '1',
      rules
    },
    {
      selectOption: [],
      type: 'select',
      key: "payMode",
      name: "付款方式",
      prop: "payMode",
      selectKey: 'payMode', group: '1',
      rules
    },
    {
      key: "receivableTerm",
      type: 'select',
      selectOption: [],
      selectKey: 'receivePayCondition',
      name: "收款条件",
      prop: "receivableTerm", group: '1',
      rules
    },
    {
      type: 'string',
      key: "contact",
      name: "会计联系人",
      prop: "contact", group: '1'
    },
    {
      type: 'string',
      key: "contactDuty",
      name: "联系人职务",
      prop: "contactDuty", group: '1'
    },
  
    {
      type: 'string',
      key: "phone",
      name: "移动电话",
      prop: "phone", group: '1'
    },
  ],
  otherConfig: {
    title: {
      '1': {
        visible: false
      }
    },
    slot: {
      '2': {
        visible: true
      }
    }
  }
}