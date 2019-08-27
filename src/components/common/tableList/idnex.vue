/* 该组件为 LIST 页面的 表格组件 */
<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :dialog='false'
        :queryBarVisible='false'
        :popoverList='table.list'
        :popoverListKey='table.config'
        :count='table.count'
        :activeRow.sync='table.activeRow'
        @rowClickData="() => $emit('clickTableRow')"
        @handlePageChange="(val)=>$emit('handlePageChange',val)"
      ></table-component>
    </div>
    <popover-component
      :isShowPopover='popover.isShowPopover'
      :popoverType="popover.popoverType"
      :currencySelectInputKey='popover.currencySelectInputKey'
      :formConfig='popover.queryBarObj'
      :popoverListKey='popover.popoverListKey'
      :popoverList='popover.popoverList'
      :ruleForm='popover.ruleForm'
      :count='popover.count'
      :btnObj='popover.btnObj'
      :itemName='popover.itemName'
      @handleBtnClickType="tableDialogBtnSearchAndPageChange"
      @changeisShowPopover='rousePopover'
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="tableDialogBtnSearchAndPageChange"
    ></popover-component>
    <form-dialog
      popoverType='form'
      :isShowPopover.sync='formDialog.visible'
      :formData='formDialog'
      :saveLoading='formDialog.saveLoading'
    ></form-dialog>
  </div>
</template>
<script>
const tableFormComponent = '@/components/common/Table.Form.Dialog/TableComponent.vue'
export default {
  props: {
    table: {
      type: Object,
      default: () => ({
        list: [],
        config: [],
        count: 0,
        activeRow: {}
      })
    },
    formDialog: {
      type: Object,
      default: () => ({
        visible: false,
        ruleForm: {},
        formConfig: [],
        billsStatus: '',
        saveLoading: false,
        calculate: {}, // 计算属性
      })
    }
  },
  components: {
    TableComponent: () => import(tableFormComponent),
    FormDialog: () => import(tableFormComponent),
    QueryBar: () => import('@/components/common/QueryBar'),
    PopoverComponent: () => import('@/components/common/Table.Form.Dialog/DialogComponent.vue')
  }
}
</script>