<template>
  <div class="center-table">
    <BtnComponent
      :btnList='btnList'
      @handleItemBtnClick="target => $emit('handleItemBtnClick', target)"
    ></BtnComponent>
    <div>
      <el-table
        ref="multipleTable"
        border
        :data="table.data"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- 多选 选择 -->
        <el-table-column
          label='选择'
          width="55"
        >
          <!-- 判断 状态 为未提交的才显示多选框 -->
          <template slot-scope="scope">
            <el-checkbox
              v-if="scope.row.status === 0"
              :label='scope.row'
              v-model="tableChecked.selectData"
              @input.native="handleSelectData($event, JSON.stringify(scope.row))"
            ></el-checkbox>
          </template>
        </el-table-column>
        <!-- 多选 分摊 -->
        <el-table-column
          label='分摊'
          width="55"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-if="scope.row.status === 0"
              :label='scope.row'
              v-model.lazy="tableChecked.apportion"
              @input.native='handleSelectApportion($event, JSON.stringify(scope.row))'
            ></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column
          v-for="item of table.config"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <div style="text-align:right;margin-top:10px">
        <el-pagination
          background
          :page-sizes="[10,20,30,40,50]"
          :page-size.sync="page.pageSize"
          :current-page.sync='page.pageIndex'
          layout="sizes, total, prev, pager, next"
          :total="table.count"
          @size-change='getTablePageData'
          @current-change='getTablePageData'
        >
        </el-pagination>
      </div>
      <div class="total-layout">
        <div>合计：</div>
        <div>
          <pre><code>应开票金额：{{selectTotal.oughtInvoiceMoney}}</code>  <code>已开票金额：{{selectTotal.alreadyOpenMoney}}</code>  <code>本次开票金额：{{selectTotal.thisOpenMoney}}</code></pre>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import api from '@/assets/js/appHelper.js'

import BtnComponent from '@/components/common/BtnComponent.vue'

export default {
  props: {
    tableChecked: Object
  },
  components: {
    BtnComponent
  },
  created () {
    this.getTablePageData()
  },
  computed: {
    /**
       * @method selectTotal 选中数据的合计
       *  @property oughtInvoiceMoney 应开票金额
       *  @property alreadyOpenMoney 已开金额 
       *  @property thisOpenMoney 本次开票金额
       */
    selectTotal () {
      return [...this.tableChecked.selectData, ...this.tableChecked.apportion].reduce((obj, cur) => {
        obj.oughtInvoiceMoney += (+cur.oughtInvoiceMoney || 0);
        obj.alreadyOpenMoney += (+cur.alreadyOpenMoney || 0);
        obj.thisOpenMoney += (+cur.thisOpenMoney || 0);
        return obj
      },
        {
          oughtInvoiceMoney: 0,
          alreadyOpenMoney: 0,
          thisOpenMoney: 0
        }
      )
    },
  },
  data: _ => ({
    page: {
      pageSize: 10,
      pageIndex: 1
    },
    btnList: [
      { type: 'electronicInvoice', label: '电子发票' },
      { type: 'printInvoice', label: '打印发票' },
      { type: 'export', label: '导出' },
      { type: 'financeConfirm', label: '财务确认' },
      { type: 'query', label: '查询' }
    ],
    table: {
      data: [],
      count: 0,
      config: [
        { prop: 'entrustOrderNo', label: '委托单号', width: 0 },
        { prop: 'businessType', label: '业务类型', width: 0 },
        { prop: 'status', label: '状态', width: 0 },
        { prop: 'invoiceNo', label: '发票号码', width: 0 },
        { prop: 'openInvoiceTime', label: '开票日期', width: 0 },
        { prop: 'purchaseUnit', label: '购买单位', width: 0 },
        { prop: 'openInvoiceDetail', label: '开票明细', width: 0 },
        { prop: 'oughtInvoiceMoney', label: '应开票金额', width: 0 },
        { prop: 'alreadyOpenMoney', label: '已开金额', width: 0 },
        { prop: 'thisOpenMoney', label: '本次开票金额', width: 0 },
      ]

    },
  }),
  methods: {
    /* ------------------------------------------ 表格的事件 start ----------------------------------------------- */

    /* 业务逻辑 状态为“已开票”的【选择】【分摊】栏位不允许勾选，选择的明细需判断归属同一业务类型，同一购货单位； */

    // 第一个选择 的多选框 change事件
    handleSelectData ({ target }, row) {
      this.watchCheckBox.call(this, row, target, 'selectData')
    },

    // 第二个 分摊 的多选框事件
    handleSelectApportion ({ target }, row) {
      this.watchCheckBox.call(this, row, target, 'apportion')
    },

    watchCheckBox (row, dom, target) {
      const { checked } = dom,
        relative = target === 'selectData' ? 'apportion' : 'selectData',
        val = JSON.parse(row),
        arr = this.tableChecked[target],
        fn = item => item.itemCode === val.itemCode,
        returnMsg = (dom, msg) => (dom.checked = false, this.$message.warning(msg));

      // 如果另外一个多选集合中存在重复不在往下执行
      {
        if (checked && this.tableChecked[relative].some(fn))
          return (
            (dom.checked = false), this.$message.warning('勾选不允许重复！！')
          );
      }

      // 判断 状态不是 已开票的 
      {
        if (val.status == '1') return returnMsg(dom, '不允许勾选已开过票的单据');
      }

      // 判断是否 同一个业务类型 同一个购货单位
      {
        const fitBusinessType = (target, val, prop) => target.length && target.some(item => val[prop] !== item[prop]),
          handleFn = msg => returnMsg(dom, `必须选择一致的${msg}`);
        if (fitBusinessType(this.tableChecked[relative], val, 'businessType') || fitBusinessType(this.tableChecked[target], val, 'businessType'))
          return handleFn('业务类型');

        if (fitBusinessType(this.tableChecked[relative], val, 'purchaseUnit') || fitBusinessType(this.tableChecked[target], val, 'purchaseUnit'))
          return handleFn('购货单位');
      }
      /* 业务逻辑 开票设置中选择【按商品明细开票】时，需判断货款、关税、增值税明细已同时勾选，否则提示无法选择按商品明细开票； */
    },

    // 获取表格分页数据
    async getTablePageData () {
      debugger
      try {
        const data = await api.getTablePageData(this.page);
        this.table.data = data.list;
        this.table.count = data.count
      } catch (error) {
        console.log(error)
      }
    }
    /* ------------------------------------------ 表格的事件 end ----------------------------------------------- */
  }
}
</script>
<style lang="less">
.center-table {
}
</style>