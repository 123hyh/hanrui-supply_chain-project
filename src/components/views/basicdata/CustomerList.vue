<template>
  <div class="table customer-list">
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :formConfig="queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>
      <!-- 表格 -->
      <!-- 表格 -->
      <table-component
        :dialog='false'
        :queryBarVisible='false'
        :activeRow.sync='clickRowData'
        :popoverList='tableData'
        :count='paginaCount'
        :popoverListKey='tableconfig'
        @dblclickTableRow='handleDbclickTable'
        @handlePageChange='handlePageChange'
      ></table-component>
    </div>
  </div>
</template>

<script>
import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'

import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import QueryBar from "@/components/common/QueryBar.vue";
import tableconfig from '@/domain/tableconfig/basicdata/Customer.js'

import { mapMutations, mapGetters } from 'vuex'
export default {

  data () {
    return {
      tableconfig,
      tableData: [],
      paginaCount: 0,
      clickRowData: {},
      queryBar: {
        data: {}
      }
    };
  },

  created () {
    this.handleBtnClickType('search');
  },

  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "customerNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "customerName", isInput: true },
        { label: "简称", moduleBind: "shortName", isInput: true },
        { label: "助记码", moduleBind: "shortCode", isInput: true },
      ]
    },

    queryClickAsync () {
      return {
        'search': (data = {}) => api.getCustomerList({ ...data, ...this.queryBar.data }),
        'add': () => { this.goAdd() },
        'update': () => { this.goUpdate() },
        'delete': data => {
          if (data) {
            return api.deleteCustomerData(data)
          } else {
            return { status: 404, data: {} }
          }
        }
      }
    }
  },
  methods: {

    ...mapMutations(['addbreadCrumbsList']),

    handleDbclickTable (data) {
      this.handleBtnClickType('update');
    },

    async handleBtnClickType (clickObj, page) {
      try {
        switch (clickObj) {
          case 'search':
            const { data: { list, count }, status } = await this.queryClickAsync[clickObj](page);
            this.tableData = list || [], this.paginaCount = count || 0;
            break;
          case 'delete':
            utools.titleCallBack.call(
              this,
              this.clickRowData.customerNo,
              utools.removeReceiptsTips.bind(
                this,
                async () => {
                  const { status, data: { list = [], count = 0 } } = await this.queryClickAsync[clickObj](this.clickRowData.customerNo);
                  this.tableData = list, this.paginaCount = count;
                  this.handleBtnClickType('search');
                }
              )
            )
            break;
          default:
            this.queryClickAsync[clickObj]()
            break;
        }
      } catch (error) {
        utools.alertMessage.bind(this)('', '操作失败,请重试')
        console.log(error)
      }
    },

    handlePageChange (pageData = {}) {
      this.handleBtnClickType('search', pageData)
    },

    goAdd () {
      this.JumpRouter('add')
    },

    goUpdate () {
      utools.titleCallBack.call(
        this,
        this.clickRowData,
        () => { this.JumpRouter('update') }
      )
    },

    JumpRouter (type) {
      let params = {
        path: '/Customerform',
        title: '供应链客户信息',
        data: {
          status: type,
          formData: {}
        }
      }
      type == 'update' && (params.data.formData.base = this.clickRowData);
      this.addbreadCrumbsList(params)
      this.$router.push({ path: '/Customerform' })
    },
  },

  components: {
    QueryBar,
    TableComponent
  }
};
</script>

<style lang='less'>
.customer-list {
  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt {
    font-size: 16px;
    text-align: center;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
}
</style>
