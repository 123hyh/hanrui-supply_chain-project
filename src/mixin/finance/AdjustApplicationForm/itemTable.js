import itemTableConfig from '@/domain/tableconfig/finance/AdjustApplicationItem.js'
import utools from '@/domain/common/utools.js'
import api from "@/assets/js/appHelper.js";


const { cloneObj, isNull, deleteMessage: affirm } = utools;
export default {
  data: _ => ({
    itemTable: {
      tempList: [],
      list: [],
      config: itemTableConfig,
      count: 0,
      activeRow: {},
      btnList: [{ type: 'update', label: '修改' }, { type: 'delete', label: '删除' }]
    },
  }),
  methods: {
    // 获取子表分页数据
    async getItemTableData (pageData = {}) {
      const { data: { list, count } } = await api.getAdjustApplicationItemData({ ...pageData, billNo: this.form.data.billNo });
      this.itemTable = { ...this.itemTable, list, count }
    },
    // 子表分页事件
    itemTablePageChange (data) {
      if (this.status === 'add') {
        const INDEX = (data.pageIndex - 1) * data.pageSize;
        this.itemTable = {
          ...this.itemTable,
          list: cloneObj(this.itemTable.tempList.slice(INDEX, data.pageSize + INDEX))
        }
      } else {
        this.getItemTableData(data)
      }
    },
    // 子表按钮点击事件
    handleItemBtnClick (type) {
      if (isNull(this.itemTable.activeRow)) {
        this.$message({
          type: 'warning',
          message: '请选中一条数据操作！'
        });
        return
      }

      if (type == 'update') {
        this.formDialog.form.ruleForm = cloneObj(this.itemTable.activeRow);
        this.formDialog.visibel = true;
      } else {
        this.deleteItemData()
      }
    },

    deleteItemData () {
      affirm.call(this, async () => {
        let sCode = 200;
        try {
          if (this.status === 'add') {
            const { itemCode } = this.itemTable.activeRow,
              fn = item => item.itemCode === itemCode,
              Tindex = this.itemTable.tempList.findIndex(fn),
              Lindex = this.itemTable.list.findIndex(fn);
            ~Tindex && (
              this.itemTable.tempList.splice(Tindex, 1),
              this.itemTable.list.splice(Lindex, 1)
            );
            this.itemTable = { ...this.itemTable, list: [...this.itemTable.list] };
            this.$message({ type: 'success', message: '删除成功！' });
            this.itemTable.activeRow = {};
            return false
          }
          await api.deleteAdjustapplicationitemData(this.itemTable.activeRow.itemCode);
          this.itemTable.activeRow = {}
          this.getItemTableData();
        } catch (error) {
          sCode = 0;
          console.log(error)
        } finally {
          this.$message({
            type: sCode ? 'success' : 'error',
            message: sCode ? '删除成功！' : '删除失败，请重试！'
          })
        }
      })
    }
  },
}