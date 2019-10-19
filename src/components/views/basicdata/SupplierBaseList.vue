<template>
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
      :count="tableCount"
      @dblclickTableRow='dblclickTableRow'
      :activeRow.sync="clickRow"
      @handlePageChange="handleChange"
    ></table-component>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import QueryBar from '@/components/common/QueryBar'
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";


import tableconfig from '@/domain/tableconfig/basicdata/SupplierBase'
import { mapMutations, mapGetters } from 'vuex'
import utools from "@/domain/common/utools.js";

export default {
  components: {
    QueryBar,
    TableComponent
  },
  data: () => ({
    tableconfig,
    tableData: [],
    ruleForm: {},
    tableCount: 0,

    clickRow: {},
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "名称", moduleBind: "supplierName", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': async (page = {}) => {
          try {
            const { data: { list, count } } = await api.querysupplierbaseSearch({ ...this.ruleForm, ...page });
            list && (
              this.utools.turnCodeBoolean(list),
              this.tableData = list, this.tableCount = count
            );
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },
        'add': () => { this.utools.setSession('SupplierBaseForm', { jumpType: 'add' }); this.jumpForm('add') },
        'update': () => {          this.utools.titleCallBack.bind(this)(this.clickRow, async () => {
            try {
              const { data } = await api.searchOnesupplierbaseData(this.clickRow.supplierCode);
              this.utools.setSession('SupplierBaseForm', data)
              this.jumpForm('update')
            } catch (e) { console.log(e) }
          })        },
        'delete': () => {
          this.utools.titleCallBack.bind(this)(this.clickRow, async () => {
            try {
              const { status, data: { list, count } } = await api.deletesupplierbaseData(this.clickRow.supplierCode);
              this.utools.alertMessage.bind(this)(status, null, '删除')
              this.clickTypeAsync['search']()
            } catch (e) { console.log(e) }
          })
        },
      }
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick (clickType, page) {
      this.clickTypeAsync[clickType](page);
    },
    jumpForm (type) {
      let params = {
        path: '/SupplierBaseForm',
        title: '供应商信息',
        data: {
          status: type,
          formData: { tenantId: 'hfy' }
        }
      }
      type == 'update' && (params.data.formData.base = this.clickRow, utools.turnStringBoolean([params.data.formData.base]));
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "SupplierBaseForm"
      });
    },
    handleChange (param) {
      this.handleBtnClick('search', param)
    },
    clickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.clickRow))) {
        this.clickRow = row;
      }
    },
    dblclickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.clickRow))) {
        this.clickRow = row;
      }
      this.handleBtnClick('update');
    },
  },
  created () {
    this.handleBtnClick('search');
  },
}
</script>

<style>
</style>
