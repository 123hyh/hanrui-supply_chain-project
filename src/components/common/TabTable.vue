<template>
  <div class="tableComponent">
    <div v-show="isShowTabTable">
      <div
        class="btn-margin"
        v-show="tableTop['btn'].length"
      >
        <!-- 按钮 -->
        <div>
          <el-button
            @click="handlerTableBtnClick(item['type'], tableTop['showDialog'])"
            v-for="item in tableTop['btn']"
            :key="item['type']"
          >{{item['name']}}</el-button>
        </div>
        <!-- 表单 -->
        <form-component
          :formModel="ruleForm"
          :inputKey="tableTop['form']"
          @handlerFormConfigClickSearch="$emit('handlerFormConfigClickSearch')"
        ></form-component>
      </div>
      <el-table
        ref="singleTable"
        stripe
        :data="tableData"
        :row-class-name="tableRowClassName"
        :fit="true"
        border
        style="width: 100%"
        @row-click="handlerClickRow"
        @row-dblclick='handleDbclickTable'
        :highlight-current-row="true"
      >
        <template v-for="(item,index) in tableDataKey">
          <el-table-column
            v-if="item.template !== true"
            :show-overflow-tooltip='true'
            :key="index"
            :prop="item.key || item.prop"
            :label="item.name || item.label"
            :align="item.align ? item.align : 'center'"
            :width="!index ? 200 : item.width">
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            :prop="item.key || item.prop"
            :label="item.name || item.label"
            :align="item.align ? item.align : 'center'"
            :width="!index ? 200 : item.width">
            <template slot-scope="scope">
              <slot :default='scope.row'></slot>
            </template>
          </el-table-column>
        </template>
        <!-- <el-table-column
          v-for="(item,index) in tableDataKey"
          :show-overflow-tooltip="true"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="!index ? 200 : item.width"
          :align="item.align ? item.align : 'center'"
        >
        </el-table-column> -->
      </el-table>
      <!-- 双击显示详情弹窗 -->
      <el-dialog
        v-dialogDrag
        class="TableComponent-2019-7-18"
        v-if='isSubTable'
        title="详情"
        :visible.sync="dialogVisible"
        width="700px"
        :before-close="handleCloseDialog"
      >
        <div class="layout">
          <p
            v-for="item of tableDataKey"
            :key='item.prop'
          >
            <span>{{item.label}}：</span>
            <span>{{dbclickData[item.prop]}}</span>
          </p>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import FormConfig from "@/components/common/FormConfig.vue";
