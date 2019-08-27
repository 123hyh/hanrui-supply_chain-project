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
          v-for='item in tableconfig'
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <!-- <template slot-scope="scope" v-show="item.type == ''">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template> -->
        </el-table-column>
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
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'
import tableconfig from '@/domain/tableconfig/business/CustomerAuthentication'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    menuName: '网上客户认证',
    tableconfig,
    tableData: [],
    curRowData: '',
    ruleForm: {},
    btnObj: [
      { type: "search", label: "查询" },
    ]
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "企业编码", moduleBind: "companyCode", isInput: true },
        { label: "企业名称", moduleBind: "companyName", isInput: true },
        { label: '帐户状态', moduleBind: '', isSelect: true, selectOption: [] }
      ]
    },
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.queryregistedcompanySearch(this.ruleForm);
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {};
      } catch (e) {
        console.log(e)
      }
    },
    // 点击头部栏按钮
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
          this.$message.warning('没有权限');
        },
        async update () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.warning('请选择要修改的数据');
          } else {
            const { data } = await api.searchOneagreementData(this.curRowData.agreementNo);
            sessionStorage.AgreementForm = JSON.stringify(data);
            this.jumpForm('update')
          }
        },
        delete () {
          this.$message.warning('没有权限');
        }
      };
    },
    // 跳转
    jumpForm (type) {
      let params = {
        path: '/CustomerAuthenticationForm',
        title: "网上客户认证",
        data: {
          status: type
        }
      }
      type == 'update' && (params.data.formData = this.curRowData);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "CustomerAuthenticationForm"
      });
    },
    // 第一页
    goStartPage () {
      this.ruleForm.pageIndex = 1;
      this.queryData();
    },
    // 切换页码
    handleChange (paper) {
      this.ruleForm = { ...this.ruleForm, ...paper };
      this.queryData();
    },
    // 选中数据
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
    this.goStartPage()
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
};
</script>

<style scoped lang="less">
</style>
