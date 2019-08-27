export default {
  list: [
    {
      type: 'select',
      selectKey: 'adjustST',
      selectOption: [],
      "key": "adjustmentSources",
      "name": "调整帐务来源",
      "prop": "adjustmentSources",
      "group": "1",
      isShow: true
    },
    {
      type: 'string',
      "key": "billNo",
      "name": "单据编号",
      "prop": "billNo",
      "group": "1"
    },
    {
      type: 'select',
      "selectOption": [],
      "selectKey": "orderStatus",
      "key": "billStatus",
      "name": "单据状态",
      "prop": "billStatus",
      "isShow": true,
      "group": "1"
    },
    {
      type: 'date',
      "key": "applicantDate",
      "name": "申请日期",
      "prop": "applicantDate",
      "group": "1"
    },
    {
      type: 'select',
      "selectOption": [],
      selectKey: 'applyType',
      "key": "applicantType",
      "name": "申请类型",
      "prop": "applicantType",
      "group": "1"
    },
    {
      type: 'number',
      "key": "adjustmentAmount",
      "name": "调整总金额",
      "prop": "adjustmentAmount",
      "group": "1"
    },
    {
      btn: true,
      type: 'string',
      readonly: true,
      "key": "applicanterName", /* applicanter */
      "name": "申请人",
      "prop": "applicanterName",
      "isShowPopover": true,
      "readonly": true,
      "group": "1"
    },
    {
      type: 'string',
      "key": "applicantDept",/* applicantDept */
      "name": "申请部门",
      "prop": "applicantDept",
      "isShowPopover": true,
      "readonly": true,
      "group": "1"
    },
    {
      type: 'checkbox',
      "key": "receiptTax",
      "name": "收到税票",
      "prop": "receiptTax",
      "group": "1"
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      "key": "companyName", /* company */
      "name": "公司",
      "prop": "companyName",
      "isShowPopover": true,
      "readonly": true,
      "group": "1",
      isShow: true,
    },
    {
      "selectOption": [],
      type: 'select',
      "selectKey": "settlementUnitType",
      "key": "settlementUnitType",
      "name": "结算单位类型",
      "prop": "settlementUnitType",
      "group": "1",
      isShow: true
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      "key": "settlementUnitName", /* settlementUnit */
      "name": "结算单位",
      "prop": "settlementUnitName",
      "isShowPopover": true,
      "readonly": true,
      "group": "1",
      isShow: true
    },
    {
      type: 'string',
      btn: true,
      readonly: true,
      "key": "clientName",/* client */
      "name": "委托方",
      "prop": "clientName",
      "isShowPopover": true,
      "readonly": true,
      "group": "1",
      isShow: true
    },
    {
      type: 'select',
      "selectOption": [],
      "selectKey": "currencyName",
      "key": "currency",
      "name": "币别",
      "prop": "currency",
      "group": "1",
      isShow: true
    },
    {
      type: 'textarea',
      "key": "remark",
      "name": "备注",
      "prop": "remark",
      "group": "1"
    },
  ],
  otherConfig: {
    '1': {
      visibel: true
    }
  }
}
