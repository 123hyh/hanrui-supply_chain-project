<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarConfig"
        :btnObj="btnObj"
        @handleBtnClickType="handleBtnClick"
        @queryBarPopSearch="queryBarPopSearch"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :tableData='tableData'
        :tableDataKey='tableconfig'
        :activeRow.sync='clickRow'
        @handleDbclickTable='handleDbclickTable'
      ></table-component>
      <!-- 分页 -->
      <div class="pagination">
        <pagination
          @handlePageChange="handleChange"
          :count="tableCount"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
// 组件
import TableComponent from '@/components/common/TabTable.vue'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'


import tableconfig from '@/domain/tableconfig/finance/SubscriptionOrder'
import utools from '@/domain/common/utools.js'
const { isNull } = utools;
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    QueryBar,
    TableComponent,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '认款单',
    tableData: [],
    ruleForm: {},
    tableCount: 0,
    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "修改" },
      { type: "delete", label: "删除" },
    ],
    clickRow: {},
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarConfig () {
      return [
        { label: "委托单号", moduleBind: "billNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', selectOption: this.orderStatus, isSelect: true },
        // { label: "状态", moduleBind: "status", selectOption: [], selectKey: 'paymentStatus', isSelect: true },
        { label: "公司", moduleBind: "company", isInput: true, /* btn: true */ },
        { label: "收款单号", moduleBind: "receiptNo", isInput: true, /* btn: true  */ },
        { label: "客户", moduleBind: "customName", isInput: true,/*  btn: true  */ },
        { label: "创建时间", moduleBind: "createTime", isDate: true },
        { label: "至", moduleBind: "endTime", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': (data = {}) => api.querysubscriptionorderSearch({ ...data, ...this.ruleForm }),//data:数据，ruleForm:分页；
        'add': () => { this.goEditPage('add') },
        'delete': () => { if (this.clickRow.billNo !== undefined) return api.deletesubscriptionorderData(this.clickRow.billNo) },
        'update': () => { this.goEditPage('update') }
      }
    },
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    handleDbclickTable(){
      this.clickTypeAsync.update()
    },
    // 跳转到编辑页
    goEditPage (type) {
      if (type === 'update' && isNull(this.clickRow)) {
        this.$message({
          type: 'warning',
          message: '请选中一条数据'
        });
        return;
      }
      let param = {
        path: '/SubscriptionOrderForm',
        data: {
          status: type,
        },
        title: '认款单信息'
      };
      type === 'update' && (param.data.code = this.clickRow.billNo)
      this.addbreadCrumbsList(param);
      this.$router.push('/SubscriptionOrderForm')

    },
    // 搜索栏弹窗
    queryBarPopSearch (key) {
      console.log(key)
    },
    titleCallBack (callback) {
      JSON.stringify(this.clickRow) === '{}'
        ?
        this.$message({
          center: true,
          message: '请选择一条数据再操作',
          type: 'warning'
        })
        : callback()
    },
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
      if (clickType) {
        if (clickType === 'update' || clickType === 'add') {
          this.clickTypeAsync[clickType]();
        } else {
          if (clickType === 'delete') {
            this.titleCallBack(async () => {
              const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
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
            })
          } else {
            const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
            list && (this.tableData = list, this.tableCount = count);
          }
        }
      }
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

  created () {
    this.handleBtnClick('search');
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
