<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 委托订单尾表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="编码">
                    <el-input v-model="queryEntrustOrderEnd.itemCode" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="queryEntrustOrderEnd.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单人">
                    <el-input v-model="queryEntrustOrderEnd.creator" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单时间">
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryEntrustOrderEnd.createTimeFrom"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>~
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryEntrustOrderEnd.createTimeTo"
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
				<el-table-column prop="itemCode" label="表业务主键编号"></el-table-column>
				<el-table-column prop="entrustOrderNo" label="委托订单号"></el-table-column>
				<el-table-column prop="pickUpType" label="提货信息"></el-table-column>
				<el-table-column prop="orderType" label="单据类型"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column prop="specialTips" label="特别提示"></el-table-column>
				<el-table-column prop="serviceCharge" label="服务费折让"></el-table-column>
				<el-table-column prop="invoiceRemark" label="发票备注"></el-table-column>
				<el-table-column prop="goodsValue" label="卖方销售总货值"></el-table-column>
				<el-table-column prop="sellerCurrency" label="卖方币别"></el-table-column>
				<el-table-column prop="trusteePayGoodsAmount" label="受托方应付货款总额"></el-table-column>
				<el-table-column prop="trusteeCurrency" label="受托方币别"></el-table-column>
				<el-table-column prop="matPayment" label="是否垫货款"></el-table-column>
				<el-table-column prop="refundCustomerAmount" label="应退客户货款"></el-table-column>
				<el-table-column prop="refundCurrency" label="应退币别"></el-table-column>
				<el-table-column prop="InStorage" label="入香港仓"></el-table-column>
				<el-table-column prop="paidGoodsAmount" label="已付货款总额"></el-table-column>
				<el-table-column prop="paidCurrency" label="已付币别"></el-table-column>
				<el-table-column prop="vatTotalAmount" label="增值税合计"></el-table-column>
				<el-table-column prop="vatCurrency" label="增值税币别"></el-table-column>
				<el-table-column prop="customTotalAmount" label="关税合计"></el-table-column>
				<el-table-column prop="customCurrency" label="关税币别"></el-table-column>
				<el-table-column prop="invoiceAmount" label="应开票金额"></el-table-column>
				<el-table-column prop="invoiceCurrency" label="发票币别"></el-table-column>
				<el-table-column prop="dayRate" label="日利率"></el-table-column>
				<el-table-column prop="chargeInterest" label="计息"></el-table-column>
				<el-table-column prop="invoiceType" label="开票类型"></el-table-column>
				<el-table-column prop="minCharge" label="最低消费额"></el-table-column>
				<el-table-column prop="minChargeCurrency" label="最低消费币别"></el-table-column>
				<el-table-column prop="totalServiceCharge" label="服务费总和"></el-table-column>
				<el-table-column prop="serviceCurrency" label="服务费币别"></el-table-column>
				<el-table-column prop="advanceActualAmount" label="预计实收金额"></el-table-column>
				<el-table-column prop="actualCurrency" label="实收币别"></el-table-column>
				<el-table-column prop="advanceAmount" label="预计应收总额"></el-table-column>
				<el-table-column prop="advanceCurrency" label="应收币别"></el-table-column>
				<el-table-column prop="advanceReceivableDate" label="预计收款日"></el-table-column>
				<el-table-column prop="supplierPayMode" label="付供应商货款方式"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          background
          :page-size="queryEntrustOrderEnd.pageSize"
          :current-page="queryEntrustOrderEnd.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryEntrustOrderEnd.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <entrustOrderEnd-form :show="popForm" @closeform="closeForm"></entrustOrderEnd-form>

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
import EntrustOrderEndForm from "./EntrustOrderEndForm";


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
      queryEntrustOrderEnd: {
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
      appHelper.query("/entrustorderend/search", this.queryEntrustOrderEnd).then(result => {
        this.tableData = result.data.list;
        this.queryEntrustOrderEnd.total = result.data.count;
      });
    },

    queryData(){
      this.queryEntrustOrderEnd.pageIndex = 1;
      
      this.queryPage();
    },
    // 翻页处理
    goPage: function(index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/entrustorderend/search"), {
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
    EntrustOrderEndForm
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
