<template>
  <div>
    <breadcrumb-navigation />
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
        :activeRow.sync='formDialog.clickRow'
        :popoverList='tableData'
        :count='tableCount'
        :popoverListKey='tableconfig'
        @dblclickTableRow='dblclickTableRow'
        @handlePageChange='handleChange'
      ></table-component>
    </div>

    <!-- 表单弹窗 -->
    <popover-component
      :isShowPopover.sync='formDialog.isShowPopover'
      popoverType='form'
      :billsStatus='formDialog.ruleForm.status'
      :formData='formDialog'
      :itemName='formDialog.itemName'
      @formClickPreservation="handlerOtherSubmit"
      @handlerFormVerify="handlerFormVerify"
    ></popover-component>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import QueryBar from '@/components/common/QueryBar'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'

import tableconfig from '@/domain/tableconfig/basicdata/FinanceProject'
import ruleForm from '@/domain/entities/basicdata/FinanceProject'
import formConfig from '@/domain/formconfig/basicdata/FinanceProject'
import { mapGetters } from 'vuex'

export default {
  components: {
    QueryBar,
    TableComponent,
    PopoverComponent,
  },
  data: () => ({
    tableconfig,
    menuName: '财务计费项目表',
    tableData: [],
    tableCount: 0,
    ruleForm: {},

    formDialog: {
      isShowPopover: false,
      paper: {},
      ruleForm: new ruleForm(),
      formConfig,
      btnKey: '',
      clickRow: {},
      validate: eval, //表单验证回调
      resetFields: eval,
      itemName: '财务计费项目'
    }
  }),
  watch: {
    'formDialog.isShowPopover' (val) {
      if (!val) this.formDialog.resetFields()
    }
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "financeProjectCode", isInput: true },
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
            const {
              data: {
                list = [], count = 0
              }
            } = await api.queryfinanceprojectSearch({ ...this.ruleForm, ...page });
            this.utools.turnCodeBoolean(list),
              this.tableData = list,
              this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': _ => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            financeProjectCode: this.formDialog.ruleForm.financeProjectCode
          }
        ),

        'update': _ => {
          this.utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            async _ => {
              try {
                const { data } = await api.searchOnefinanceprojectData(this.formDialog.clickRow.financeProjectCode);
                this.formDialog.ruleForm = this.formDialog.clickRow = data,
                  this.formDialog.isShowPopover = true;
              } catch (e) {
                this.$message.error('获取数据失败，请重试！')
                console.log(e)
              }
            }
          )
        },

        'delete': () => {
          this.utools.titleCallBack.call(
            this,
            this.formDialog.clickRow, () => {
              this.utools.removeReceiptsTips.call(
                this,
                async () => {
                  await api.deletefinanceprojectData(this.formDialog.clickRow.financeProjectCode);
                  this.clickTypeAsync.search()
                }
              )
            }
          )
        }
      }
    }
  },
  methods: {

    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick (clickType, page) {
      this.formDialog.btnKey = clickType,
        this.clickTypeAsync[clickType](page);
    },

    /**
     * @method handlerFormVerify 设置验证规则
     */
    handlerFormVerify ({ formModel: { validate, resetFields } }) {
      this.formDialog.validate = validate,
        this.formDialog.resetFields = resetFields;
    },

    // 弹窗按钮事件
    async handlerOtherSubmit ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },

    // 保存表单
    async saveForm () {
      this.formDialog.validate(valid => {
        if (valid) {
          this.utools.saveReceiptsTips.call(
            this,
            async () => {
              const {
                data,
                status
              } = await api[
                this.formDialog.btnKey === 'add' ? 'addfinanceprojectData' : 'editfinanceprojectData'
              ](this.formDialog.ruleForm);
              this.formDialog.ruleForm.status = data.status;
              this.clickTypeAsync.search()
            }
          )
        }
      })
    },

    // 提交单据
    async submitStatus () {
      this.utools.sbumitReceiptsTips.call(
        this,
        async () => {
          const { status } = await api.updateBillStatus({
            type: 'submit',
            code: this.formDialog.ruleForm.financeProjectCode
          });
          this.formDialog.isShowPopover = false;
        }
      )
    },

    //列表翻页
    handleChange (param) {
      this.handleBtnClick('search', param)
    },

    // 表格双击事件
    dblclickTableRow (row) {
      this.formDialog.clickRow = row,
        this.handleBtnClick('update');
    },

    //加载单据编号
    async loadCodeNo () {
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getfinanceprojectCode();
        this.$set(this.formDialog.ruleForm, 'financeProjectCode', data)
      } catch (e) { console.log(e) }
    },
  },
  created () {
    api.initSelect(this.formDialog.formConfig)
    this.handleBtnClick('search');
  }
}
</script>