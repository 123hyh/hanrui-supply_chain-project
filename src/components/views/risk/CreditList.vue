<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :btnObj="btnObj"
        :formConfig="queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :tableData='tableData'
        :tableDataKey='tableConfig'
        @TableClickRowData='activeRow'
        @handleDbclickTable="handleDbclickTable"
      ></table-component>
      <!-- 分页 -->
      <pagination-component
        :count="PaginationCount"
        @handlePageChange="handlePageChange"
      ></pagination-component>
    </div>

    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRow"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appHelper from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'

import QueryBar from "@/components/common/QueryBar.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import TableComponent from '@/components/common/TabTable.vue'


import tableConfig from "@/domain/tableconfig/risk/Credit.js";

import { mapMutations, mapGetters } from 'vuex';

export default {

  data () {
    /**
     * @param PaginationCount 分页条的总条数
     */
    return {
      url: "./vuetable.json",
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      tableData: [],
      clickCurrentRow: {}, // 当前选择表格行数据
      // 查询条件
      queryCredit: {
        pageIndex: 1,
        pageSize: 10
      },
      PaginationCount: 0,

      popForm: false,
      queryBar: {

        data: {}
      },
      tableConfig,
      btnObj: []
    };
  },
  created () {
    // this.queryBar.grid.push(this.orderStatus);
    // 加载列表数据
    this.goSearch();
    // 获取 权限 btn按钮
    this.btnObj = this.getListBtn[this.$route.path.slice(1)];
  },
  computed: {
    ...mapGetters(['getActivePathData', 'getListBtn', 'orderStatus']),
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
    queryBtnAsync () {
      return {
        'add': () => {
          this.goCreate()
        },
        'update': () => {
          this.goUpdate()
        },
      }
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    async handleBtnClickType (clickObj) {
      switch (clickObj) {
        case 'add':
        case 'update':
          this.queryBtnAsync[clickObj]();
          break;
        case 'search':
          this.goSearch();
          break;
        case 'delete':
          this.goDelete();
          break;
      }
    },
    handlePageChange ({ pageSize, pageIndex } = data) {
      this.queryCredit = { ...this.queryCredit, pageSize, pageIndex };
      this.goSearch();
    },
    activeRow (row, event, column) {
      this.clickCurrentRow = row;
    },
    handleDbclickTable (data) {
      this.clickCurrentRow = data;
      this.handleBtnClickType('update');
    },
    async goSearch () {
      try {
        const {
          data: { count, list }
        } = await appHelper.getCredit({
          ...this.queryCredit,
          ...this.queryBar.data
        });
        this.tableData = list;
        this.PaginationCount = count;
      } catch (error) {
        console.log(error)
      }
    },
    // 保存跳转后表单填充
    handlerJumpParams (type) {
      this.removeParams();
      let params = {
        jumpType: type
      };
      type == "update" && (params.data = this.clickCurrentRow);
      sessionStorage.setItem("creditJumpType", JSON.stringify(params));
    },
    goCreate () {
      this.jumpForm('add')
    },
    async goDelete () {
      if (!utools.judgeNullObj(this.clickCurrentRow)) {
        utools.alertMessage.call(this, '', '请选择一条数据操作');
        return;
      }
      let isSuccess = '';
      try {
        let { data, status } = await appHelper.deleteCredit(this.clickCurrentRow.creditNo);
        isSuccess = status
      } catch (error) {
        console.log(error)
      }
      utools.alertMessage.call(this, isSuccess);
      this.goSearch()
    },
    goUpdate () {
      if (!this.clickCurrentRow.creditNo) {
        this.$message({
          message: "请选择一条数据进行修改",
          center: true,
          type: "error"
        });
        return;
      }
      this.jumpForm('update')
    },
    jumpForm (type) {
      let params = {
        path: '/CreditForm',
        title: '融资授信信息',
        data: {
          status: type,
        }
      }
      type == 'update' && (params.data.formData = this.clickCurrentRow);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "CreditForm"
      });
    },
    //  删除Storage
    removeParams () {
      sessionStorage.removeItem("creditJumpType");
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  components: {
    QueryBar,
    PaginationComponent,
    TableComponent
  },
  provide () {
    return {
      formEvents: this.formEvents
    };
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
