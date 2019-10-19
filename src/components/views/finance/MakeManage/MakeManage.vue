<template>
  <div class="make-manage">
    <!-- 单据操作按钮 -->
    <!--    @handlePreserve="handlePreserve"
      @handleRollback="handleRollback" -->
    <preserve-btn
      :form="bottomForm"
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- 按钮 -->
    <div>
      <FormComponent
        :formConfig='query.config'
        :formModel='query.data'
      ></FormComponent>
    </div>
    <!-- 按钮 和表格 -->
    <center-table
      ref='center_table'
      :tableChecked='tableChecked'
      @handleItemBtnClick='handleItemBtnClick'
    ></center-table>
    <!-- 底部 form组件 -->
    <bottom-form
      :tableChecked='tableChecked'
      :form='bottomForm'
      @handlerFormVerify_bottom='
        item=> 
      formVerify_bottom = item'
    ></bottom-form>
  </div>
</template>

<script>
const rules = [{ required: true, message: "必填", trigger: 'change' }],
  bottomFormConfig = {
    list: [
      {
        type: 'radio',
        group: '1',
        key: 'goodsDetail',
        name: '按明细开票',
        radioOption: [
          { label: '0', name: '商品' },
          { label: '1', name: '开票' }
        ],
        rules
      },
      {
        type: 'select', key: 'projectPpportion', name: '项目分摊', selectOption: [
          { itemKey: '1', itemValue: '分摊到第一项' },
          { itemKey: '2', itemValue: '分摊到最大金额' }
        ],
        group: '1',
        rules
      },
      {
        type: 'select', key: 'makeOutAnInvoiceRate', name: '开票税率',
        selectOption: [
          { itemKey: '1', itemValue: '增值税票13%' },
          { itemKey: '2', itemValue: '普通票6%' },
          { itemKey: '3', itemValue: '运输费9%' },
        ],
        group: '1',
        rules
      },
      // 开票信息 -- 购买方
      { type: 'string', key: 'name', name: '名称', group: '2', rules },
      { type: 'string', key: 'identifyNo', name: '纳税人识别号', group: '2' },
      { type: 'string', key: 'site', name: '地址', group: '2', rules },
      { type: 'string', key: 'phone', name: '电话', group: '2' },
      { type: 'string', key: 'openAnAccountBank', name: '开户行', group: '2', rules },
      { type: 'string', key: 'account', name: '账号', group: '2', rules }
    ],
    otherConfig: {
      title: {
        '1': {
          text: '开票设置',
          visible: true
        },
        '2': {
          text: '开票信息 -- 购买方',
          visible: true
        }
      }
    }
  }
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import BtnComponent from '@/components/common/BtnComponent.vue'

import CenterTable from '@/components/views/finance/MakeManage/CenterTable.vue'
import BottomForm from '@/components/views/finance/MakeManage/BottomForm.vue'

import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'

export default {

  computed: {},

  data: _ => ({
    isLoading: false,
    // bottom_form校验
    formVerify_bottom: {},
    // 查询栏集合
    query: {
      data: {},
      config: [
        { type: 'string', key: 'entrustOrderNo', name: '委托订单号' },
        {
          type: 'select', key: 'businessType', name: '业务类型', selectOption: [
            { itemKey: '1', itemValue: '单抬头' },
            { itemKey: '2', itemValue: '双抬头' },
            { itemKey: '3', itemValue: '本港贸易' },
            { itemKey: '4', itemValue: '国内贸易' },
          ]
        },
        { type: 'string', key: 'purchaseUnit', name: '购货单位', btn: true },
        {
          type: 'select', key: 'status', name: '状态', selectOption: [
            { itemKey: '1', itemValue: '已开票' },
            { itemKey: '2', itemValue: '未开票' }
          ]
        },
        { type: 'date', key: 'applyOfStartTime', name: '申请时间：起', },
        { type: 'date', key: 'applyOfEndTime', name: '止' },

      ]
    },

    // 表格多选选中的数据
    tableChecked: {
      selectData: [],
      apportion: []
    },
    // 底部表单
    bottomForm: {
      data: {},
      config: utools.cloneObj(bottomFormConfig)
    },
  }),
  methods: {
    /* -----------------------------------按钮事件 start-------------------------------------- */
    handleItemBtnClick (clickType) {
      debugger
    },
    /* -----------------------------------按钮事件  end -------------------------------------- */
  },
  components: {
    FormComponent,
    BtnComponent,
    CenterTable,
    BottomForm
  }
}
</script>
<style lang="less">
.make-manage {
  .item-btn-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 100px;
    padding: 0 50px;
  }
  .border {
    display: block;
    content: "";
    border-bottom: 1px solid #dcdfe6;
  }
  .radio .el-form-item__error {
    right: -50px;
  }
  .center-table::before {
    .border;
  }
  .center-table::after {
    .border;
  }
  .el-checkbox__label {
    display: none;
  }
  .total-layout {
    display: flex;
    justify-content: space-evenly;
    margin: 20px 0;
  }
}
</style>