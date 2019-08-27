<template>
  <div>
    <preserve-btn
      :form="fromModel.fromData"
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      :isLoading="isLoading"
    ></preserve-btn>
    <span class="entrustOrderNametitle">{{entrustOrderNametitle}}</span>
    <my-from
      ref="entrustoderfrom"
      :name="fromModel.name"
      :vdata.sync="fromModel.fromData"
      :vconfigs.sync="fromModel.fromConfig"
      @handlerclean="clean"
    ></my-from>
    <el-tabs v-if="status >= 1" v-model="activeName">
      <el-tab-pane label="商品信息" name="goods">
        <div class="btn-right" v-if="status == 1">
          <el-button @click.stop="goodtable('add')">增加</el-button>
          <el-button @click.stop="goodtable('update')">修改</el-button>
          <el-button @click.stop="goodtable('delete')">删除</el-button>
        </div>
        <my-table
          :name="tableModelGoods.name"
          :notrule="true"
          :vdata="tableModelGoods.tableData"
          :vconfigs="tableModelGoods.tableConfig"
          :vruleData="tableModelGoods.ruleData"
          :vruleConfigs="tableModelGoods.ruleConfigs"
          @handlecurrentSelected="currentSelected"
        ></my-table>
        <el-dialog
          width="1440px"
          :close-on-click-modal="false"
          :title="fromDialogGoods.title"
          :visible.sync="fromDialogGoods.visible"
          :before-close="handleClose"
        >
          <my-from
            :name="fromDialogGoods.name"
            :vdata="fromDialogGoods.fromData"
            :vconfigs="fromDialogGoods.fromConfig"
          ></my-from>
          <div class="dialogbtn">
            <el-button @click.stop="goodfrom('cancel')">取消</el-button>
            <el-button @click.stop="goodfrom('determine')">确定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="报关信息" name="custom">
        <my-from
          :name="fromModelCustom.name"
          :vdata.sync="fromModelCustom.fromData"
          :vconfigs.sync="fromModelCustom.fromConfig"
        ></my-from>
      </el-tab-pane>
      <el-tab-pane label="买方接货信息" name="buyer">
        <my-table
          :name="tableModelGoods.name"
          :notrule="true"
          :vdata="tableModelBuyer.tableData"
          :vconfigs="tableModelBuyer.tableConfig"
          :vruleData="tableModelBuyer.ruleData"
          :vruleConfigs="tableModelBuyer.ruleConfigs"
          @handlecurrentSelected="currentSelected"
        ></my-table>
      </el-tab-pane>
      <el-tab-pane label="买方接货信息" name="seller">
        <my-table
          :name="tableModelGoods.name"
          :notrule="true"
          :vdata="tableModelSeller.tableData"
          :vconfigs="tableModelSeller.tableConfig"
          :vruleData="tableModelSeller.ruleData"
          :vruleConfigs="tableModelSeller.ruleConfigs"
          @handlecurrentSelected="currentSelected"
        ></my-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 组件
import { mapMutations, mapGetters } from "vuex";
import MyFrom from "@/components/public/basics/from";
import MyTable from "@/components/public/basics/table";
import api from "@/assets/js/appHelper";
// 主表
import entrustorderFormConfig from "@/components/public/entrustorder/from";
//子表
import entrustOrderTableRuleConfig from "@/components/public/entrustordergoods/rule";
import entrustOrderGoodsTableConfig from "@/components/public/entrustordergoods/table";
import entrustordergoodsFormConfig from "@/components/public/entrustordergoods/from";
import entrustordercustomFormConfig from "@/components/public/entrustordercustom/from"; // 报关
import entrustOrderBuyerTableConfig from "@/components/public/entrustorderbuyer/table";
import entrustOrderSellerTableConfig from "@/components/public/entrustorderseller/table";

