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
      <table-component
        :tableData="tableData"
        :tableDataKey="tableconfig"
        :isShowTabTable="true"
        @TableClickRowData="clickTableRow"
        @handleDbclickTable="handleDbclickTable"
      ></table-component>
      <!-- 分页 -->
      <pagination @handlePageChange="handleChange" :count="tableCount"></pagination>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'
import TableComponent from "@/components/common/TabTable.vue";

import tableconfig from '@/domain/tableconfig/commerce/PurchaseOrder'
import utools from '@/domain/common/utools.js'

import { mapMutations, mapGetters } from 'vuex';
export default {
  props: {
    btnObj: {
      type: Array,
      default: () => [
        // 暂时
        { label: "查询", type: "search" },
        { label: "新增", type: "add" },
        { label: "操作", type: "update" },
        { label: "删除", type: "delete" }
      ]
    }
  },
  components: {
    QueryBar,
    Pagination,
    TableComponent
  },
  data: () => ({
    tableconfig,
    menuName: '采购订单',
    tableData: [],
    ruleForm: {},
    tableCount: 0,
    clickRow: {},
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "采购订单编号", moduleBind: "purchaseOrderNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "委托订单编号", moduleBind: "entrustOrderNo", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': (data = {}) => (api.getProcurementList({ ...data, ...this.ruleForm })),
        'add': () => { utools.setSession('pubchaseOrder', { jumpType: 'add' }); this.$router.push({ path: '/PurchaseOrderForm' }) },
        'delete': () => { if (this.clickRow.purchaseOrderNo !== undefined) return api.removeProcurementData(this.clickRow.purchaseOrderNo) },
        'update': () => {
          JSON.stringify(this.clickRow) === '{}'
            ?
            this.$message({
              center: true,
              message: '请选择一条数据进行修改操作',
              type: 'warning'
            })
            :
            (utools.setSession('pubchaseOrder', this.clickRow), this.$router.push({ path: '/PurchaseOrderForm' }))
        }
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
            if(clickType === 'search'){
              this.$refs.moviesTable.setCurrentRow(this.tableData.filter(e => (e[this.$route.query.key] == this.$route.query.code))[0] || '');
            }
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
    jumpForm (type = 'add') {
      let params = {
        path: '/PurchaseOrderForm', title: '采购订单信息', data: { status: type }
      };
      if (type === 'update' && !utools.judgeNullObj(this.clickRow)) {
        utools.alertMessage.bind(this)('', '请选择一条数据进行修改操作');
        return;
      }
      type === 'update' && (params.data.formData = params.data.formData = this.clickRow)
      this.addbreadCrumbsList(params)
      this.$router.push({ name: 'PurchaseOrderForm', params: { purchaseOrderNo: this.clickRow.purchaseOrderNo } })
    },
    handleBtnClicks: (() => {
      var obj = null;
      return function (type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    handleBtnClickObj () {
      return {
        search () { },
        add () {
          this.handleJump("add");
        },
        update () {
          JSON.stringify(this.$store.state.curRowData) == '{}' ?
            this.$message.error('请选择要修改的数据') : this.handleJump("update");
        },
        delete () {
          if (JSON.stringify(this.$store.state.curRowData) == '{}')
            this.$message.error('请选择要删除的数据')
        }
      };
    },
    handleJump (param) {
      this.$router.push({
        name: "PurchaseOrderForm",
        params: {
          jumpType: param
        }
      });
    },
    handleChange (param) {
      this.handleBtnClick('search', param)
    },
    clickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.clickRow))) {
        this.clickRow = row;
      }
    },
    handleDbclickTable (data) {
      this.clickTableRow(data)
      this.handleBtnClick('update');
    },
  },
  mounted () { },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
