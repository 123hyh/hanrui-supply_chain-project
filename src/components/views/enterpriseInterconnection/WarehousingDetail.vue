/**
  入库明细
 */
<template>
  <div class="container pd-10">
    <query-bar
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>
    <!-- 主表 -->
    <table-component
      :queryBarVisible='false'
      :dialog="false"
      :popoverList="table.list"
      :popoverListKey='table.config'
      :count="table.count"
      :activeRow.sync="table.activeRow"
      @handlePageChange="handlePageChange"
    ></table-component>
    <!-- 商品信息表格 -->
    <table-component
      :queryBarVisible='false'
      :dialog="false"
      :popoverList="productTable.list"
      :popoverListKey='productTable.config'
      :count="productTable.count"
      :activeRow.sync="productTable.activeRow"
      @handlePageChange="handleProductPageChange"
    ></table-component>
  </div>
</template>
<script>
// 接口 工具
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";
const { isNull } = utools;

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";

// 注册表
import tableConfig from "@/domain/tableconfig/enterpriseInterconnection/WarehousingDetail.js";
import productConfig from '@/domain/tableconfig/enterpriseInterconnection/WarehousingDetailProduct.js'
import { mapGetters, mapMutations } from 'vuex'
export default {

  components: {
    QueryBar,
    TableComponent
  },

  data: _ => ({
    queryBar: {
      data: {}
    },
    table: {
      list: [],
      config: tableConfig,
      count: 0,
      activeRow: {}
    },
    productTable: {
      list: [],
      count: 0,
      config: productConfig,
      activeRow: {}
    }
  }),

  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "委托单号", moduleBind: "tradeName", isInput: true },
        { label: '商品名称', moduleBind: 'status', isInput: true },
        { label: "批次", moduleBind: "materielType", isInput: true },

      ]
    },
  },

  created () {
    this.getTablePageData()
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),

    async getTablePageData (data = {}) {
      try {
        /*  const {
           data: { list, count }
         } = await api.getMaterielBaseList({ ...this.queryBar.data, ...data });
         this.table = { ...this.table, list, count } */
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
        console.log(error);
      }
    },

    // 主 列表分页事件
    handlePageChange (pageData) {
      this.getTablePageData(pageData)
    },

    // 商品信息分页事件
    handleProductPageChange (pageData = {}) {
      debugger
    },

    // 查询栏按钮点击事件
    handleBtnClickType (target) {
      switch (target) {
        case 'add':
        case 'update':
          this.jumpEditPage(target); break;
        case 'search':
          this.getTablePageData(); break;
        case 'delete':
          this.removeBills()
      }
    },

    // 跳转到编辑页面
    jumpEditPage (type) {
      const IS_UPDATE = type === 'update';
      if (IS_UPDATE && isNull(this.table.activeRow)) return this.$message.warning('请选择一条数据进行操作！');
      let param = {
        path: '/MaterielBaseForm',
        title: '物料基础信息',
        data: {
          status: type,
          formData: type === 'update' && { materielCode: this.table.activeRow.materielCode }
        }
      };
      this.addbreadCrumbsList(param);
      this.$router.push('/MaterielBaseForm');
    },

    // 删除单据
    async removeBills () {
      if (isNull(this.table.activeRow)) return this.$message.error('请选择一条数据进行操作！');

      let sCode = 1;
      try {
        const data = await api.deleteMaterielBase(this.table.activeRow.materielCode);
        this.table.activeRow = {},
          this.getTablePageData();
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '删除成功！' : '删除失败，请重试！'
        })
      }
    }
  }
}
</script>