export default {
  components: {
    MyFrom,
    MyTable
  },
  computed: {
    ...mapGetters(["getActivePathData"])
  },
  data: () => ({
    status: "",
    isLoading: false,
    entrustOrderNametitle: "",
    fromModel: {
      name: "entrustorder-frommodel",
      fromData: {},
      fromConfig: entrustorderFormConfig
    },
    activeName: "goods",
    tableModelGoods: {
      name: "entrustordergoods-tablemodel",
      tableData: [],
      tableConfig: entrustOrderGoodsTableConfig,
      ruleData: {},
      ruleConfigs: entrustOrderTableRuleConfig
    },
    currentRow: {},
    statusson: "",
    fromDialogGoods: {
      title: "商品信息",
      visible: false,
      name: "entrustordergoods-frommodel",
      fromData: {},
      fromConfig: entrustordergoodsFormConfig
    },
    fromModelCustom: {
      name: "entrustordercustom-frommodel",
      fromData: {},
      fromConfig: entrustordercustomFormConfig
    },
    tableModelBuyer: {
      name: "entrustordergoods-tablemodel",
      tableData: [],
      tableConfig: entrustOrderBuyerTableConfig,
      ruleData: {},
      ruleConfigs: entrustOrderTableRuleConfig
    },
    tableModelSeller: {
      name: "entrustordergoods-tablemodel",
      tableData: [],
      tableConfig: entrustOrderSellerTableConfig,
      ruleData: {},
      ruleConfigs: entrustOrderTableRuleConfig
    }
  }),
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    init() {
      const { formData = {} } = this.getActivePathData(this.$route.path) || {};
      if (formData) {
        Object.assign(this.fromModel.fromData, formData);
      }
      if (!this.fromModel.fromData.entrustOrderNo) {
        this.loadCodeNo(); //加载编号
      } else {
        this.tableModelGoods.ruleData = {
          entrustOrderNo: this.fromModel.fromData.entrustOrderNo
        };
      }
      if (this.fromModel.fromData.status > 1) {
        this.status = "2"; // 提交
      } else if (this.fromModel.fromData.status == 1) {
        this.status = "1"; // 已保存
      } else {
        this.status = ""; // 未保存
      }
      delete this.fromModel.fromData["status"];
      delete this.fromModel.fromData["statusName"];
      this.fromModel.fromData.flagstatus = this.status
    },
    async loadCodeNo() {
      //加载编号
      try {
        let { data } = await api.getentrustorderCode();
        this.fromModel.fromData.entrustOrderNo = data;
      } catch (e) {
        console.log(e);
      }
    },
    //保存主表单
    async handlePreserve() {
      // console.log(this.$refs["entrustoderfrom"].$refs["form"]);
      // this.$refs["entrustoderfrom"].$refs["form"].validate(valid => {
      //   if (!valid) {
      //     alert("submit!");
      //   } else {
      //     return false;
      //   }
      // });
      if (true)
        if (this.status == 1) {
          try {
            this.isLoading = true;
            const { data } = await api.editentrustorderData(
              this.fromModel.fromData
            );
            if (data) {
              // 提交成功后...
              this.$message.success("操作成功");
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.isLoading = false;
          }
        } else if (!this.status) {
          try {
            this.isLoading = true;
            const { data } = await api.addentrustorderData(
              this.fromModel.fromData
            );
            if (data) {
              // 保存成功后...
              this.status = 1;
              this.$message.success("保存成功");
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.isLoading = false;
          }
        }
    },
    // 返回
    handlebackspacing() {
      this.$router.push("M0402");
    },
    currentSelected(currentRow) {
      this.currentRow = currentRow;
    },
    async goodtable(flag) {
      if (flag == "add") {
        this.statusson = "1";
        this.fromDialogGoods.fromData = {
          entrustOrderNo: this.fromModel.fromData.entrustOrderNo
        };
        this.fromDialogGoods.visible = true;
        this.lockinggoods();
        this.solution();
      }
      if (flag == "update") {
        this.statusson = "2";
        this.fromDialogGoods.fromData = { ...this.currentRow };
        this.fromDialogGoods.visible = true;
        this.lockinggoods();
        this.solution();
      }
      if (flag == "delete") {
        try {
          this.isLoading = true;
          const { data } = await api.deleteData(
            "entrustgoods",
            this.currentRow.itemCode
          );
          if (data) {
            // 删除...
            this.$message.success("删除成功");
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.isLoading = false;
        }
      }
    },
    // 锁定商品栏位
    lockinggoods() {
      // 默认
      for (let con of this.fromDialogGoods.fromConfig[7].items) {
        // delete con['disabled']
        con['disabled'] = false
      }
      for (
        let i = 0;
        i < this.fromDialogGoods.fromConfig[4].items.length;
        i++
      ) {
        if (i > 1) {
          // delete this.fromDialogGoods.fromConfig[4].items[i]['disabled']
          this.fromDialogGoods.fromConfig[4].items[i]['disabled'] = false
        }
      }
      if (this.fromModel.fromData.entrustOrderType == "1") {
        // 出口退税不能输入
        for (let con of this.fromDialogGoods.fromConfig[7].items) {
          con.disabled = true;
        }
      } else if (this.fromModel.fromData.entrustOrderType == "2") {
        // 报关（人民币）不能输入（除去管制物品监管方式海关汇率%）
        for (
          let i = 0;
          i < this.fromDialogGoods.fromConfig[4].items.length;
          i++
        ) {
          if (i > 1) {
            this.fromDialogGoods.fromConfig[4].items[i].disabled = true;
          }
        }
      } else if (
        this.fromModel.fromData.entrustOrderType == "3" ||
        this.fromModel.fromData.entrustOrderType == "4"
      ) {
        // 出口退税不能输入
        for (let con of this.fromDialogGoods.fromConfig[7].items) {
          con.disabled = true;
        }
        // 报关（人民币）不能输入（除去管制物品监管方式海关汇率%）
        for (
          let i = 0;
          i < this.fromDialogGoods.fromConfig[4].items.length;
          i++
        ) {
          if (i > 1) {
            this.fromDialogGoods.fromConfig[4].items[i].disabled = true;
            // this.fromDialogGoods.fromConfig[4].items[i] = {...this.fromDialogGoods.fromConfig[4].items[i]}
          }
        }
      }
    },
    // 公式
    async solution() {
      try {
        this.isLoading = true;
        const { data } = await api.getsolutionformula({
          billNo: this.fromModel.fromData.solutionNo,
          pageIndex: "",
          pageSize: ""
        });
        this.utools.setCalcconfigObj(
          this.fromDialogGoods.fromConfig,
          data.list
        );
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    async goodfrom(flag) {
      if (flag == "cancel") {
        this.handleClose();
      } else {
        if (this.statusson == "1") {
          try {
            this.isLoading = true;
            const { data: addData } = await api.addData(
              "/entrustgoods",
              this.fromDialogGoods.fromData
            );
            if (data) {
              // 添加...
              this.$message.success("添加成功");
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.isLoading = false;
          }
        } else if (this.statusson == "2") {
          try {
            this.isLoading = true;
            const { data: addData } = await api.editData(
              "/entrustgoods",
              this.fromDialogGoods.fromData
            );
            if (data) {
              // 添加...
              this.$message.success("添加成功");
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.isLoading = false;
          }
        }
      }
    },
    handleClose() {
      this.fromDialogGoods.visible = false;
    },
    // 清空
    clean(){
      this.tableModelGoods.tableData.length = 0
    }
  },
  watch: {
    "fromDialogGoods.fromData": {
      handler(newVal, oldVal) {
        this.utools.resCalcConfig(
          this.fromDialogGoods.fromData,
          this.fromDialogGoods.fromConfig
        );
      },
      deep: true
    }
  },
  created() {
    this.init();
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      // title: "/委托订单信息",
      data: {
        formData: this.entrustOrder,
        status:
          sessionStorage.getItem("btnType") == "update" ? "update" : "create"
      },
      path: this.$route.path
    });
    next();
  }
};
</script>

<style scoped>
/* 自定义 */
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1080px !important;
  margin: 0 !important;
}
.el-dialog__header,
.el-dialog__body {
  padding: 15px !important;
}
.content {
  width: 1430px;
  padding: 15px;
}
.dialogbtn {
  margin-top: 20px;
  text-align: right;
}
</style>
