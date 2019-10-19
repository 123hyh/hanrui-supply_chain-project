<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :btnObj="btnObj"
        :formConfig="formConfig"
        :ruleForm="ruleForm"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        border
        highlight-current-row
        ref="moviesTable"
        stripe
      >
        <el-table-column
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          v-for="item in tableconfig"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <pagination :count="ruleForm.total" @handlePageChange="handleChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/business/ClientEvaluation'
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['orderStatus']),
    formConfig() {
      return [
        { label: '委托方编码', moduleBind: 'clientNo', isInput: true },
        {
          label: '单据状态',
          moduleBind: 'status',
          isSelect: true,
          selectOption: this.orderStatus
        },
        { label: '名称', moduleBind: 'clientName', isInput: true },
        { label: '制单人', moduleBind: 'creator', isInput: true },
        { label: '制单时间', moduleBind: 'createTimeFrom', isDate: true },
        { label: '至', moduleBind: 'createTimeTo', isDate: true }
      ]
    }
  },
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableconfig,
    menuName: '委托方评估',
    tableData: [],
    curRowData: '',
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 0
    },
    btnObj: [
      { type: 'search', label: '查询' },
      { type: 'add', label: '新增' },
      { type: 'update', label: '操作' },
      { type: 'delete', label: '删除' }
    ]
  }),
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    //搜索列表数据
    async queryData() {
      try {
        const { data } = await api.queryclientevaluationSearch(this.ruleForm)
        this.tableData = data.list
        this.utools.turnCodeBoolean(this.tableData)
        this.ruleForm.total = data.count
        this.curRowData = {} // 清空当前行数据
      } catch (e) {
        console.log(e)
      }
    },
    goStartPage() {
      this.ruleForm.pageIndex = 1 //页签调到第一页
      this.queryData()
    },
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
      var obj = null
      return function(type, clear) {
        if (clear) {
          obj = null
        } else {
          !obj && (obj = this.handleBtnClickObj())
          obj[type].bind(this)()
        }
      }
    })(),
    handleBtnClickObj() {
      return {
        search() {
          this.goStartPage()
        },
        add() {
          this.jumpForm('add')
        },
        async update() {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.error('请选择要修改的数据')
          } else {
            this.jumpForm('update')
            sessionStorage.setItem('btnType', 'update')
            const { data } = await api.searchOneclientevaluationData(
              this.curRowData.itemCode
            )
            sessionStorage.curRowData = JSON.stringify(data)
          }
        },
        delete() {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.error('请选择要删除的数据')
          } else {
            this.utools.removeReceiptsTips.call(this, async () => {
              try {
                const { data, status } = await api.deleteclientevaluationData(
                  this.curRowData.itemCode
                )
                this.goStartPage()
              } catch (e) {
                console.log(e)
              }
            })
          }
        }
      }
    },
    jumpForm(type) {
      let params = {
        path: '/ClientEvaluationForm',
        title: '委托方评估信息',
        data: {
          status: type
        }
      }
      type == 'update' && (params.data.formData = this.curRowData)
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: 'ClientEvaluationForm'
      })
    },
    handleChange(paper) {
      this.ruleForm.pageIndex = paper.pageIndex
      this.ruleForm.pageSize = paper.pageSize
      this.queryData()
    },
    clickRow(row) {
      this.curRowData = row
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    dblclickTableRow(row) {
      this.curRowData = row
      this.$refs.moviesTable.toggleRowSelection(row)
      this.handleBtnClick('update')
    }
  },
  created() {
    this.goStartPage()
  },
  beforeDestroy() {
    this.handleBtnClick('', 1)
  }
}
</script>

<style scoped lang="less">
</style>
