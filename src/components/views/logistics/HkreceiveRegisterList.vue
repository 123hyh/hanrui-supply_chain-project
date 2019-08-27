<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :btnObj="btnObj"
        :formConfig="queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :tableData="table.tableData"
        :tableDataKey="table.tableConfig"
        :isShowTabTable="true"
        @TableClickRowData="TableClickRowData"
        @handleDbclickTable="handleDbclickTable"
      ></table-component>
      <!-- 分页 -->
      <pagination-component
        :count="pageCount"
        @handlePageChange="initTableList"
      ></pagination-component>
    </div>
  </div>
</template>

<script>
import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js';

import { mapMutations, mapGetters } from 'vuex';

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";

// 注册表
import tableConfig from "@/domain/tableconfig/logistics/HkreceiveRegister.js"

export default {
  props: {
    btnObj: {
      type: Array,
      default: () => [
        // 暂时
        { label: "查询", type: "search" },
        { label: "新增", type: "add" },
        { label: "操作", type: "update" },
        { label: "删除", type: "delete" }
      ]
    }
  },
  created () {
    this.initTableList();
  },
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent,
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "委托单号", moduleBind: "delegeteBillNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "创建人", moduleBind: "creator", isInput: true },
        { label: "创建时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "~", moduleBind: "createTimeTo", isDate: true },
      ]
    }
  },
  data: _ => ({
    queryBar: {
      data: {},
    },
    table: {
      tableData: [],
      tableConfig
    },
    clickRow: {},
    pageCount: 0
  }),
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    async initTableList (pageParams = {}) {
      try {
        const { data: { list, count } } = await api.getHkreceiveRegisterList({ ...pageParams, ...this.queryBar.data });
        this.pageCount = count, this.table.tableData = list.reduce((pre, cur) => pre = [...pre, {
          ...cur,
          sourceBillTypeName: cur.sourceBillType === '1' ? '委托订单' : '卖方交(发)提货'
        }], []);
      } catch (error) {
        console.lg(error)
      }
    },
    async handleBtnClickType (type) {
      switch (type.toLowerCase()) {
        case 'search':
          this.initTableList();
          break;
        case 'delete': {
          let s = 0;
          if (!this.clickRow.billNo) {
            utools.alertMessage.bind(this)('', '请选择一条数据');
            return
          }
          try {
            const { status } = await api.deleteHkreceiveRegister(this.clickRow.billNo);
            s = status;
            this.initTableList()
          } catch (error) {
            console.log(error)
          }
          utools.alertMessage.bind(this)(s)
        }
          break;
        default:
          this.jumpForm(type);
          break;
      }
    },
    TableClickRowData (clickRow) {
      this.clickRow = clickRow;
    },
    handleDbclickTable (data) {
      this.TableClickRowData(data)
      this.handleBtnClickType('update');
    },
    jumpForm (type) {
      if (type === 'update' && !utools.judgeNullObj(this.clickRow)) {
        utools.alertMessage.call(this, '', '请选择一条数据');
        return;
      }
      let params = {
        path: '/HkreceiveRegisterForm',
        title: 'HK收货登记信息',
        data: {
          status: type,
        }
      }
      type == 'update' && (params.data.formData = this.clickRow);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "HkreceiveRegisterForm"
      });
    }
  },

};
</script>

<style scoped>
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
</style>
