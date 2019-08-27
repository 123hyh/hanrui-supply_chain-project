<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        :btnObj="btnObj"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @row-click="clickTableRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
        <el-table-column
          v-for='item in tableconfig'
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
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
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/logistics/DispatchOrder'
import utools from '@/domain/common/utools.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '深圳调度单',
    tableData: [],
    ruleForm: {},
    tableCount: 0,

    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "操作" },
      { type: "delete", label: "删除" },
    ],
    clickRow: {},
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "调度单号", moduleBind: "dispatchOrderCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "配送车次", moduleBind: "deliveryTrain", isInput: true },
        { label: "车辆", moduleBind: "plateNo", isInput: true },
        { label: "司机", moduleBind: "driver", isInput: true },
        { label: "起始时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': (data = {}) => api.querydispatchorderSearch({ ...data, ...this.ruleForm }),//data:数据，ruleForm:分页；
        'add': () => { utools.setSession('dispatchOrderForm', { jumpType: 'add' }); this.jumpForm('add') },
        'delete': () => { if (this.clickRow.dispatchOrderCode !== undefined) return api.deletedispatchorderData(this.clickRow.dispatchOrderCode) },
        'update': () => {          this.titleCallBack(async () => {
            const { data } = await api.searchDispatchOrderData(this.clickRow.dispatchOrderCode);
            utools.setSession('dispatchOrderForm', data)
            this.jumpForm('update')
          })        }
      }
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    titleCallBack (callback) {
      JSON.stringify(this.clickRow) === '{}'
        ?
        this.$message({
          center: true,
          message: '请选择一条要修改的数据',
          type: 'warning'
        })
        : callback()
    },
    jumpForm (type) {
      let params = {
        path: '/dispatchOrderForm',
        title: '调度单信息',
        data: {
          status: type,
        }
      }
      type == 'update' && (params.data.formData = this.clickRow);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "dispatchOrderForm"
      });
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
            if (JSON.stringify(this.clickRow) == '{}') {
              this.$message.warning('请选择要删除的数据')
            } else {
              utools.deleteMessage.bind(this)(async () => {
                this.titleCallBack(async () => {
                  const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
                  status === 200
                    ?
                    (
                      utools.alertMessage.bind(this)(status, null, '删除'),
                      this.handleBtnClick('search'))
                    :
                    this.$message({
                      center: true,
                      message: '删除失败，请重试',
                      type: 'error'
                    })
                })
              })
            }
          } else {
            const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
            list && (this.tableData = list, this.tableCount = count, utools.turnCodeBoolean(this.tableData));
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
    dblclickTableRow (row) {
      this.clickTableRow(row)
      this.handleBtnClick('update');
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
