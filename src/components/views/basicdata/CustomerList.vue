<template>
  <div class="table">
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
        ref="moviesTable"
        :tableData='tableData'
        :tableDataKey='tableconfig'
        :isShowTabTable="true"
        @TableClickRowData='TableClickRowData'
        @handleDbclickTable="handleDbclickTable"
      ></table-component>
      <!-- 分页 -->
      <pagination-component
        :count='paginaCount'
        @handlePageChange='handlePageChange'
      ></pagination-component>
    </div>

    <!-- <customer-form :show="popForm" @closeform="closeForm"></customer-form> -->

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
import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'
// import CustomerForm from "./CustomerForm";
import QueryBar from "@/components/common/QueryBar.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import TableComponent from '@/components/common/TabTable.vue'
import tableconfig from '@/domain/tableconfig/basicdata/Customer.js'

import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    btnObj: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableconfig,
      tableData: [],
      paginaCount: 0,
      clickRowData: {},

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
      // 查询条件
      queryCustomer: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      popForm: false,
      queryBar: {

        data: {}
      }
    };
  },
  created () {
    this.handleBtnClickType('search');
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "customerNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "customerName", isInput: true },
        { label: "简称", moduleBind: "shortName", isInput: true },
        { label: "助记码", moduleBind: "shortCode", isInput: true },
      ]
    },
    data () {
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
    },
    queryClickAsync () {
      return {
        'search': (data = {}) => api.getCustomerList({ ...data, ...this.queryBar.data }),
        'add': () => { this.goAdd() },
        'update': () => { this.goUpdate() },
        'delete': data => { if (data) { return api.deleteCustomerData(data) } else { return { status: 404, data: {} } } }
      }
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    TableClickRowData (rowData) {
      this.clickRowData = rowData;
    },
    handleDbclickTable (data) {
      this.handleBtnClickType('update');
    },
    async handleBtnClickType (clickObj, page) {
      try {
        switch (clickObj) {
          case 'search':
            const { data: { list, count }, status } = await this.queryClickAsync[clickObj](page);
            this.tableData = list || [], this.paginaCount = count || 0;
            // this.$refs.moviesTable.setCurrentRow(this.tableData.filter(e=>(e[this.$route.query.key] == this.$route.query.code))[0]||'');
            break;
          case 'delete':
            utools.titleCallBack.call(
              this,
              this.clickRowData.customerNo,
              utools.removeReceiptsTips.bind(
                this,
                async () => {
                  const { status, data: { list, count } } = await this.queryClickAsync[clickObj](this.clickRowData.customerNo);
                  this.tableData = list || [], this.paginaCount = count || 0;
                  this.handleBtnClickType('search');
                }
              )
            )
            break;
          default:
            this.queryClickAsync[clickObj]()
            break;
        }
      } catch (error) {
        utools.alertMessage.bind(this)('', '操作失败,请重试')
        console.log(error)
      }
    },
    handlePageChange () { },

    goAdd () {
      this.JumpRouter('add')
    },
    goDelete () { },
    goUpdate () {
      if (JSON.stringify(this.clickRowData) !== '{}') {
        this.JumpRouter('update');
        return;
      }
      utools.alertMessage.bind(this)('', '请选择一条数据')
    },
    JumpRouter (type) {
      let params = {
        path: '/Customerform',
        title: '供应链客户信息',
        data: {
          status: type,
          formData: {}
        }
      }
      type == 'update' && (params.data.formData.base = this.clickRowData);
      this.addbreadCrumbsList(params)
      this.$router.push({ path: '/Customerform' })
    },
    closeForm () {
      this.popForm = false;
    },

    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData () {
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
    search () {
      this.is_search = true;
    },
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    handleEdit (index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete (index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll () {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit () {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  components: {
    // CustomerForm,
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
