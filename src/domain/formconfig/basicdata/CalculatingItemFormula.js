import validate from '@/domain/common/validate';
const rules = validate.setRequired()
const layout = 'flex-basis: 91%; margin-top: 20px; height: auto !important'
export default {
  list: [
    { type: 'string', key: 'formulaName', name: '公式名称', group: 1,rules },
    {
      type: 'select',
      key: 'status',
      selectKey: 'status',
      selectOption: [],
      name: '使用状态',
      group: 1,rules
    },
    {
      type: 'select',
      key: 'formulaBill',
      selectKey: 'formulaBill',
      selectOption: [],
      name: '取值单据',
      group: 1,rules
    },
    {
      type: 'textarea',
      key: 'formulaDes',
      name: '公式描述',
      layout,
      width: 10,
      group: 2,rules
    },
    {
      type: 'textarea',
      key: 'formula',
      name: '公式',
      layout,
      width: 10,
      group: 2,rules
    }
  ],
  otherConfig: {
    title: {
      '1': {
        visible: false
      },
      '2': {
        visible: true
      }
    }
  }
}
