<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">

      <!-- 查询栏 -->
      <query-bar
        :formConfig="queryBar.queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>

      <!-- 表格 -->
      <table-component
        :dialog='false'
        :popoverList='table.list'
        :popoverListKey='table.config'
        :count='table.count'
        :activeRow.sync='table.activeRow'
        @handlePageChange='handlePageChange'
      ></table-component>

      <!-- 表单弹窗 -->
      <form-dialog
        :itemName='formDialog.title'
        :isShowPopover.sync='formDialog.visible'
        popoverType='form'
        :formData='formDialog.formData'
        :saveLoading='formDialog.saveLoading'
        @formClickPreservation='handleFormDialogSave'
      ></form-dialog>
    </div>
  </div>
</template>
<script>

import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import utools from '@/domain/common/utools.js'
const { isNull } = utools;

export default {
  components: {
    QueryBar,
    TableComponent,
    FormDialog: TableComponent
  },
  data: _ => ({
    queryBar: {
      queryBarFormConfig: [
        { label: '盘点单号', moduleBind: 'b', isInput: true },
        { label: '盘点方案名称', moduleBind: 'c', isInput: true },
        { label: '计划开始时间', moduleBind: 'd', isDate: true },
        { label: '~', moduleBind: 'e', isDate: true },
      ],
      data: {}
    },
    table: {
      list: [],
      config: [
        { prop: 'id', label: '盘点单号' },
        { prop: 'code', label: '盘点方案名称' },
        { prop: 'name', label: '仓库名称' },
        { prop: 'x', label: '计划开始时间' },
        { prop: 'y', label: '计划结束时间' },
        { prop: 'z', label: '执行状态' },
        { prop: 'w', label: '创建人' },
        { prop: 'q', label: '创建时间' },
        { prop: 'a', label: '备注' },
      ],
      count: 0,
      activeRow: {}
    },
    formDialog: {
      formData: {
        ruleForm: {},
        formConfig: [
          { type: 'string', key: 'a', prop: 'a', name: '盘点单号' },
          { type: 'string', key: 'b', prop: 'b', name: '盘点方案名称' },
          { type: 'string', key: 'c', prop: 'c', name: '仓库名称' },
          { type: 'date', key: 'd', prop: 'd', name: '计划开始时间' },
          { type: 'date', key: 'e', prop: 'e', name: '计划结束时间' },
          { type: 'select', key: 'f', prop: 'f', name: '执行状态', selectKey: '', selectOption: [] },
          { type: 'textarea', key: 'g', prop: 'g', name: '备注', layout: `flex-basis: 91%; height: auto !important` }
        ]
      },
      visible: false,
      title: '盘点方案',
      saveLoading: false
    }
  }),
  methods: {

    // 查询栏按钮点击
    handleBtnClickType (type) {
      switch (type) {
        case 'add':
          this.formDialog.visible = true, this.table.activeRow = {}; break;
        case 'update':
          if (isNull(this.table.activeRow)) return this.$message.warning('请选择一条数据进行操作');
      }
    },

    // 表格分页事件
    handlePageChange () { },

    // 表单弹窗保存
    handleFormDialogSave () {
      this.formDialog.visible = false;
    }
  }
}
</script>