import utools from "@/domain/common/utools.js";
import api from "@/assets/js/appHelper";
var btn = [
  { name: "新增", type: "add" },
  { name: "修改", type: "update" },
  { name: "删除", type: "delete" }
];
export default {
  data () {
    return {
      newbtn: [],
      clickRow: [], //  当前点击表格的一行
      tableTop: {},
      ruleForm: {},
      dialogVisible: false,
      dbclickData: {}
    };
  },
  filters: {
    booltoString: () => {
      let transtionConfig = {
        undefined: '否',
        null: '否',
        '': '否',
        'false': '否',
        'true': '是'
      }
      return function (text) {
        const isBool = typeof (text) === 'boolean';
        if (isBool) return
        return Object.prototype.toString.call(bool).slice(8, -1) === 'Boolean';
      }
    }
  },
  props: {
    isSubTable: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: []
    },
    tableDataKey: {
      type: Array,
      default: []
    },
    isShowTabTable: {
      type: Boolean,
      default: true
    },
    activeRow: {
      type: Object,
      default: () => ({})
    },
    // 表格所对应页签 为后面赋值 表格输入框或按钮
    /**
     * @params itemCode 表格按钮 异步参数 编码
     */
    tabName: {
      type: String,
      default: ""
    },
    itemCode: {
      type: Object,
      default: () => ({})
    },
    isAddzb: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    tabName: {
      handler (newVal) {
        this.ruleForm = {};
        this.tableTop = (this.initTableTop[this.$route.name] || {})[
          this.tabName
        ] || { btn: [], form: [] }; // 初始化 tab下的表单和按钮
        this.initformData(); // 初始化 页签对应的 表单 请求
      },
      deep: true,
      immediate: true
    },
    isAddzb: {
      handler (isAdd) {
        // 设置表格上的操作按钮
        if (this.$route.name === "HkreceiveRegisterForm") {
          this.initTableTop[this.$route.name]["basic"]["btn"] = isAdd
            ? [
              { name: "修改", type: "update" },
              { name: "删除", type: "delete" }
            ]
            : [
              { name: "新增", type: "add" },
              { name: "修改", type: "update" },
              { name: "删除", type: "delete" }
            ];
        }
      },
      immediate: true,
      deep: true
    },
    /* isAddzb (newVal, oldVal) {
      if (newVal) {
        this.newbtn = [
          { name: '新增', type: 'add' },
          { name: '修改', type: 'update' },
          { name: '删除', type: 'delete' }
        ]
      } else {
        this.newbtn = [
          { name: '修改', type: 'update' },
          { name: '删除', type: 'delete' }
        ]
      }
    }, */
    "initTableTop.HkreceiveRegisterForm.basic.btn" (newVal, oldVal) {
      console.log("s");
    }
  },
  mounted () { },
  methods: {
    handleCloseDialog () {
      this.dialogVisible = false,
        this.dbclickData = {}
    },
    tableRowClassName () { },
    handlerTabClick () {
      this.$emit("handlerAddCreditTab");
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row);
      this.$emit("setCurrent");
    },
    // 表格 按钮操作
    async handlerTableBtnClick (type, showDialog) {
      try {
        if (showDialog) {
          switch (type) {
            case "add":
              this.$emit("handlerTableBtnClick", "add");
              break;
            case "update":
              utools.judgeNullObj(this.clickRow)
                ? this.$emit("handlerTableBtnClick", type, this.clickRow)
                : utools.alertMessage.call(this, "", "请选择一条数据");
              // JSON.stringify(this.clickRow) !== '[]' ? this.$emit('handlerTableBtnClick', type, this.clickRow) : utools.alertMessage.bind(this)('','请选择一条数据');
              break;
            case "delete":
              utools.judgeNullObj(this.clickRow)
                ? this.$emit("handlerTableBtnClick", type, this.clickRow)
                : utools.alertMessage.call(this, "", "请选择一条数据");
              // this.$emit('handlerTableBtnClick', type, this.clickRow)
              break;
          }
          // 勿删除
          /* if( JSON.stringify(this.clickRow) == '[]' ){
            utools.alertMessage.bind(this)()
            return;
          }
          this.$emit('handlerTableBtnClick', type, this.clickRow); */
        } else {
          // 采购订单 物流信息操作
          const { data, status } = await this.btnClickAsync[this.$route.name][
            this.tabName
          ][type]();
          utools.alertMessage.bind(this)(status);
        }
      } catch (error) {
        console.log(error);
        utools.alertMessage.bind(this)();
      }
      this.clickRow = [];
    },
    handlerClickRow (row) {
      this.clickRow = row;
      Promise.all([this.$emit("TableClickRowData", this.clickRow), this.$emit('update:activeRow', this.clickRow)])
    },
    handleDbclickTable (row, column, event) {
      this.dbclickData = row,
        this.dialogVisible = true,
        this.$emit('handleDbclickTable', row)
    },
    async initformData () {
      let method = this.initTableTop[this.$route.name];
      method && (method = method[this.tabName]) && (method = method["init"]);
      try {
        if (typeof method == "function") {
          const { data } = await this.initTableTop[this.$route.name][
            this.tabName
          ]["init"]();
          this.ruleForm = data || {};
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    initTableTop: {
      get () {
        return {
          PurchaseOrderForm: {
            goods: {
              btn: [{ name: "修改", type: "update" }],
              form: [],
              showDialog: true
            },
            logistics: {
              btn: [{ name: "保存", type: "preserve" }],
              form: [
                {
                  type: "date",
                  key: "supplierDeliveryTime",
                  name: "计划交货时间"
                },
                {
                  type: "string",
                  key: "contactId",
                  name: "联系人"
                },
                {
                  type: "string",
                  key: "tel",
                  name: "联系电话"
                },
                {
                  type: "string",
                  key: "receiveBoxQuantity",
                  name: "计划收货箱数"
                },
                {
                  type: "string",
                  key: "cardBoardQuantity",
                  name: "计划卡板数"
                },
                {
                  type: "string",
                  key: "chequeAmount",
                  name: "支票金额"
                },
                {
                  type: "string",
                  key: "deliveryAddress",
                  name: "交货地点"
                }
              ],
              init: () =>
                api.getprocurementLogistics(this.itemCode.purchaseOrderNo)
            }
          },
          Customerform: {
            bank: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            contact: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            client: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            }
          },
          SeCustomerform: {
            bank: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            contact: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            client: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            }
          },
          SupplierBaseForm: {
            bank: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            contact: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            delivery: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            address: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            credit: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            }
          },
          SeSupplierBaseForm: {
            bank: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            contact: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            delivery: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            address: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            },
            credit: {
              btn: [
                { name: "新增", type: "add" },
                { name: "修改", type: "update" },
                { name: "删除", type: "delete" }
              ],
              form: [],
              showDialog: true
            }
          },
          Receiptform: {
            information: {
              btn,
              form: [],
              showDialog: true
            }
          },
          HkreceiveRegisterForm: {
            basic: {
              btn: this.newbtn,
              form: [],
              showDialog: true
            }
          },
          ImportCustomOrderForm: {
            basic: {
              btn: btn.slice(1),
              form: [],
              showDialog: true
            }
          },
          PrecustomsForm: {
            basic: {
              btn /* [{ name: '修改', type: 'update' }, { name: '删除', type: 'delete' }] */,
              form: [],
              showDialog: true
            }
          },
          ReceiptOrderForm: {
            basic: {
              btn,
              form: [],
              showDialog: true
            }
          },
          CustomsFormBaseForm: {
            basic: {
              btn,
              form: [],
              showDialog: true
            }
          },
          entrustpaybillForm: {
            basic: {
              btn,
              form: [],
            }
          }
        };
      },
      set () { }
    },
    // tab 表格按钮异步操作
    btnClickAsync () {
      return {
        PurchaseOrderForm: {
          logistics: {
            preserve: () =>
              api.updateLogisticsMessage({
                ...this.ruleForm,
                purchaseOrderNo: this.itemCode.purchaseOrderNo
              })
          }
        }
      };
    }
  },
  components: {
    FormComponent: FormConfig
  }
};
</script>
<style lang='less'>
.tableComponent {
  .btn-margin {
    margin: 15px 0;
  }
  .table-height {
    height: 45vmin;
  }
}
</style>
