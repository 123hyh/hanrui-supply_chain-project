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
        :queryBarVisible='false'
        :dialog='false'
        :popoverList='tableData'
        :popoverListKey='tableconfig'
        :count='tableCount'
        :activeRow.sync='formDialog.clickRow'
        @handlePageChange='handleChange'
        @dblclickTableRow='dblclickTableRow'
      ></table-component>
    </div>
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
import QueryBar from '@/components/common/QueryBar'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


import tableconfig from '@/domain/tableconfig/basicdata/Administrative'
import ruleForm from '@/domain/entities/basicdata/Administrative'
import formConfig from '@/domain/formconfig/basicdata/Administrative'
import { mapGetters } from 'vuex'

export default {
  watch: {
    'formDialog.isShowPopover' (val) {
      if (val) {
        this.utools.getLocation({
          location: 'province',
          form: { formConfig: this.formDialog.formConfig, fields: 'province' }
        })
      } else {
        this.formDialog.resetFields()
      }
    },
    'formDialog.ruleForm.province' (val, oldVal) {
      if (!val) return;
      this.utools.getLocation({
        location: 'city',
        code: val,
        form: { formConfig: this.formDialog.formConfig, fields: 'city' }
      });
      this.regionCondition.oldVal && (this.formDialog.ruleForm.city = '', this.formDialog.ruleForm.district = '');
      this.$nextTick(() => {
        this.regionCondition.oldVal = 1
      })
    },
    'formDialog.ruleForm.city' (val, oldVal) {
      if (!val) return;
      this.utools.getLocation({
        location: 'district',
        code: val,
        form: { formConfig: this.formDialog.formConfig, fields: 'district' }
      })
      this.regionCondition.oldVal && (this.formDialog.ruleForm.district = '')
      this.$nextTick(() => {
        this.regionCondition.oldVal = 1
      })
    },
  },
  components: {
    QueryBar,
    PopoverComponent: () => import('@/components/common/Table.Form.Dialog/DialogComponent.vue'),
    TableComponent
  },

  data: () => ({

    tableconfig,
    menuName: '关务行政区域代码',
    tableData: [],
    tableCount: 0,
    ruleForm: {},
    regionCondition: { active: '', old: '' },

    formDialog: {
      isShowPopover: false,
      paper: {},
      ruleForm: new ruleForm(),
      formConfig,
      btnKey: '',
      clickRow: {},
      validate: eval, //表单验证回调
      resetFields: eval, // 清除表单的验证效果
      itemName: '关务行政区域代码'
    }
  }),
  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "customsCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },

    clickTypeAsync () {
      return {
        'search': async (page) => {
          try {
            const { data: { list = [], count = 0 } } = await api.queryadministrativeSearch({ ...this.ruleForm, ...page });
            this.utools.turnCodeBoolean(list),
              this.tableData = list,
              this.tableCount = count;
          } catch (e) {
            this.$message.error('查询列表数据失败，请重试！');
            console.log(e)          }
        },
        'add': () => (this.formDialog.isShowPopover = true, this.loadCodeNo(), this.formDialog.ruleForm = { ...new ruleForm(), customsCode: this.formDialog.ruleForm.customsCode }),
        'update': () => {
          this.utools.titleCallBack.call(this, this.formDialog.clickRow, async () => {
            try {
              const { data } = await api.searchOneadministrativeData(this.formDialog.clickRow.customsCode);
              this.formDialog.ruleForm = this.formDialog.clickRow = data;
              this.formDialog.isShowPopover = true;
            } catch (e) {
              console.log(e)
            }
          })
        },
        'delete': () => {
          this.utools.titleCallBack.call(this, this.formDialog.clickRow,
            () => {
              this.utools.removeReceiptsTips.call(this, async () => {
                await api.deleteadministrativeData(this.formDialog.clickRow.customsCode);
                this.clickTypeAsync['search']()
              })
            })
        },
      }
    }
  },
  methods: {

    /************************** 弹窗methods end *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick (clickType, page) {
      this.formDialog.btnKey = clickType;
      this.clickTypeAsync[clickType](page);
    },

    /**
     * @method handlerFormVerify 设置验证规则
     */
    handlerFormVerify ({ formModel: { validate, resetFields } }) {
      this.formDialog.validate = validate;
      this.formDialog.resetFields = resetFields
    },

    isVerify () {
      let isVerify = false;
      this.formDialog.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },

    // 弹窗提交
    handlerOtherSubmit ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },

    // 提交单据
    async submitStatus () {
      let { customsCode } = this.formDialog.ruleForm, sCode = 0;
      try {
        const { status } = await api.updateBillStatus({ type: 'submit', code: customsCode });
        sCode = status;
        this.formDialog.isShowPopover = false;
      } catch (error) {
        console.log(error)
      } finally {
        this.utools.alertStatusMessage.call(this, { status: sCode, msg: sCode === 200 ? { success: '提交成功' } : { error: '提交失败,请重试' } });
      }
    },

    // 保存单据
    async saveForm () {
      if (this.isVerify()) {
        this.utools.saveReceiptsTips.call(this, async () => {
          const {
            data,
            status
          } = await api[
            this.formDialog.btnKey === 'add' ? 'addadministrativeData' : 'editadministrativeData'
          ](this.formDialog.ruleForm);
          this.formDialog.ruleForm.status = data.status;
          this.clickTypeAsync['search']()
        })
      }
    },

    // 表格分页事件
    handleChange (param) {
      this.handleBtnClick('search', param)
    },

    // 表格双击事件
    dblclickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.formDialog.clickRow))) {
        this.regionCondition = { active: row.province, old: '' }
        this.formDialog.clickRow = row;
      }
      this.handleBtnClick('update');
    },
    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getadministrativeCode();
        this.$set(this.formDialog.ruleForm, 'customsCode', data)
      } catch (e) {
        this.$message.error('获取编码失败,请重试！')
        console.log(e)
      }
    },
  },
  created () {
    api.initSelect(this.formDialog.formConfig)
    this.handleBtnClick('search');
  },
}
</script>
