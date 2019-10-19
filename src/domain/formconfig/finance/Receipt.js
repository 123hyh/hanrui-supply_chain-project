import validate from "@/domain/common/validate";
const rules = validate.setRequired();
export default {
  list: [
    {
      type: "string",
      key: "billNo",
      name: "单据编号",
      prop: "billNo",
      readonly: true,
      group: "1"
    },
    // {
    //   type: 'string',
    //   btn: true,
    //   key: "companyName",
    //   name: "公司",
    //   prop: "companyName",
    //   isShowPopover: true,
    //   readonly: true,
    //   group: '1',
    // },
    {
      btn: true,
      type: "string",
      key: "actualReceiptCompanyName",
      name: "收款公司",
      prop: "actualReceiptCompanyName",
      isShowPopover: true,
      group: "1",
      readonly: true,
      rules: [
        {
          required: true,
          message: "必填",
          trigger: "blur"
        }
      ]
    },
    {
      type: "date",
      key: "receivedDate",
      name: "到账日期",
      prop: "receivedDate",
      group: "1",
      rules: [
        {
          required: true,
          message: "必填",
          trigger: "blur"
        }
      ]
    },
    {
      selectOption: [],
      type: "select",
      selectKey: "miscFeeCategory",
      key: "receiptsAndPaymentsType",
      name: "收付类别",
      group: "1",
      prop: "receiptsAndPaymentsType",
      rules
    },
    // {
    //   type: 'number',
    //   key: "immediateBalance",
    //   name: "即时余额",
    //   group: '1',
    //   prop: "immediateBalance"
    // },
    {
      selectOption: [],
      type: "select",
      selectKey: "collectionType",
      key: "receiptsType",
      name: "收款类型",
      prop: "receiptsType",
      group: "1",
      rules: [
        {
          required: true,
          message: "必填",
          trigger: "blur"
        }
      ]
    },
    {
      selectOption: [],
      type: "select",
      selectKey: "currencyName",
      key: "moneyType",
      name: "币别",
      prop: "moneyType",
      group: "1",
      rules: [
        {
          required: true,
          message: "必填",
          trigger: "blur"
        }
      ]
    },
    {
      type: "number",
      key: "receiptsAmount",
      name: "收款金额",
      prop: "receiptsAmount",
      group: "1",
      rules
    },
    {
      type: "number",
      key: "exchangeRate",
      name: "汇率",
      disabled: true,
      prop: "exchangeRate",
      group: "1",
      rules
    },
    {
      type: "calculate",
      readonly: true,
      key: "baseCurrency",
      name: "折本位币",
      disabled: true,
      prop: "baseCurrency",
      group: "1",
      rules
    },
    {
      btn: true,
      type: "string",
      key: "receiverAccountName",
      name: "收款账户",
      prop: "receiverAccountName",
      isShowPopover: true,
      group: "1",
      readonly: true,
      rules
    },
    {
      type: "string",
      key: "receiveBank",
      name: "收款银行",
      prop: "receiveBank",
      group: "1",
      rules
    },
    {
      selectOption: [],
      type: "select",
      selectKey: "receivablesSubject",
      key: "receiverSubject",
      name: "收款科目",
      prop: "receiverSubject",
      group: "1"
    },
    {
      type: "select",
      selectKey: "businessType",
      selectOption: [],
      key: "bizType",
      name: "业务种类",
      group: "1",

      prop: "bizType"
    },
    {
      selectOption: [],
      type: "select",
      selectKey: "settlementMethod",
      key: "settlementMethod",
      name: "结算方式",
      group: "1",

      prop: "settlementMethod"
    },
    {
      group: "1",

      type: "string",
      key: "settlementNo",
      name: "结算号",
      prop: "settlementNo"
    },
    {
      group: "1",

      btn: true,
      type: "string",
      key: "flowedInPlannedItemName",
      name: "流入计划项目",
      prop: "flowedInPlannedItemName",
      isShowPopover: true,
      readonly: true
    },
    {
      group: "1",

      btn: true,
      type: "string",
      key: "departmentName",
      name: "部门",
      prop: "departmentName",
      isShowPopover: true,
      readonly: true
    },
    {
      group: "1",

      type: "string",
      key: "repulseOpinion",
      name: "打回意见",
      prop: "repulseOpinion"
    },
    {
      group: "1",

      btn: true,
      type: "string",
      key: "flowedOutPlannedItemName",
      name: "流出计划项目",
      prop: "flowedOutPlannedItemName",
      isShowPopover: true,
      readonly: true
    },
    {
      group: "1",
      btn: true,
      type: "string",
      key: "costCenterName",
      name: "成本中心",
      prop: "costCenterName",
      isShowPopover: true,
      readonly: true
    },
    {
      group: "1",

      selectOption: [],
      selectKey: "payerType",
      type: "select",
      key: "payerType",
      name: "付款人类型",
      prop: "payerType",
      rules
    },
    {
      group: "1",
      btn: true,
      type: "string",
      key: "payerName" /* payer */,
      name: "付款人名称",
      prop: "payerName",
      rules
    },
    {
      group: "1",
      btn: true,
      type: "string",
      key: "paymentAccountName",
      name: "付款账户",
      prop: "paymentAccountName",
      isShowPopover: true,
      readonly: true,
      rules
    },
    {
      group: "1",
      type: "string",
      key: "paymentBank",
      name: "付款银行",
      prop: "paymentBank",
      rules
    },
    {
      group: "1",
      type: "string",
      key: "bankNo",
      name: "银行账号",
      prop: "bankNo",
      rules
    },

    {
      group: "1",

      btn: true,
      type: "string",
      key: "projectName",
      name: "项目",
      prop: "projectName",
      isShowPopover: true,
      readonly: true
    },
    {
      group: "1",

      type: "string",
      key: "projectManager",
      name: "项目经理",
      prop: "projectManager"
    },
    {
      group: "1",

      type: "checkbox",
      key: "attachment",
      name: "附件",
      prop: "attachment"
    },
    {
      group: "1",
      type: "select",
      key: "otherPaymentSubject",
      selectKey: "receivablesSubject",
      selectOption: [],
      name: "对方(付款)科目",
      prop: "otherPaymentSubject"
    },
    {
      group: "1",

      type: "string",
      key: "summary",
      name: "摘要",
      prop: "summary"
    },
    {
      group: "1",
      type: "string",
      key: "paymentCustomerName",
      name: "打款客户",
      prop: "paymentCustomerName"
    },
    {
      group: "1",
      type: "checkbox",
      key: "billReceive",
      name: "票据收款",
      prop: "billReceive"
    },
    {
      selectOption: [],
      type: "select",
      selectKey: "currencyName",
      key: "originalMoneyType",
      name: "原币币别",
      prop: "originalMoneyType",
      group: "1",
      disabled: true
    },
    {
      group: "1",
      type: "number",
      key: "recognizedMoneyAmount",
      name: "已认款金额",
      disabled: true,
      prop: "recognizedMoneyAmount"
    },
    {
      group: "1",
      type: "number",
      key: "originalSettlementExchangeRate",
      name: "原币结算汇率",
      disabled: true,
      prop: "originalSettlementExchangeRate",
    },
    {
      group: "1",
      type: "calculate",
      key: "originalMoneyAmount",
      name: "原币金额",
      disabled: true,
      prop: "originalMoneyAmount"
    },
    {
      group: "1",

      selectOption: [],
      type: "select",
      selectKey: "orderStatus",
      key: "billState",
      name: "单据状态",
      prop: "billState",
      isShow: true
    },

    {
      group: "1",

      type: "string",
      key: "billCreator",
      name: "制单人",
      prop: "billCreator",
      isShow: true
    },
    {
      group: "1",

      type: "date",
      key: "billCreateDate",
      name: "制单日期",
      prop: "billCreateDate",
      isShow: true
    },
    {
      group: "1",

      type: "string",
      key: "auditor",
      name: "审核人",
      prop: "auditor",
      isShow: true
    },
    {
      group: "1",

      type: "date",
      key: "auditDate",
      name: "审核日期",
      prop: "auditDate",
      isShow: true
    },
    {
      group: "1",
      btn: true,
      type: "string",
      key: "cashierName",
      name: "出纳",
      prop: "cashierName"
    },
    {
      group: "1",
      btn: true,
      type: "string",
      key: "accountingName",
      name: "会计",
      prop: "accountingName"
    },
    {
      group: "1",
      type: "select",
      selectKey: "typeOfExpense",
      selectOption: [],
      key: "feeType",
      name: "费用类型",
      prop: "feeType"
    },
    {
      group: "1",
      type: "textarea",
      key: "remark",
      name: "备注",
      prop: "remark"
    }
  ]
};
