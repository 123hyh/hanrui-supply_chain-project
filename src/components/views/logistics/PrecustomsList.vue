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

import tableconfig from '@/domain/tableconfig/logistics/Precustoms'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '待报关列表',
    curRowData: '',
    tableData: [],
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
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "单据编号", moduleBind: "preCustomsCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "报关类型", moduleBind: "customsFormTypeName", isInput: true },
      ]
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.queryprecustomsSearch(this.ruleForm);
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
    handleBtnClickObj () {
      return {
        search () {
          this.goStartPage();
        },
        add () {
          this.jumpForm("add");
          this.utools.setSession('PrecustomsForm', { jumpType: 'add' })
        },
        async update () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.error('请选择要修改的数据');
          } else {
            const { data } = await api.searchOneprecustomsData(this.curRowData.preCustomsCode);
            this.utools.setSession('PrecustomsForm', data)
            this.jumpForm("update");
          }
        },
        delete () {
          this.utools.titleCallBack.bind(this)(this.curRowData, () => {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { status, data: { list, count } } = await api.deleteprecustomsData(this.curRowData.preCustomsCode);
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.goStartPage();
              } catch (e) { console.log(e) }
            })
          })
        }
      };
    },
    jumpForm (type) {
      let params = {
        path: '/PrecustomsForm',
        title: "待报关列表信息",
        data: {
          status: type,
          formData: { tenantId: 'hfy' }
        }
      }
      type == 'update' && (params.data.formData = this.curRowData);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "PrecustomsForm"
      });
    },
    handleChange (paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;
      this.queryData();
    },
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row)
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
