<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">

      <!-- 查询栏 -->
      <query-bar
        :ruleForm="queryBar.data"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleQueryBarBtnClick"
      ></query-bar>
      <!-- 表格 -->

      <table-component
        :queryBarVisible='false'
        :dialog='false'
        :popoverList='table.list'
        :popoverListKey='table.config'
        :count='table.count'
        :activeRow.sync='table.activeRow'
        @handlePageChange="handlePageChange"
      ></table-component>
      <!-- 上传弹窗 -->
      <upload-dialog :form='table.activeRow' :visible.sync='uploadVisible' :isDocumentsManagement='true' @updateTableData='getTableData'></upload-dialog>
    </div>
  </div>
</template>
<script>

import api from '@/assets/js/appHelper.js'
import { mapGetters } from 'vuex'
import utools from '@/domain/common/utools.js'
const { isNull } = utools;

export default {
  created () {
    this.getTableData()
  },
  components: {
    QueryBar: () => import('@/components/common/QueryBar'),
    TableComponent: () => import('@/components/common/Table.Form.Dialog/TableComponent.vue'),
    UploadDialog: () => import('@/components/common/upload/UploadDialog.vue')
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: '单据编号', moduleBind: 'billNo', isInput: true },
        { label: '单证（附件）类型', moduleBind: 'attachType', isSelect: true },
        { label: '单据状态', moduleBind: 'status', selectOption: this.orderStatus, isSelect: true },
        { label: '委托单号', moduleBind: 'entrustOrderNo', isInput: true },
        { label: '单证(附件)名', moduleBind: 'attachName', isInput: true }
      ]
    }
  },
  data: _ => ({
    queryBar: {
      data: {},

    },
    table: {
      list: [],
      config: [
        { prop: 'billNo', label: '单据编号' },
        { prop: 'statusName', label: '单据状态' },
        { prop: 'attachNavigation', label: '单证导航' },
        { prop: 'attachTypeName', label: '附件业务类型' },
        { prop: 'entrustOrderNo', label: '委托订单号' },
        { prop: 'attachName', label: '单证名(附件名)' },
        { prop: 'attachSize', label: '单证(附件)大小(KB)' },
        { prop: 'attachRemark', label: '单证(附件)说明' },
        { prop: 'attachUrl', label: '存储位置' },
        { prop: 'updateTime', label: '存储时间' }
      ],
      count: 25,
      activeRow: {}
    },
    uploadVisible: false
  }),

  methods: {

    // 获取表格分页数据
    async getTableData (pageData) {
      try {
        const { data: { list, count } } = await api.getAttachmentPageData({ ...pageData, ...this.queryBar.data });
        this.table = { ...this.table, list, count }
      } catch (error) {
        console.log(error)
      }
    },
    // 查询栏点击按钮事件
    handleQueryBarBtnClick (type) {
      switch (type) {
        case 'search':
          this.getTableData(); break;
        case 'update':
          if (isNull(this.table.activeRow)) {
            return this.$message.warning('请选择一条数据操作！')
          };
          this.updateBill(); break;
      }
    },

    // 修改单据
    updateBill () {
      this.uploadVisible = true
    },

    // 表格分页事件
    handlePageChange (pageData = {}) {
      this.getTableData(pageData)
    }
  }
}
</script>