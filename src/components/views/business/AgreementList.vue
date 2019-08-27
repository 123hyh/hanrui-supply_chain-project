<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> {{menuName}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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

import tableconfig from '@/domain/tableconfig/business/Agreement'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '协议管理',
    tableData: [],
    curRowData: '',
    ruleForm: {},

    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "操作", readonly: false },
      { type: "delete", label: "删除" },
    ]
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "协议编号", moduleBind: "agreementNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "委托方", moduleBind: "clientName", isInput: true },
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
        const { data } = await api.queryagreementSearch(this.ruleForm);
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {}; // 清空当前行数据
        this.$refs.moviesTable.setCurrentRow(this.tableData.filter(e => (e[this.$route.query.key] == this.$route.query.code))[0] || '');
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
            const { data } = await api.searchOneagreementData(this.curRowData.agreementNo);
            sessionStorage.AgreementForm = JSON.stringify(data);
            this.jumpForm('update')
          }
        },
        delete () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.warning('请选择要删除的数据')
          } else {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { data, status } = await api.deleteagreementData(this.curRowData.agreementNo)
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.goStartPage();
              } catch (e) { console.log(e) }
            })
          }
        }
      };
    },
    // length(){
    //   return {
    //     '0': {  token: 'token' },
    //     '1': {  brandId: 'brandId' },
    //     '2': {  familyId: 'familyId' },
    //     '3': {  groupId: 'groupId' },
    //   }
    // },
    jumpForm (type) {
      let params = {
        path: '/AgreementForm',
        title: "协议管理信息",
        data: {
          status: type
        }
      }
      type == 'update' && (params.data.formData = this.curRowData);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "AgreementForm"
      });
    },
    handleChange (paper) {
      this.ruleForm = { ...this.ruleForm, ...paper };
      this.queryData();
    },
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
      this.btnObj[2].readonly = (row.statusName == '已审核');
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
