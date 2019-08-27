import formConfig from '@/domain/formconfig/finance/AdjustApplicationItem.js'
import utools from '@/domain/common/utools.js'
import api from "@/assets/js/appHelper.js";

const { cloneObj, isNull } = utools;
export default {
  data: _ => ({
    formDialog: {
      target: '',
      title: '查询条件',
      visibel: false,
      form: {
        ruleForm: {},
        formConfig
      }
    },
  }),
  methods: {
    // 保存子表操作
    async formDialoClickPreservation () {
      let sCode = 200;
      try {
        if (this.status === 'add') {
          const { itemCode } = this.formDialog.form.ruleForm,
            fn = item => item.itemCode === itemCode,
            Tindex = this.itemTable.tempList.findIndex(fn),
            Lindex = this.itemTable.list.findIndex(fn);
          ~Tindex && (
            this.itemTable.tempList[Tindex] = cloneObj(this.formDialog.form.ruleForm),
            this.itemTable.list[Lindex] = this.formDialog.form.ruleForm
          );
          this.itemTable = { ...this.itemTable, list: [...this.itemTable.list] };

          this.itemTable.activeRow = {},
            this.formDialog.form.ruleForm = {},
            this.formDialog.visibel = false;

          this.$message({ type: 'success', message: '保存成功！' })
          return false
        }
        await api.changeAdjustapplicationitemData({ data: this.formDialog.form.ruleForm, method: 'PUT' });
        this.formDialog.form.ruleForm = {},
          this.formDialog.visibel = false,
          this.itemTable.activeRow = {}
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '保存成功！' : '保存失败，请重试！'
        })
      }
    },
    handlerFormDialogClickSearch () {

    }
  }

}