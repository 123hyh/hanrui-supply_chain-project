<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 香港入库单子表-基本信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="编码">
                    <el-input v-model="queryGodownBase.itemCode" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="queryGodownBase.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单人">
                    <el-input v-model="queryGodownBase.creator" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单时间">
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryGodownBase.createTimeFrom"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>~
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryGodownBase.createTimeTo"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>
                </el-form-item>
                <el-button type="primary" @click="queryData">查询</el-button>
                <el-button type="primary" @click="goCreate">新增</el-button>
                <el-button type="primary" @click="goUpdate">修改</el-button>
                <el-button type="danger" @click="goDelete">删除</el-button>
            </el-form>
        </div>
      <!-- 表格 -->
      <el-table :data="tableData" border :highlight-current-row="true">
				<el-table-column prop="itemCode" label="香港入库单子表主键"></el-table-column>
				<el-table-column prop="godownEntryCode" label="入库单编码"></el-table-column>
				<el-table-column prop="delegeteBillNo" label="委托单号"></el-table-column>
				<el-table-column prop="inventoryCode" label="存货编码"></el-table-column>
				<el-table-column prop="inventoryName" label="存货名称"></el-table-column>
				<el-table-column prop="specificationType" label="规格型号"></el-table-column>
				<el-table-column prop="tradeName" label="商品名称"></el-table-column>
				<el-table-column prop="taxNo" label="税号"></el-table-column>
				<el-table-column prop="attachNo" label="附号"></el-table-column>
				<el-table-column prop="parameter" label="参数"></el-table-column>
				<el-table-column prop="planTurn" label="计划车序"></el-table-column>
				<el-table-column prop="batchNo" label="批次"></el-table-column>
				<el-table-column prop="supplierBatchNo" label="供应商批次号"></el-table-column>
				<el-table-column prop="brand" label="品牌"></el-table-column>
				<el-table-column prop="originPlace" label="产地"></el-table-column>
				<el-table-column prop="unit" label="计量单位"></el-table-column>
				<el-table-column prop="quantity" label="数量"></el-table-column>
				<el-table-column prop="assistUnit" label="辅助计量单位"></el-table-column>
				<el-table-column prop="shippingMarks" label="唛头"></el-table-column>
				<el-table-column prop="boxNoStart" label="起始箱号"></el-table-column>
				<el-table-column prop="boxNoEnd" label="结束箱号"></el-table-column>
				<el-table-column prop="boxPlusNo" label="箱附号"></el-table-column>
				<el-table-column prop="boxCount" label="箱数"></el-table-column>
				<el-table-column prop="netWeight" label="净重"></el-table-column>
				<el-table-column prop="grossWeight" label="毛重"></el-table-column>
				<el-table-column prop="volume" label="体积"></el-table-column>
				<el-table-column prop="assictCount" label="辅助数量"></el-table-column>
				<el-table-column prop="warehouse" label="仓库"></el-table-column>
				<el-table-column prop="storekeeper" label="仓管员"></el-table-column>
				<el-table-column prop="storehouse" label="库位"></el-table-column>
				<el-table-column prop="customer" label="客户"></el-table-column>
				<el-table-column prop="unitStandardCost" label="单位标准成本"></el-table-column>
				<el-table-column prop="standardCost" label="标准成本"></el-table-column>
				<el-table-column prop="unitPurchaseCost" label="单位采购成本"></el-table-column>
				<el-table-column prop="purchaseCost" label="采购成本"></el-table-column>
				<el-table-column prop="unitActualCost" label="单位实际成本"></el-table-column>
				<el-table-column prop="actualCost" label="实际成本"></el-table-column>
				<el-table-column prop="shareCost" label="累计分摊费用"></el-table-column>
				<el-table-column prop="price" label="单价"></el-table-column>
				<el-table-column prop="taxRate" label="税率"></el-table-column>
				<el-table-column prop="priceContainTax" label="含税单价"></el-table-column>
				<el-table-column prop="priceNet" label="实际单价"></el-table-column>
				<el-table-column prop="ActualTaxPrice" label="实际含税单价"></el-table-column>
				<el-table-column prop="amount" label="金额"></el-table-column>
				<el-table-column prop="tax" label="税额"></el-table-column>
				<el-table-column prop="taxCurrency" label="税额本位币"></el-table-column>
				<el-table-column prop="priceTax" label="价税合计"></el-table-column>
				<el-table-column prop="priceTaxCurrency" label="价税合计本位币"></el-table-column>
				<el-table-column prop="completeCancellation" label="完全核销"></el-table-column>
				<el-table-column prop="cancelledQuantity" label="已核销数量"></el-table-column>
				<el-table-column prop="cancelledAmount" label="已核销金额"></el-table-column>
				<el-table-column prop="writeOffQuantity" label="累计冲销数量"></el-table-column>
				<el-table-column prop="returnedQuantity" label="退货数量"></el-table-column>
				<el-table-column prop="keyBillType" label="核心单据类型"></el-table-column>
				<el-table-column prop="keyAmount" label="核心金额"></el-table-column>
				<el-table-column prop="keyQuantity" label="核心数量"></el-table-column>
				<el-table-column prop="purchaseOrg" label="采购组织"></el-table-column>
				<el-table-column prop="settlementSupplier" label="结算供应商"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column prop="customsValue" label="报关货值"></el-table-column>
				<el-table-column prop="customsValueCurrency" label="报关货值币别"></el-table-column>
				<el-table-column prop="incomeInvoiceNo" label="来货发票号"></el-table-column>
				<el-table-column prop="commissionPriceOne" label="佣金单价1"></el-table-column>
				<el-table-column prop="commissionPriceTwo" label="佣金单价2"></el-table-column>
				<el-table-column prop="commissionOne" label="佣金1"></el-table-column>
				<el-table-column prop="commissionTwo" label="佣金2"></el-table-column>
				<el-table-column prop="exchangeRate" label="入库汇率"></el-table-column>
				<el-table-column prop="commissionUserOne" label="佣金人1"></el-table-column>
				<el-table-column prop="commissionUserTwo" label="佣金人2"></el-table-column>
				<el-table-column prop="billType" label="单据类型"></el-table-column>
				<el-table-column prop="supplier" label="供应商"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          background
          :page-size="queryGodownBase.pageSize"
          :current-page="queryGodownBase.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryGodownBase.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <godownBase-form :show="popForm" @closeform="closeForm"></godownBase-form>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appHelper from "../../../assets/js/appHelper";
