<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> {{$route.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :tableData="tableData"
        :tableDataKey="tableconfig"
        :isShowTabTable="true"
        @TableClickRowData="clickTableRow"
      ></table-component>
      <!-- 分页 -->
      <pagination
        @handlePageChange="handleChange"
        :count="tableCount"
      ></pagination>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'
import TableComponent from "@/components/common/TabTable.vue";

import tableconfig from '@/domain/tableconfig/logistics/Szreceiving.js'
import utools from '@/domain/common/utools.js'

import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    QueryBar,
    Pagination,
    TableComponent
  },
  data: () => ({
    tableconfig,
    tableData: [],
    ruleForm: {},
    tableCount: 0,

    clickRow: {},
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "billNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: '委托单号', moduleBind: 'delegeteBillNo', isInput: true },
        { label: "名称", moduleBind: "name", isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': (data = {}) => api.getSzreceivingList({ ...data, ...this.ruleForm }),
        'delete': () => {
          if (this.clickRow.billNo !== undefined) {
            return api.deleteSzreceivingData(this.clickRow.billNo)
          };
          utools.alertMessage.call(this, '', '请选择一条数据')
        },
      }
    }
  },
  created () {
    this.handleBtnClick('search');
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    async handleBtnClick (clickType, page) {
      /**
       * 1	处理形参为空，
       * 2	点击修改时 直接调用，避免报错;
       * 3	其余点击 走异步；
       * 4	当点击未删除时，判断 status是否为 200 alert 删除信息是否成功
       */
      try {
        if (clickType) {
          if (clickType === 'update' || clickType === 'add') {
            this.jumpForm(clickType)
          } else {
            const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
            list && (this.tableData = list, this.tableCount = count);
            if (clickType === 'delete') {
              status === 200
                ?
                (this.$message({
                  center: true,
                  message: '删除成功',
                  type: 'success'
                }),
                  this.handleBtnClick('search'))
                :
                this.$message({
                  center: true,
                  message: '删除失败，请重试',
                  type: 'error'
                })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    jumpForm (type) {
      if (type === 'update' && !this.clickRow.billNo) {
        utools.alertMessage.call(this, '', '请选择一条数据操作');
        return;
      }
      let params = {
        path: "/SzreceivingForm",
        title: '深圳收货单信息',
        data: {
          status: type
        }
      }
      type == "update" && (params.data.formData = this.clickRow)
      this.addbreadCrumbsList(params)
      this.$router.push({ path: `SzreceivingForm` })
    },
    handleChange (param) {
      this.handleBtnClick('search', param)
    },
    clickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.clickRow))) {
        this.clickRow = row;
      }
    },
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
