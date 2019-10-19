<template>
  <div class="table">
    <breadcrumb-navigation />
    <!-- 查询栏 -->
    <query-bar
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>
    <!-- 表格 -->
    <!-- 表格 -->
    <table-component
      :dialog='false'
      :queryBarVisible='false'
      :activeRow.sync='table.activeRow'
      :popoverList='table.tableData'
      :count='table.count'
      :popoverListKey='table.config'
      @handlePageChange='goPage'
      @dblclickTableRow='dblclickTableRow'
    ></table-component>
  </div>
</template>

<script>
import api from "@/assets/js/appHelper.js";
import utools from "@/domain/common/utools.js";
import { mapGetters, mapMutations } from 'vuex'

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


// 配置
import tableConfig from '@/domain/tableconfig/finance/Entrustpaybill.js'

export default {
  components: {
    TableComponent,
    QueryBar
  },
  data () {
    return {
      queryBar: {
        queryBarFormConfig: [
          { label: "编码", moduleBind: "billNo", isInput: true },
          { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
          { label: "名称", moduleBind: "name", isInput: true },
          { label: "制单人", moduleBind: "creator", isInput: true },
          { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
          { label: "至", moduleBind: "createTimeTo", isDate: true },
        ],
        data: {}
      },
      table: {
        config: tableConfig,
        tableData: [],
        activeRow: {},
        count: 0
      },
      // 表格数据
      // 条数
      total: 0,
      // 当前行
      clickRow: {},
      // 查询条件
      queryEntrustpaybill: {
        pageIndex: 1,
        pageSize: 10
      },
      // 确认删除弹窗
      delVisible: false,
      // 弹窗是否关闭
      popForm: false
    };
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "creditNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "name", isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
  },
  watch: {},
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    dblclickTableRow (data) {
      this.handleBtnClickType('update');
    },
    // 查询栏按钮事件
    handleBtnClickType (type = 'search') {
      switch (type) {
        case 'search':
          this.queryPage(); break;
        case 'add':
          this.goRedactPage('add'); break;
        case 'update':
          this.goRedactPage('update'); break;
        case 'delete':
          this.goDelete();
      }
    },
    // 格式化
    fmpayBeyond (row, column) {
      if (row.payBeyond) {
        return "是";
      }
      if (row.payBeyond == "false") {
        return "否";
      }
    },
    fmbooked (row, column) {
      if (row.booked) {
        return "是";
      }
      if (row.booked == "false") {
        return "否";
      }
    },
    fmshouldReceiveBill (row, column) {
      if (row.shouldReceiveBill) {
        return "是";
      }
      if (row.shouldReceiveBill == "false") {
        return "否";
      }
    },
    fminnerDeduction (row, column) {
      if (row.innerDeduction) {
        return "是";
      }
      if (row.innerDeduction == "false") {
        return "否";
      }
    },
    fmfullAccountArrival (row, column) {
      if (row.fullAccountArrival) {
        return "是";
      }
      if (row.fullAccountArrival == "false") {
        return "否";
      }
    },
    fmaccountBeenPaid (row, column) {
      if (row.accountBeenPaid) {
        return "是";
      }
      if (row.accountBeenPaid == "false") {
        return "否";
      }
    },
    fmdiscount (row, column) {
      if (row.discount) {
        return "是";
      }
      if (row.discount == "false") {
        return "否";
      }
    },
    // 查询数据
    async queryPage () {
      try {
        const { data: { list, count } } = await api.getEntrustpaybillData(this.queryEntrustpaybill);
        this.table.tableData = this.utools.tableDataTranstionBoolen({
          data: list,
          config: ['payBeyond', 'booked', 'shouldReceiveBill', 'innerDeduction', 'fullAccountArrival', 'accountBeenPaid', 'discount']
        });
        this.table.count = count;
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
        console.log(error)
      }
    },
    // 翻页处理
    goPage (val) {
      this.queryEntrustpaybill.pageIndex = val.pageIndex;
      this.queryPage();
    },
    // 改变每页行数
    handleSizeChange (val) {
      this.queryEntrustpaybill.pageSize = val.pageSize;
      this.queryPage();
    },
    // 新增
    goCreate () {
      utools.setSession("btnType", "create");
      this.$router.push("/entrustpaybillForm");
    },
    TableClickRowData (data) {
      // 获取修改内容
      if (!(JSON.stringify(data) === JSON.stringify(this.clickRow))) {
        this.clickRow = data;
      }
    },
    handleDbclickTable (data) {
      this.TableClickRowData(data)
      this.handleBtnClickType('update');
    },
    // 操作校验
    titleCallBack (callback) {
      JSON.stringify(this.clickRow) === "{}"
        ? this.$message({
          center: true,
          message: "请选择一条数据再操作",
          type: "warning"
        })
        : callback();
    },
    // 跳转到编辑页面
    goRedactPage (type) {
      let params = {
        path: '/entrustpaybillForm',
        title: '委托付款单信息',
        data: {
          status: type,

        }
      };
      type === 'update' && (params.data.code = this.table.activeRow.billNo);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "entrustpaybillForm"
      });
    },
    // 修改
    goUpdate () {
      let params = {
        path: '/entrustpaybillForm',
        title: '委托付款单信息',
        data: {
          status: 'update',
        }
      }
      this.titleCallBack(() => {
        utools.setSession("btnType", "update");
        utools.setSession("entrustpaybill", this.clickRow);
        this.$router.push("/entrustpaybillForm");
        this.clickRow = {}
      });
    },
    // 删除
    async goDelete () {
      if (this.table.activeRow.billNo) {
        let Scode = 200;
        try {
          await api
            .deleteEntrustpaybillData(this.table.activeRow.billNo);
          this.queryPage();
        } catch (error) {
          Scode = 0;
          console.log(error)
        } finally {
          this.utools.alertStatusMessage.call(this, { status: Scode, msg: { success: '删除成功！', error: '删除失败,请重试！' } })
        }
      }
    },
    // 关闭弹窗
    closeForm () {
      this.popForm = false;
    }
  },
  provide () {
    return {
      formEvents: this.formEvents
    };
  },
  created () {
    // 加载列表数据
    this.queryPage();
  }
};
</script>

<style scoped>
.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}
</style>
