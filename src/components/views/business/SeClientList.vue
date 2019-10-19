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
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/business/Client'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '委托方',
    tableData: [],
    curRowData: '',
    ruleForm: {},

    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "操作" },
      { type: "delete", label: "删除" },
    ]
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "委托方编码", moduleBind: "clientNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "clientName", isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.queryclientSearch(this.ruleForm);
        this.tableData = data.list;
        this.utools.turnCodeBoolean(this.tableData);
        this.ruleForm.total = data.count;
        this.curRowData = {}; // 清空当前行数据
        this.$refs.moviesTable.setCurrentRow(this.tableData.filter(e => (e[this.$route.query.key] == this.$route.query.code))[0] || '');
        if (!this.tableData.filter(e => (e[this.$route.query.key] == this.$route.query.code))[0] && this.tableData.length > 0) {
          this.ruleForm[this.$route.query.key] = this.$route.query.code
          this.queryData();
        }
      } catch (e) {
        console.log(e)
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
          this.jumpForm('add')
        },
        async update () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.warning('请选择要修改的数据');
          } else {
            const { data } = await api.searchOneclientData(this.curRowData.clientNo);
            sessionStorage.ClientForm = JSON.stringify(data);
            this.jumpForm('update')
          }
        },
        delete () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.warning('请选择要删除的数据')
          } else {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { data, status } = await api.deleteclientData(this.curRowData.clientNo);
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.goStartPage();
              } catch (e) { console.log(e) }
            })
          }
        }
      };
    },
    jumpForm (type) {
      let params = {
        path: '/SeClientForm',
        title: "委托方信息",
        data: {
          status: type
        }
      }
      type == 'update' && (params.data.formData = this.curRowData);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "SeClientForm"
      });
    },
    handleChange (paper) {
      this.ruleForm = { ...this.ruleForm, ...paper }
      this.queryData();
    },
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row)
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
