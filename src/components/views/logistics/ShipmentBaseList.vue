/* 发货通知单 */
<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :formConfig="queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :tableData="tableData"
        :tableDataKey="tableConfig"
        @TableClickRowData="currentTableChange"
        @handleDbclickTable="handleDbclickTable"
      ></table-component>
      <!-- 分页 -->
      <pagination-component
        :count="queryPage.total"
        @handlePageChange="querySzinstore"
      ></pagination-component>
    </div>
  </div>
</template>

<script>
import appHelper from "@/assets/js/appHelper";
import tableConfig from "@/domain/tableconfig/logistics/ShipmentBase.js";
// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import TableComponent from "@/components/common/TabTable.vue";

import { mapMutations, mapGetters } from "vuex";

export default {
  data () {
    return {
      tableConfig,
      // 表格数据
      tableData: [],
      // 查询条件
      queryPage: {
        total: 0
      },
      queryBar: {

        data: {}
      },
      popForm: false,
      currentRow: {} //当前选中行
    };
  },
  created () {
    // 加载列表数据
    this.queryData();
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "shipmentBaseCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "name", isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    handleBtnClickType (type) {
      switch (type) {
        case "search":
          this.queryData();
          break;
        case "add":
          this.goCreate();
          break;
        case "update":
          this.goUpdate();
          break;
        case "delete":
          this.goDelete();
          break;
      }
    },
    querySzinstore (page = {}) {
      appHelper.queryShipmentbase(page).then(result => {
        this.tableData = result.data.list;
        this.queryPage.total = result.data.count;
      });
    },

    queryData () {
      this.querySzinstore(this.queryBar.data);
    },
    goDelete () {
      if (this.currentRow && this.currentRow.shipmentBaseCode) {
        this.$confirm("此操作将永久删除单据, 是否继续?", "提示", {
          type: "warning"
        })
          .then(() => {
            appHelper
              .removeShipmentbase(this.currentRow.shipmentBaseCode)
              .then(data => {
                this.querySzinstore();
                this.$message({ type: "success", message: "删除成功!" });
              })
              .catch(() => {
                this.$message({ type: "info", message: "删除失败" });
              });
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消删除" });
          });
      } else {
        this.$message({
          message: "请选中您要删除的单据！",
          type: "warning"
        });
      }
    },
    goCreate () {
      this.jumpForm("add");
    },
    goUpdate () {
      if (this.currentRow && this.currentRow.shipmentBaseCode) {
        this.jumpForm("update");
      } else {
        this.$message({
          message: "请选中您要修改的单据！",
          type: "warning"
        });
      }
    },
    jumpForm (type) {
      let params = {
        path: "/ShipmentBaseForm",
        title: "深圳发运单信息",
        data: {
          status: type
        }
      };
      type == "update" && (params.data.formData = this.currentRow);
      this.addbreadCrumbsList(params);
      this.$router.push(`ShipmentBaseForm`);
    },
    closeForm () {
      this.popForm = false;
    },
    currentTableChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
    handleDbclickTable (data) {
      this.currentRow = data
      this.handleBtnClickType('update');
    },
  },
  components: {
    QueryBar,
    PaginationComponent,
    TableComponent
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
