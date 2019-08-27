<template>
  <div class="container pd-10">
    <!-- 查询栏 -->
    <query-bar
      :ruleForm="ruleForm"
      :formConfig="queryBarConfig"
      @handleBtnClickType="handleBtnClick"
    ></query-bar>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      stripe
      highlight-current-row
      @row-click="clickTableRow"
      @row-dblclick="dblclickTableRow"
      ref="moviesTable"
    >
      <el-table-column
        v-for='item in tableconfig'
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
    <div class="pagination">
      <pagination
        @handlePageChange="handleChange"
        :count="tableCount"
      ></pagination>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/basicdata/WarehouseQuotation'
import { mapMutations } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    tableData: [],
    ruleForm: {},
    tableCount: 0,
    queryBarConfig: [
      { label: "供应商编码", moduleBind: "billCode", isInput: true },
      { label: "制单人", moduleBind: "creator", isInput: true },
      { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
      { label: "至", moduleBind: "createTimeTo", isDate: true }
    ],
    clickRow: {},
  }),
  computed: {
    clickTypeAsync () {
      return {
        'search': async (page) => {
          try {
            const { data: { list, count } } = await api.querywarehousequotationSearch({ ...this.ruleForm, ...page });
            list && (this.utools.turnCodeBoolean(list), this.tableData = list, this.tableCount = count);
          } catch (e) { console.log(e) }
        },
        'add': () => { this.utools.setSession('WarehouseQuotationForm', { jumpType: 'add' }); this.jumpForm('add') },
        'update': () => {          this.utools.titleCallBack.bind(this)(this.clickRow, async () => {
            try {
              const { data } = await api.searchOnewarehousequotationData(this.clickRow.billCode);
              this.utools.setSession('WarehouseQuotationForm', data)
              this.jumpForm('update')
            } catch (e) { console.log(e) }
          })        },
        'delete': () => {
          this.utools.titleCallBack.bind(this)(this.clickRow, () => {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { status, data: { list, count } } = await api.deletewarehousequotationData(this.clickRow.billCode);
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.clickTypeAsync['search']()
              } catch (e) { console.log(e) }
            })
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
    dblclickTableRow (row) {
      this.clickRow(row)
      this.handleBtnClick('update');
    },
    jumpForm (type) {
      let params = {
        path: '/WarehouseQuotationForm',
        title: '仓储报价单信息',
        data: {
          status: type,
          formData: { tenantId: 'hfy' }
        }
      }
      type == 'update' && (params.data.formData = this.clickRow);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "WarehouseQuotationForm"
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
  },
  created () {
    this.handleBtnClick('search');
  },
}
</script>

<style>
</style>
