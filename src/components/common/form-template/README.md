## 该组件 为 新的 表单 渲染模版 versions: 1.0;

## 数据结构模版如下
 {
  list: [
    {
      type: 'string',
      key: "arrivalCountryCode", 
      name: "编码", 
      prop: "arrivalCountryCode",
      group: 1, 
      order: 0,
      isShow: true,
      disabled: true,
      readonly: true
    },
    {
      type: 'string',
      key: "arrivalCountryCode",
      name: "编码",
      prop: "arrivalCountryCode",
      group: 2,
      order: 1
    }
    ],
    otherConfig: {
      title: {
        1: { 
          text: '委托方', // 分割线的文本内容
          visible: false // 是否显示分割线
        },
      }
    }
 } || []
##  数据结构 可以为 Object 和 Array

##  类型 为 Object时 视为 分组 Form( 子项配置中加入 group声明归纳到第几组 )

####配置说明

### list { Array } 表单的配置
  ## type { String } 输入框的类型 {calculate, checkbox, date, label, number, select, string, time, Ttextarea}
  ## key { String } v-model绑定的formData中的键
  ## name { String } 输入框的label值
  ## group { Number } 归纳到 form的 分组 
  ## order { Number } 当前 输入框 在 分组中的位置
  ## isShow { Boolean } 是否显示当前 输入框
  ## disabled { Boolean } 是否禁用当前 输入框
  ## readonly { Boolean } 当前输入框 是否可以输入

### otherConfig { Object }
  ### title { Object } 分割线的配置 
   ## 1  {String}
    text {String} 文本显示内容
    visible {Boolean} 是否显示当前分割线


---------------------------------------------------------------------
## 注意事项
1: 如果 需要 滚动条 完全显示 请把 box宽度 设为 auto;
2: 表单验证  在 utools 文件当中 的 testFormValidate方法 里面 处理单个;
