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
      :dialog='false'
      :queryBarVisible='false'
      :activeRow.sync='clickRow'
      :popoverList='tableData'
      :count='tableCount'
      :popoverListKey='tableconfig'
      @dblclickTableRow='dblclickTableRow'
      @handlePageChange='handleChange'
    ></table-component>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import QueryBar from '@/components/common/QueryBar'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import utools from '@/domain/common/utools.js'
const {
  turnCodeBoolean,
  titleCallBack,
  deleteMessage,
  alertMessage } = utools;

import tableconfig from '@/domain/tableconfig/basicdata/CarrierBase'
import { mapMutations, mapGetters } from 'vuex'
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
        { label: "供应商编码", moduleBind: "carrierCode", isInput: true },
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
            const { data: { list, count } } = await api.querycarrierbaseSearch({ ...this.ruleForm, ...page });
            this.tableData = utools.toggleDataBoolean({ data: list, transFormFields: ['supplier'], isCn: true }), this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': () => this.jumpForm('add'),

        'update': () => titleCallBack.call(
          this,
          this.clickRow,
          () => {
            this.jumpForm('update')
          }),

        'delete': () => {
          titleCallBack.call(
            this,
            this.clickRow,
            utools.removeReceiptsTips.bind(
              this,
              async () => {
                await api.deletecarrierbaseData(this.clickRow.carrierCode);
                this.clickTypeAsync.search()
              }
            )
          )
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
        path: '/SeCarrierBaseForm',
        title: '承运商信息',
        data: {
          status: type,
          formData: {}
        }
      }
      type == 'update' && (params.data.formData.base = utools.toggleDataBoolean({ data: this.clickRow, transFormFields: ['supplier'], isCn: false }));
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "SeCarrierBaseForm"
      });
    },

    handleChange (param) {
      this.handleBtnClick('search', param)
    },

    dblclickTableRow (row) {
      this.clickRow = row;
      this.handleBtnClick('update');
    },
  },
  created () {
    this.handleBtnClick('search');
  },
}
</script>
