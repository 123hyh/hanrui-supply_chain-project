<template>
  <div class="table">
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
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
        <el-table-column
          v-for="item in tableconfig"
          :show-overflow-tooltip='true'
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align ? item.align : 'center'"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <pagination
          @handlePageChange="handleChange"
          :count="ruleForm.total"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

//组件
import Pagination from "@/components/common/Pagination";
import QueryBar from "@/components/common/QueryBar";

//表格配置
import tableconfig from "@/domain/tableconfig/business/BuyerReceiveGoods";
import { mapGetters } from 'vuex'
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
    Pagination
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "委托单号", moduleBind: "delegeteBillNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "单据编号", moduleBind: "itemCode", isInput: true },
        { label: "创建时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    }
  },

  data: () => ({
    tableconfig,
    menuName: "买方接提货",
    tableData: [],
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 0
    },

  }),
  methods: {
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.getLogistics(this.ruleForm);
        this.tableData = data.list;
        this.tableData.map(item => {
          item.hasAssignCarrierName = item.hasAssignCarrier ? "是" : "否";
          item.entrustReceiveName = item.entrustReceive ? "是" : "否";
          item.receivePaymentName = item.receivePayment ? "是" : "否";
          item.waitNoticeName = item.rwaitNotice ? "是" : "否";
          item.invoiceWithGoodsName = item.invoiceWithGoods ? "是" : "否";
          item.needCollectFeeName = item.needCollectFee ? "是" : "否";
          item.goodsValueContainFeeName = item.goodsValueContainFee
            ? "是"
            : "否";
          item.urgentName = item.urgent ? "是" : "否";
          item.costPriorityName = item.costPriority ? "是" : "否";
          item.timeLimitPriorityName = item.timeLimitPriority ? "是" : "否";
          item.deliveryPriorityName = item.deliveryPriority ? "是" : "否";
          item.inlandName = item.inland ? "是" : "否";
        });
        this.ruleForm.total = data.count;
        this.curRowData = {}; // 清空当前行数据
      } catch (e) {
        console.log(e);
      }
    },
    goStartPage () {
      this.ruleForm.pageIndex = 1; //页签调到第一页
      this.queryData();
    },
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
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
        search () {
          this.goStartPage();
        },
        add () {
          this.handleJump("create");
        },
        update () {
          if (JSON.stringify(this.curRowData) == "{}") {
            this.$message.error("请选择要修改的数据");
          } else {
            this.handleJump("update");
          }
        },
        delete () {
          if (JSON.stringify(this.curRowData) == "{}") {
            this.$message.error("请选择要删除的数据");
          } else {
            this.$alert("删除不可恢复，是否确定删除？", "删除", {
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "执行中...";
                  setTimeout(() => {
                    // 删除
                    api
                      .deleteBuyerReceiveList(this.curRowData.billNo)
                      .then(res => {
                        if (res) {
                          this.$message.success("删除成功");
                          this.goStartPage();
                        }
                      });
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done();
                }
              }
            });
          }
        }
      };
    },
    handleJump (param) {
      utools.setSession("buyerReceiveGoodsForm", {
        jumpType: param,
        enterFromBtn: true
      });
      if (param != "create") {
        utools.setSession("buyerReceivebillNo", {
          billNo: this.curRowData.billNo
        });
      }
      this.$router.push({
        name: "buyerReceiveGoodsForm"
      });
    },
    handleChange (paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;
      this.queryData();
    },
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.handleBtnClick('update');
    },
  },
  created () {
    this.goStartPage();
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
};
</script>

<style scoped lang="less">
</style>
