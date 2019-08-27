<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 委托订单--商品信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="编码">
                    <el-input v-model="queryEntrustGoods.itemCode" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="queryEntrustGoods.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单人">
                    <el-input v-model="queryEntrustGoods.creator" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单时间">
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryEntrustGoods.createTimeFrom"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>~
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryEntrustGoods.createTimeTo"
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
				<el-table-column prop="orderModel" label="订单型号"></el-table-column>
				<el-table-column prop="arrivalGoodsModel" label="来货规格型号"></el-table-column>
				<el-table-column prop="arrivalGoodsCode" label="来货编码"></el-table-column>
				<el-table-column prop="arrivalGoodsName" label="来货名称"></el-table-column>
				<el-table-column prop="goodsCode" label="商品编码"></el-table-column>
				<el-table-column prop="goodsName" label="商品名称"></el-table-column>
				<el-table-column prop="taxNo" label="税号"></el-table-column>
				<el-table-column prop="attachNo" label="附号"></el-table-column>
				<el-table-column prop="sellerQuantity" label="卖方数量"></el-table-column>
				<el-table-column prop="sellerUnit" label="卖方单位"></el-table-column>
				<el-table-column prop="sellerPrice" label="卖方单价"></el-table-column>
				<el-table-column prop="sellerCurrency" label="卖方币别"></el-table-column>
				<el-table-column prop="sellerGoodsValue" label="卖方货价"></el-table-column>
				<el-table-column prop="controlledGoods" label="管制物品"></el-table-column>
				<el-table-column prop="superviseMode" label="监管方式"></el-table-column>
				<el-table-column prop="customsExchangeRate" label="海关汇率"></el-table-column>
				<el-table-column prop="customTaxRate" label="海关税率%"></el-table-column>
				<el-table-column prop="increaseTaxRate" label="加征税率"></el-table-column>
				<el-table-column prop="customTaxAmount" label="海关税额"></el-table-column>
				<el-table-column prop="vatTaxRate" label="增值税税率"></el-table-column>
				<el-table-column prop="vatTaxAmount" label="增值税税额"></el-table-column>
				<el-table-column prop="freightRate" label="运费费率%"></el-table-column>
				<el-table-column prop="premiumRate" label="保费费率%"></el-table-column>
				<el-table-column prop="extrasRate" label="杂费费率%"></el-table-column>
				<el-table-column prop="costAmount" label="费额"></el-table-column>
				<el-table-column prop="serviceExchangeRate" label="服务费汇率%"></el-table-column>
				<el-table-column prop="serviceCurrency" label="服务费币别"></el-table-column>
				<el-table-column prop="serviceFee" label="服务费"></el-table-column>
				<el-table-column prop="buyerExchangeRate" label="买方货款汇率"></el-table-column>
				<el-table-column prop="buyerCurrency" label="买方币别"></el-table-column>
				<el-table-column prop="buyerPrice" label="买方单价"></el-table-column>
				<el-table-column prop="buyerGoodsValue" label="买方货值"></el-table-column>
				<el-table-column prop="taxTypeCode" label="税种编码"></el-table-column>
				<el-table-column prop="taxTypeName" label="税种名称"></el-table-column>
				<el-table-column prop="otherTaxRate" label="其他税率"></el-table-column>
				<el-table-column prop="otherTaxAmount" label="其他税金"></el-table-column>
				<el-table-column prop="priceTax" label="价税合计"></el-table-column>
				<el-table-column prop="netWeight" label="净重"></el-table-column>
				<el-table-column prop="netWeightCredit" label="净重可信度"></el-table-column>
				<el-table-column prop="grossWeight" label="毛重"></el-table-column>
				<el-table-column prop="volume" label="体积"></el-table-column>
				<el-table-column prop="brand" label="品牌"></el-table-column>
				<el-table-column prop="brandCredit" label="品牌可信度"></el-table-column>
				<el-table-column prop="sourceArea" label="原产地"></el-table-column>
				<el-table-column prop="sourceAreaCredit" label="原产地可信度"></el-table-column>
				<el-table-column prop="materialCode" label="物料编码"></el-table-column>
				<el-table-column prop="materialName" label="物料名称"></el-table-column>
				<el-table-column prop="poNo" label="PO号"></el-table-column>
				<el-table-column prop="supplierInvoiceNo" label="供应商发票号"></el-table-column>
				<el-table-column prop="batchNo" label="批号"></el-table-column>
				<el-table-column prop="threecItem" label="3C项目"></el-table-column>
				<el-table-column prop="increaseItem" label="加征税目"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          background
          :page-size="queryEntrustGoods.pageSize"
          :current-page="queryEntrustGoods.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryEntrustGoods.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <entrustGoods-form :show="popForm" @closeform="closeForm"></entrustGoods-form>

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
import EntrustGoodsForm from "./EntrustGoodsForm";


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
      queryEntrustGoods: {
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
      appHelper.query("/entrustgoods/search", this.queryEntrustGoods).then(result => {
        this.tableData = result.data.list;
        this.queryEntrustGoods.total = result.data.count;
      });
    },

    queryData(){
      this.queryEntrustGoods.pageIndex = 1;
      
      this.queryPage();
    },
    // 翻页处理
    goPage: function(index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/entrustgoods/search"), {
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
    EntrustGoodsForm
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