import GodownBaseForm from "./GodownBaseForm";


export default {
  data() {
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

      // 表格数据
      tableData: [],
      // 查询条件
      queryGodownBase: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),

      popForm: false
    };
  },
  created() {
    // 加载列表数据
    this.queryData();

    //-- 监听 form 事件
    // 新建成功
    this.formEvents.$on("formcreated", () => {
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    });
    // 修改成功
    this.formEvents.$on("formupdated", () => {
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    });
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    queryPage() {
      appHelper.query("/godownbase/search", this.queryGodownBase).then(result => {
        this.tableData = result.data.list;
        this.queryGodownBase.total = result.data.count;
      });
    },

    queryData(){
      this.queryGodownBase.pageIndex = 1;
      
      this.queryPage();
    },
    // 翻页处理
    goPage: function(index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/godownbase/search"), {
          pageIndex: index,
          pageSize: pager.pageSize
          //   queryMap: {},
          //   sorting: ["string"]
        })
        .then(function(result) {
          // 替换数据
          vmTblData.splice(0, vmTblData.length, ...result.data.list);
          // 设置分页
          pager.total = result.data.total;
        });
    },

    goCreate() {
      this.formEvents.$emit("openform");
    },
    goDelete() {},
    goUpdate() {},
    closeForm() {
      this.popForm = false;
    },

    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  components: {
    GodownBaseForm
  },
  provide() {
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
