<template>
  <div>
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
          :width="item.width"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <pagination
          @handlePageChange="handleChange"
          :count="tableCount"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/custom/CustomsFormBase'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '进/出口报关单',
    tableData: [],
    ruleForm: {},
    tableCount: 0,

    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "操作" },
      { type: "delete", label: "删除" },
    ],
    clickRow: {},
  }),
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "customsFormCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': (data = {}) => api.querycustomsformbaseSearch({ ...data, ...this.ruleForm }),//data:数据，ruleForm:分页；
        'add': () => { this.utools.setSession('customsForm', { jumpType: 'add' }); this.jumpForm('add') },
        'delete': () => { if (this.clickRow.customsFormCode !== undefined) return api.deletecustomsformbaseData(this.clickRow.customsFormCode) },
        'update': () => {          this.utools.titleCallBack.bind(this)(this.clickRow, () => {
            this.utools.setSession('customsForm', this.clickRow.customsFormCode)
            this.jumpForm('update')
          })        }
      }
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    async handleBtnClick (clickType, page) {
      /**
       * 1	处理形参为空，
       * 2	点击修改时 直接调用，避免报错;
       * 3	其余点击 走异步；
       * 4	当点击未删除时，判断 status是否为 200 alert 删除信息是否成功
       */
      if (clickType) {
        if (clickType === 'update' || clickType === 'add') {
          this.clickTypeAsync[clickType]();
        } else {
          if (clickType === 'delete') {
            this.utools.titleCallBack.bind(this)(this.clickRow, () => {
              this.utools.deleteMessage.bind(this)(async () => {
                try {
                  const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
                  this.utools.alertMessage.bind(this)(status, null, '删除')
                  this.handleBtnClick('search')
                } catch (e) { console.log(e) }
              })
            })
          } else {
            const { status, data: { list, count } } = await this.clickTypeAsync[clickType](page);
            // 转换[是,否] 
            this.utools.turnCodeBoolean(list);
            list && (this.tableData = list, this.tableCount = count);
          }
        }
      }
    },
    jumpForm (type) {
      let params = {
        path: '/CustomsFormBaseForm',
        title: "报关单信息",
        data: {
          status: type,
          formData: {}
        }
      }
      let clickData = this.utools.cloneObj(this.clickRow);
      // 转换[是, 否]中文
      this.utools.turnStringBoolean([clickData]);
      type == 'update' && (params.data.formData.CustomsHead = clickData);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "CustomsFormBaseForm"
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
      this.clickTableRow(row)
      this.handleBtnClick('update');
    },
  },
  created () {
    this.handleBtnClick('search');
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
