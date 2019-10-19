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
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :dialog="false"
        :queryBarVisible='false'
        :popoverList="tableData"
        :popoverListKey='tableconfig'
        :count="ruleForm.total"
        @dblclickTableRow='dblclickTableRow'
        :activeRow.sync="curRowData"
        @handlePageChange="handleChange"
      ></table-component>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import QueryBar from '@/components/common/QueryBar'
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";


import tableconfig from '@/domain/tableconfig/business/Agreement'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    TableComponent
  },
  data: () => ({
    tableconfig,
    menuName: '协议管理',
    tableData: [],
    curRowData: {},
    ruleForm: {},
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
    async queryData (data) {
      try {
        const { data: { list = [], count = 0 } } = await api.queryagreementSearch(data);
        this.tableData = list;
        this.ruleForm.total = count;
        this.curRowData = {}; // 清空当前行数据
      } catch (e) {
        this.$message.error('获取列表数据失败，请重试！')
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
          this.queryData();
        },
        add () {
          this.jumpForm('add')
        },
        async update () {
          this.utools.titleCallBack.call(
            this,
            this.curRowData,
            async () => {
              const { data } = await api.searchOneagreementData(this.curRowData.agreementNo);
              sessionStorage.AgreementForm = JSON.stringify(data);
              this.jumpForm('update')
            }
          )
        },
        delete () {
          this.utools.titleCallBack.call(
            this,
            this.curRowData,
            this.utools.removeReceiptsTips.bind(
              this,
              async () => {
                await api.deleteagreementData(this.curRowData.agreementNo)
                this.goStartPage();
              }
            )
          )
        }
      };
    },
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
      this.queryData(paper);
    },
    dblclickTableRow (row) {
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
