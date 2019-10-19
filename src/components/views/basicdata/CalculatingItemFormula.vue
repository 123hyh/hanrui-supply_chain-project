<template>
  <div class="table calculating-item-formula">
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
    <!-- 表单弹窗 -->
    <dialog-component
      itemName='计费项目公式'
      :isShowPopover.sync="formDialog.isshow"
      popoverType="form"
      :formData="formDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
    >
      <template slot='bottom'>
        <div class="layout">
          <div>
            <!-- 计算公式 -->
            <div>
              <el-form
                status-icon
                ref="ruleForm"
                label-width="100px"
                class="form-layout"
              >
                <el-form-item
                  label="计算结果"
                  prop="pass"
                  style="flex:4"
                >
                  <el-select
                    placeholder="请选择"
                    v-model="formDialog.ruleForm.resultFactor"
                    filterable
                  >
                    <el-option
                      v-for="item of resultSelectOption"
                      :key="item.id"
                      :label="item.factorName"
                      :value="item.factorField"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  style="flex:9"
                  label="="
                  prop=""
                  class="result-select"
                >
                  <el-input
                    v-model="formDialog.ruleForm.formula"
                    style="width:100%"
                    :rows="2"
                    type="textarea"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- 顶部 运算符按钮 -->
            <div>
              <el-button
                type="primary"
                v-for='item of operationalCharacter'
                :key="item"
                @click.stop='setFormula({operator:item})'
              >{{item}}</el-button>
            </div>

            <!-- 字段 -->
            <div>
              <div
                v-for="(val,key,i) of computedField"
                :key="i"
              >
                <div class="cut-off-rule">{{key | title}}</div>
                <el-button
                  v-for="item of val"
                  type="text"
                  :key="item.comment"
                  @click.stop='setFormula({comment:item.factorName, field:item.factorField})'
                >{{item.factorName}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </dialog-component>

    <!-- 表格弹窗选择 -->
    <popover-component
      :isShowPopover="tableDialog.isshow"
      :popoverList='tableDialog.data'
      :popoverListKey='tableDialog.tableConfig'
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
    ></popover-component>
  </div>
</template>

<script>
// 接口 工具
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";
const { isNull, cloneObj } = utools

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import PopoverComponent from "@/components/common/Table.Form.Dialog/DialogComponent.vue";
import dialogComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/CalculatingItemFormula.js";
import formConfig from "@/domain/formconfig/basicdata/CalculatingItemFormula.js";

export default {
  filters: {
    title (val) {
      return {
        'bus_entrust_order': '订单',
        'bus_entrust_goods': '商品信息'
      }[val]
    }
  },
  created () {
    this.initTableList();
    api.initSelect(this.formDialog.formConfig)
  },
  data: () => ({
    resultSelectOption: [],
    computedField: [],
    operationalCharacter: ['+', '-', '*', '/', '(', ')', '='],
    queryBar: {
      data: {}
    },
    tableDialogTarget: '',
    table: {
      tableData: [],
      tableConfig
    },
    formDialog: {
      isshow: false,
      ruleForm: {},
      formConfig,
      itemName: '管制品清单'
    },
    tableDialog: {
      isshow: false,
      data: [],
      tableConfig: [] /* tableDialogConfig */
    },
    pageCount: 0,
    tableClickRow: {},
    status: ''
  }),
  methods: {
    transtionField ({ data = [], is = true } = {}) {
      const transtion = new Map([
        ['formulaBill', { true: { '1': '委托订单' }, false: { '委托订单': '1' } }],
        ['status', { true: { '1': '启用' }, false: { '启用': '1' } }]
      ]);
      return data.map(item => {
        for (let [key, val] of transtion) {
          item[key] = val[is][item[key]];
        }
        return item;
      })
    },
    async initTableList (params = {}) {
      // 转换字段配置

      try {
        const {
          data: { list, count }
        } = await api.getCustomizedFormulaPageData({ ...this.queryBar.data, ...params });
        (this.table.tableData = this.transtionField({ data: list, is: true })), (this.pageCount = count);
      } catch (error) {
        console.log(error);
      }
    },
    async handleBtnClickType (type) {
      switch (type) {
        case "search":
          await this.initTableList();
          break;
        case "add":
          {
            try {
              const { data } = await this.queryBarRequest[type]();
              this.formDialog.ruleForm = {};
              this.formDialog.ruleForm.controlledGoodsCode = data;
              this.formDialog.isshow = true;
              this.status = 'add';
              this.computedField = []
            } catch (error) {
              console.log(error)
            }
          }
          break;
        case "update":
          {

            if (isNull(this.tableClickRow)) {
              utools.alertMessage.bind(this)("", "请选择一条数据");
              return;
            };
            this.formDialog.ruleForm = (() => {
              let data = this.transtionField({ data: cloneObj([this.tableClickRow]), is: false })[0];
              const [resultFactor, formula] = data.formula.split('=');
              // 处理 显示字段的处理
              data.resultFactor = resultFactor;
              data.formula = formula;
              return data
            })()
            this.formDialog.isshow = true;
            this.status = 'update'
          }
          break;
        case "delete":
          {
            if (isNull(this.tableClickRow)) return this.$message.warning('请选择一条数据进行操作！')
            try {
              const { status } = await this.queryBarRequest[type]();
              this.initTableList();
              this.tableClickRow = {};
              utools.alertMessage.bind(this)(status);
            } catch (error) {
              console.log(error);
            }
          }
          break;
      }
    },
    TableClickRowData (data) {
      this.tableClickRow = data;
    },
    handleDbclickTable (data) {
      this.TableClickRowData(data)
      this.handleBtnClickType('update');
    },
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow
    },
    // 弹窗按钮点击
    async handlerTableFormPreservation () {
      this.saveForm()
    },

    // 保存单据
    async saveForm () {
      let s = 200;
      try {
        const params = this.utools.cloneObj(this.formDialog.ruleForm);
        // 拼接公式
        params.formula = `${params.resultFactor} = ${params.formula}`;

        const { data, status } = await api.changeCustomizedFormulaData({ data: params, method: this.status == 'add' ? 'POST' : 'PUT' });
        this.formDialog.isshow = false,
          this.formDialog.ruleForm = {},
          this.tableClickRow = {},
          this.initTableList()
      } catch (error) {
        s = 0;
        console.log(error)
      } finally {
        this.$message({
          type: s ? 'success' : 'error',
          message: s ? '保存成功！' : '保存失败，请重试！'
        })
      }
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.formDialog.isshow = true
    },
    tableDialogPreservation (clickrow) {
      switch (this.tableDialogTarget) {
        // case 'tradeName':
        //   this.formDialog.ruleForm = {...this.formDialog.ruleForm, tradeName: clickrow.tradeName, trade: clickrow.materielCode };
        //   break;
        // case 'delegeteName':
        //   this.formDialog.ruleForm = {...this.formDialog.ruleForm, delegeteName: clickrow.clientName, delegete: clickrow.clientNo };
        //   break;
      }
    },
    async handlerFormConfigClickSearch (params) {
      try {
        const { data: { list, count } } = await this.tableDialogRequest[params]();
        this.tableDialog.data = list;
      } catch (error) {
        console.log(error)
      }
      this.tableDialogTarget = params;
      this.tableDialog.tableConfig = this.tableDialogConfig[params]();
      this.tableDialog.isshow = true;
    },

    // 点击按钮添加计算公式
    setFormula ({ comment = '', field = '', operator = '' } = {}) {
      const { formulaDes = '', formula = '' } = this.formDialog.ruleForm;
      this.$set(this.formDialog.ruleForm, 'formulaDes', `${formulaDes} ${comment}${operator}`);
      this.$set(this.formDialog.ruleForm, 'formula', `${formula} ${field}${operator}`);
    },

    async setComputedField () {
      const formulaBill = this.formDialog.ruleForm.formulaBill;
      try {
        const [result, computedField] = await Promise.all([api.getCalculationfactorResult(formulaBill), api.getComputedField(formulaBill)])
        this.resultSelectOption = result.data
        this.computedField = computedField.data;
      } catch (error) {
        this.$message.error('获取取值单据的字段失败，请重试！')
        console.log(error)
      }
    }

  },
  watch: {
    'formDialog.ruleForm.formulaBill' (val) {
      if (!val) return;
      this.setComputedField(val)
    },
    'formDialog.ruleForm.resultFactor' (val) {

      if (!val) return;

      const [{ factorName = '' }] = this.resultSelectOption.length ? this.resultSelectOption.filter(item => item.factorField === val) : [{}];

      const data = this.formDialog.ruleForm;
      const i = (data.formulaDes || '').indexOf('=');
      let name = `${factorName} = ${i === -1 ? '' : data.formulaDes.slice(i + 1)}`

      this.$set(this.formDialog.ruleForm, 'formulaDes', name)
    }
  },
  computed: {
    queryBarFormConfig () {
      return [
        { label: "单据编码", moduleBind: "controlledGoodsCode", isInput: true },
      ]
    },
    btnObj: () => [
      { label: "查询", type: "search" },
      { label: "新增", type: "add" },
      { label: "修改", type: "update" },
      { label: "删除", type: "delete" }
    ],
    queryBarRequest () {
      return {
        delete: _ => api.deleteCustomizedFormulaData(this.tableClickRow.formulaCode),
        add: _ => api.getControlledCode(),
        change: method => api.changeControlledData(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      return {
        // tradeName: (data={}) => api.getMaterielBaseList(data),
        // delegeteName: (data={}) => api.queryclientSearch(data)
      }
    },
    tableDialogConfig: () => ({
      // delegeteName: _ => require('@/domain/tableconfig/business/Client.js').default,
      // tradeName: _ => require('@/domain/tableconfig/basicdata/MaterielBase.js').default
    })
  },
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent,
    PopoverComponent,
    dialogComponent
  }
};
</script>

<style lang="less">
.calculating-item-formula {
  .result-select {
    display: flex;
    align-items: center;
    .el-form-item__label {
      width: 0 !important;
    }
    .el-form-item__content {
      flex: 9;
      margin-left: 0 !important;
    }
  }
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
  .layout {
    width: 91%;
    display: flex;
    > div {
      > div:first-child {
        flex-basis: 100%;
      }
      > div:last-child {
        display: flex;
        justify-content: space-around;
        > div {
          flex-basis: 48%;
        }
      }
    }
  }
}
</style>
