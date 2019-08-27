<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 发运单-运费承担方信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="编码">
                    <el-input v-model="queryShipmentFee.shipmentFeeCode" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="queryShipmentFee.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单人">
                    <el-input v-model="queryShipmentFee.creator" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单时间">
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryShipmentFee.createTimeFrom"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>~
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryShipmentFee.createTimeTo"
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
				<el-table-column prop="shipmentFeeCode" label="运费承担方编码"></el-table-column>
				<el-table-column prop="shipmentBaseCode" label="发运单基础信息编码"></el-table-column>
				<el-table-column prop="bearType" label="运费承担方类型"></el-table-column>
				<el-table-column prop="feeBear" label="运费承担方"></el-table-column>
				<el-table-column prop="paymentType" label="运费支付方式"></el-table-column>
				<el-table-column prop="hasSend" label="已发承运"></el-table-column>
				<el-table-column prop="backBroker" label="收回经手人"></el-table-column>
				<el-table-column prop="feeTarget" label="计费对象"></el-table-column>
				<el-table-column prop="border" label="边境"></el-table-column>
				<el-table-column prop="hasVerifi" label="是否已复审"></el-table-column>
				<el-table-column prop="shippingModel" label="配送方式"></el-table-column>
				<el-table-column prop="shipmentStatus" label="发运状态"></el-table-column>
				<el-table-column prop="createOutOrder" label="生成出库单"></el-table-column>
				<el-table-column prop="otherFee" label="收杂费"></el-table-column>
				<el-table-column prop="otherFeeType" label="杂费类别"></el-table-column>
				<el-table-column prop="cash" label="现金金额"></el-table-column>
				<el-table-column prop="check" label="支票金额"></el-table-column>
				<el-table-column prop="otherCurrency" label="杂费币种"></el-table-column>
				<el-table-column prop="invoiceNo" label="发票号"></el-table-column>
				<el-table-column prop="shipmentArea" label="发运区域"></el-table-column>
				<el-table-column prop="expressDes" label="快递目的地"></el-table-column>
				<el-table-column prop="shipCurrency" label="运保费币种"></el-table-column>
				<el-table-column prop="receiveFee" label="应收运费"></el-table-column>
				<el-table-column prop="payFee" label="应付运费"></el-table-column>
				<el-table-column prop="payPremium" label="应付保费"></el-table-column>
				<el-table-column prop="selfAddress" label="自提地址"></el-table-column>
				<el-table-column prop="sendCity" label="寄件城市"></el-table-column>
				<el-table-column prop="receiveCity" label="收件城市"></el-table-column>
				<el-table-column prop="withGoods" label="是否随货开票"></el-table-column>
				<el-table-column prop="firstSend" label="先收先发货"></el-table-column>
				<el-table-column prop="appointCarrier" label="客户指定承运商"></el-table-column>
				<el-table-column prop="infactFee" label="实际运费"></el-table-column>
				<el-table-column prop="sfReceiptNo" label="顺丰回单号"></el-table-column>
				<el-table-column prop="grossWeight" label="毛重"></el-table-column>
				<el-table-column prop="pieces" label="件数"></el-table-column>
				<el-table-column prop="summary" label="摘要"></el-table-column>
				<el-table-column prop="recomCarrier" label="推荐承运商"></el-table-column>
				<el-table-column prop="recomFee" label="推荐运费"></el-table-column>
				<el-table-column prop="groupInvoiceNo" label="集团发票号"></el-table-column>
				<el-table-column prop="materialNo" label="物料号"></el-table-column>
				<el-table-column prop="shipper" label="发货方"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          background
          :page-size="queryShipmentFee.pageSize"
          :current-page="queryShipmentFee.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryShipmentFee.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <shipmentFee-form :show="popForm" @closeform="closeForm"></shipmentFee-form>

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
import ShipmentFeeForm from "./ShipmentFeeForm";


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
      queryShipmentFee: {
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
      appHelper.query("/shipmentfee/search", this.queryShipmentFee).then(result => {
        this.tableData = result.data.list;
        this.queryShipmentFee.total = result.data.count;
      });
    },

    queryData(){
      this.queryShipmentFee.pageIndex = 1;
      
      this.queryPage();
    },
    // 翻页处理
    goPage: function(index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/shipmentfee/search"), {
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
    ShipmentFeeForm
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
