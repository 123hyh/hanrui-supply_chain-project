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

import tableconfig from '@/domain/tableconfig/custom/ImportCustomOrder'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "businessNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "name", isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    }
  },
  data: () => ({
    tableconfig,
    menuName: '进/出口报关计划',
    tableData: [],
    curRowData: '',
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    },

    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "操作" },
      { type: "delete", label: "删除" },
    ]
  }),
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.queryImportCustomOrderSearch(this.ruleForm)
        this.tableData = data.list;
        this.utools.turnCodeBoolean(this.tableData)
        this.ruleForm.total = data.count;
        this.curRowData = {}; // 清空当前行数据
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
    jumpForm (type) {
      let params = {
        path: '/ImportCustomOrderForm',
        title: "报关计划单信息",
        data: {
          status: type,
          formData: { tenantId: 'hfy' }
        }
      }
      const obj = this.utools.cloneObj(this.curRowData);
      this.utools.turnStringBoolean([obj]);
      type == 'update' && (params.data.formData = obj);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "ImportCustomOrderForm"
      });
    },
    handleBtnClickObj () {
      return {
        search () {
          this.goStartPage();
        },
        add () {
          this.jumpForm('add')
          this.utools.setSession('ImportCustomOrderForm', { jumpType: 'add' })
        },
        async update () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.error('请选择要修改的数据');
          } else {
            const { data } = await api.searchOneImportCustomOrderData(this.curRowData.planOrderNo);
            this.jumpForm('update')
            this.utools.setSession('ImportCustomOrderForm', data)
          }
        },
        delete () {
          this.utools.titleCallBack.bind(this)(this.curRowData, () => {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { status, data: { list, count } } = await api.deleteImportCustomOrderData(this.curRowData.planOrderNo);
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.goStartPage();
              } catch (e) { console.log(e) }
            })
          })
        }
      };
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
    this.handleBtnClick('search');
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
