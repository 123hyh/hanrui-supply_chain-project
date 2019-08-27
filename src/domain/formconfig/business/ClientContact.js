import validate from '@/domain/common/validate';
const { setRequired } = validate;

export default [
  {
    type: "string",
    key: "clientNo",
    name: "委托方编号",
    prop: "clientNo",
    disabled: true,
  },
  {
    type: "string",
    key: "leader",
    name: "负责人",
    prop: "leader",
    rules: setRequired()

  },
  {
    type: "string",
    key: "duty",
    name: "职务",
    prop: "duty"
  },
  {
    type: "string",
    key: "tel",
    name: "电话",
    prop: "tel",
   /*  rules: [setRequired()[0], {
      validator: validate.validateTel,
      trigger: 'blur'
    }] */
  },
  {
    type: "string",
    key: "phone",
    name: "手机",
    prop: "phone",
    rules: [setRequired()[0], {
      validator: validate.validateTel,
      trigger: 'blur'
    }]
  },
  {
    type: "string",
    key: "email",
    name: "Email",
    prop: "email",
    rules: [setRequired()[0], {
      type: 'email',
      message: '格式错误',
      trigger: 'blur',
    }]
  },
  {
    type: "string",
    key: "wxNo",
    name: "微信号",
    prop: "wxNo"
  },
  {
    type: "string",
    key: "qq",
    name: "QQ",
    prop: "qq"
  },
  {
    type: "date",
    key: "birthday",
    name: "生日",
    prop: "birthday"
  },
  {
    type: "string",
    key: "otherInfo",
    name: "其他",
    prop: "otherInfo"
  }
]