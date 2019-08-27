<template>
  <div class="OnlineOrderEdit">
    <div class="set-border">
      <div
        v-for="(val,key,i) in topDataConfig"
        :key="i"
        class='form-layout'
      >
        <div
          class="form-layout layout-width"
          v-for="(v,k,index) in val"
          :key="index"
          style='font-size: 14px;'
        >
          <p>{{v}}: </p>
          <p>{{data[k]}}</p>
        </div>
      </div>
    </div>
    <FormModuleHead title='商品信息' />
    <!-- <p class="cut-off-rule"><span>商品信息</span></p> -->
    <table-component
      :tableData='clienTable.tableData'
      :tableDataKey='clienTable.tableDataKey'
    ></table-component>
    <pagination-component
      :count='clienTable.count'
      @handlePageChange='getClientGoodsList'
    ></pagination-component>
    <div>
      <el-button
        type="primary"
        v-for="({type, label}, index) in btnList"
        :key="index"
        @click.stop="handleOrderBtnClick(type)"
      >{{label}}
      </el-button>
    </div>
    <FormModuleHead :title='billsTypeText' />
    <!-- <p class='cut-off-rule'><span>{{billsTypeText}}</span></p> -->
    <div>
      <form-component
        class="set-form-border"
        :formModel='form.data'
        :inputKey='form.config'
        @handlerFormConfigClickSearch='handleformSearch'
      ></form-component>
      <!-- 可编辑 -->
      <div class="edit-table">
        <el-table
          :data="myTable.tableData"
          border
          stripe
          style="width:100%; overflow: auto"
          data-index='myTable'
        >
          <template v-for="(item, index) in myTable.tableDataKey">
            <template v-if="item.isSlot">
              <el-table-column
                :label="item.label"
                :key="index"
                width="200"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleTableSearch(scope.$index, scope.row)"
                  >选择
                  </el-button>
                  <span>
                    {{ scope.row.arrivalGoodsCode }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :show-overflow-tooltip='true'
              >
              </el-table-column>
            </template>
          </template>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination-component
        :count='myTable.count'
        @handlePageChange='getBottomGoodsList'
      ></pagination-component>
    </div>
    <!-- 弹窗 -->
    <dialog-component
      :formConfig='[]'
      :ruleForm='{}'
      :isShowPopover='dialog.visibel'
      :popoverList='dialog.list'
      :popoverListKey='dialog.config'
      :count='dialog.count'
      @changeisShowPopover='changeisShowPopover'
      @handlePageChange='dialogPageChange'
      @handlerSubPreservation='handlerDialogPreservation'
    ></dialog-component>
    <!-- 订单退回时弹窗输入备注 -->

    <el-dialog
      title="备注"
      center
      :visible.sync="dialogVisible"
      width="15%"
      :before-close="() => {this.dialogVisible = false}"
    >
      <el-input
        type="textarea"
        v-model="form.data.evaluation"
        :rows='5'
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="() => {this.dialogVisible = false}">取 消</el-button>
        <el-button
          type="primary"
          @click.stop="handleTheOrderReturn"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import TableComponent from '@/components/common/TabTable.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import FormComponent from '@/components/common/FormConfig.vue'
import DialogComponent from '@/components/common/Popover.vue'
import FormModuleHead from '@/components/common/FormModuleHead.vue'
import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js'
// 配置
import tableConfig from '@/domain/tableconfig/basicdata/MaterielBase.js';

// 弹窗配置
let obj = {
  // 供应商
  supplierName: {
    tableConfig: require('@/domain/tableconfig/basicdata/SupplierBase.js').default,
    api: api.querysupplierbaseSearch.bind(api)
  },
  // 客户
  customerName: {
    tableConfig: require('@/domain/tableconfig/basicdata/Customer.js').default,
    api: api.getCustomerList.bind(api)
  },
  // 接单人
  salesmanName: {
    tableConfig: require('@/domain/tableconfig/basicdata/EmployeeInfo.js').default,
    api: api.queryemployeeinfoSearch.bind(api)
  },
  // 跟单人
  followPersonName: {
    tableConfig: require('@/domain/tableconfig/basicdata/EmployeeInfo.js').default,
    api: api.queryemployeeinfoSearch.bind(api)
  }
}
export default {
  components: {
    TableComponent,
    PaginationComponent,
    FormComponent,
    DialogComponent,
    FormModuleHead
  },
  computed: {
    ...mapGetters(['getActivePathData']),
    billsTypeText () {
      let { bizTypeName, billTypeName } = this.data;
      return `${bizTypeName}${billTypeName}委托订单`
    }
  },
  watch: {
    // 监听订单的状态
    // state  0 => 未受理，2 => 已受理，3 => 已退回，4 => 已转委托单
    'form.data.state' (newVal, oldVal) {
      this.handleStateInit(/* state */newVal, oldVal);
    }
  },
  data () {
    return {
      dialogVisible: false,
      currentClickRow: {},
      searchTarget: '',
      clickSearchIndex: NaN,
      btnList: [
        {
          type: 'yes',
          label: '订单受理'
        },
        {
          type: 'turn',
          label: '转委托单'
        },
        {
          type: 'no',
          label: '订单退回'
        }
      ],
      topDataConfig: {
        one: {
          clientBillNo: '订单号',
          clientName: '委托方',
          updateTime: '网上订单下单时间',
          bizTypeName: '业务类型',
          billTypeName: '单据抬头'
        },
        two: {
          supplierName: '卖方',
          saleCurrencyName: '销售币别',
          deliveryMethodName: '交货方式',
          customerName: '买方',
          purchaseCurrencyName: '采购币别',
          receiveMethodName: '收货方式'
        }
      },
      data: {},
      entrustTheOrdersData: {},
      clienTable: {
        tableData: [],
        tableDataKey: [
          { label: '商品编码', prop: 'goodsCode' },
          { label: '商品名称', prop: 'goodsName' },
          { label: '规格型号', prop: 'model' },
          { label: '单位', prop: 'unit' },
          { label: '数量', prop: 'quantity' },
          { label: '单价', prop: 'price' },
          { label: '总价', prop: 'totalPrice' },
          { label: '件数', prop: 'pieces' },
          { label: '净重(KG)', prop: 'netWeight' },
          { label: '毛重(KG)', prop: 'grossWeight' },
          { label: '源产地', prop: 'sourceArea' },
          { label: '品牌', prop: 'brand' },
        ],
        count: 30
      },
      myTable: {
        tableData: [],
        tableDataKey: [
          { label: '委托方物料编码', prop: 'goodsCode' },
          { label: '委托方物料名称', prop: 'goodsName' },
          { label: '委托方规格型号', prop: 'model' },
          { label: '来货编码', prop: 'arrivalGoodsCode', isSlot: true },
          { label: '来货规格型号', prop: 'arrivalGoodsModel' },
          { label: '来货名称', prop: 'arrivalGoodsName' },
          { label: '单位', prop: 'unit' },
          { label: '数量', prop: 'quantity' },
          { label: '单价', prop: 'price' },
          { label: '总价', prop: 'totalPrice' },
          { label: '件数', prop: 'pieces' },
          { label: '净重(KG)', prop: 'netWeight' },
          { label: '毛重(KG)', prop: 'grossWeight' },
          { label: '源产地', prop: 'sourceArea' },
          { label: '品牌', prop: 'brand' },
        ],
        count: 0
      },
      form: {
        config: [
          {
            key: "supplierName",
            name: "供应商",
            readonly: true,
            type: "string",
            btn: true
          },
          {
            key: "saleCurrency",
            name: "销售币别",
            readonly: true,
            selectKey: 'currencyName',
            type: "select",
            selectOption: [],
          },
          {
            key: "customerName",
            name: "客户",
            readonly: true,
            type: "string",
            btn: true
          },
          {
            key: "purchaseCurrency",
            name: "采购币别",
            readonly: true,
            selectKey: 'currencyName',
            type: "select",
            selectOption: [],
          },
          {
            key: "salesmanName",
            name: "接单人",
            readonly: true,
            type: "string",
            btn: true
          },
          {
            key: "followPersonName",
            name: "跟单人",
            readonly: true,
            btn: true,
            type: "string",
          },
        ],
        data: {
          state: -1,
          saleCurrency: '',
          purchaseCurrency: ''
        }
      },
      dialog: {
        visibel: false,
        config: tableConfig,
        list: [],
        count: 0,
        isTableAlertSave: false
      }
    }
  },
  created () {
    const { data = {}, formData } = this.getActivePathData(this.$route.path);
    this.data = data;
    formData ? this.form.data = formData : this.form.data.state = data.state;
    this.getData()
  },
  methods: {
    ...mapMutations([
      'addbreadCrumbsList'
    ]),
    // 处理单据状态的逻辑
    async handleStateInit (state, oldState) {
      // state  0 => 未受理，2 => 已受理，3 => 已退回，4 => 已转委托单
      const WHITE_LIST = [2, 4];
      try {
        if (WHITE_LIST.includes(state)) {

          if (state === 4) {
            this.btnList = [];
            oldState === -1 ? this.myTable.tableDataKey.map(item => {
              if (item.isSlot) item.isSlot = false;
              return item;
            }) : utools.F5CurrentRoute();
          } else {
            let i = ~(this.btnList.findIndex(item => item.type === 'yes'));
            let isExist = !~(this.btnList.findIndex((item => item.type === 'save')));
            i && this.btnList.splice((~i), 1);
            this.btnList.splice(this.btnList.findIndex(item => item.type === 'no'), 1)
            isExist &&
              this.btnList.push({
                type: 'save',
                label: '保存表单'
              });
          }
          // 如果是从别的页面跳进来的 isInit为true 调用一下两个方法 否则就是 点击订单处理 时 form.data.state发生变化触发了该方法
          // 在 2 和 4 的时候调用并且 oldState = -1 时（代表页面是刚进入，而不是点击按钮修改了状态的变化时（触发）
          if (oldState === -1) {
            const [{ data }] = await Promise.all([this.getAcceptData(), this.getBottomGoodsList(), api.initSelect(this.form.config)]);
            this.form.data = { ...this.form.data, ...data }
          }
        } else if (state === 3) {
          this.btnList = [];
        };
      } catch (error) {
        console.log(error)
      }

    },
    setDom () {
      /* var dom = document.querySelector("div[data-index]");
      let oldDom = '';
      let newDom = '';
      let doms = [...dom.children];
      let index = 0;
      for (let i = 0; i < doms.length; i++) {
        if ((doms[i]).className === 'el-table__body-wrapper is-scrolling-none') {
          index = i;
          oldDom = doms[i];
          newDom = (doms[i]).cloneNode(true);
        }
      }
      if (newDom) {
        let list = newDom.firstChild.lastChild.children;
        list.length && [...list].forEach(item => {
          let elem = item.children[3].firstChild;
          item.children[3].firstChild.removeChild(elem.firstChild);
        });
        dom.replaceChild(newDom, oldDom);
      } */
    },
    // 点击 form弹窗按钮
    async handleformSearch (target) {
      this.searchTarget = target;
      this.dialog.isTableAlertSave = false;
      let { tableConfig, api } = obj[target];
      this.dialog = { ...this.dialog, config: tableConfig, visibel: true };
      try {

        const { data: { list, count } } = await api();
        this.dialog = { ...this.dialog, list, count, visibel: true };
      } catch (error) {
        utools.alertMessage.call(this, 0, '获取数据失败')
        console.log(error)
      }
    },
    // 获取客户的商品信息
    async getData (page = {}) {
      try {
        const { data: { list, count } } = await this.getClientGoodsList(page);
        this.clienTable.tableData = list || [];
        this.clienTable.count = count || 0;
      } catch (error) {
        console.log(error)
      }
    },
    getClientGoodsList (page = {}) {
      if (!this.data.clientBillNo) return;
      return new Promise((resolve, reject) => {
        return resolve(api.getQuickGoodsList({ ...page, clientBillNo: this.data.clientBillNo }))
      })
    },
    handleOrderBtnClick (target) {
      switch (target) {
        case 'yes':
          this.handleToAcceptThe()
          break;
        case 'turn':
          this.handleTurnOrder()
          break;
        case 'no':
          this.dialogVisible = true;
          break;
        case 'save':
          this.saveForm()
          break;
      }
    },
    // 订单受理
    async handleToAcceptThe () {
      if (this.data.clienTable) return;
      let code = 0;
      try {
        {
          const { data, status } = await api.changeQuickEntrustData({ ...this.data, state: 2 });
          if (status !== 200) {
            return;
          } else {
            utools.alertMessage.call(this, status, '受理成功')
            this.data.state = 2,
              this.form.data.state = 2;
          }
        }
        ;
        {
          const [{ data = {}, status }] = await Promise.all([
            this.getAcceptData().catch(err => err),
            this.getBottomGoodsList(),
            api.initSelect(this.form.config)
          ]);
          code = status;
          for (const key in data) {
            if (data.hasOwnProperty(key) && (key !== 'state')) {
              this.form.data[key] = data[key];
            }
          }
          /* this.form.data = {
            ...this.form.data,
            purchaseCurrency: data.purchaseCurrency,
            saleCurrency: data.saleCurrency,
            state: data.state
          }; */
        }
        ;
        /* const { data: acceptData, status: sCode } =  ;
         code = sCode;
         this.form.data = acceptData || {};
         if (sCode !== 200) { return }; */
        // 获取列表

      } catch (error) {
        console.log(error)
      } finally {
        utools.alertMessage.call(this, code)
      }
    },
    // 初始化表单数据
    initFormData (data = {}) {

    },
    // 查询已受理订单
    async getAcceptData () {
      return new Promise(async (resolve, reject) => {
        return await resolve(api.getAcceptData(this.data.clientBillNo))
      })
    },
    // 已受理订单修改 商品 操作
    async getBottomGoodsList (page = {}) {
      try {
        const { data: { list, count } } = await this.getClientGoodsList({
          ...page,
          clientBillNo: this.form.data.billNo
        });
        /* for (let item of list) {
          item.arrivalGoodsCode = '',
          item.arrivalGoodsName = '';
          item.arrivalGoodsModel = ''
        } */
        this.myTable.tableData = list || [];
        this.myTable.count = count || 0;
      } catch (error) {
        console.log(error)
      }
    },
    // 表单保存
    async saveForm () {
      return new Promise(async (resolve, reject) => {
        let statusCode = 0;
        try {
          const { data, status } = await api.updateQuickGoodsForm(this.form.data);
          statusCode = status;
          resolve(status);
        } catch (error) {
          console.log(error)
        } finally {
          utools.alertMessage.call(this, statusCode);
        }
      })
    },
    // 转委托单
    async handleTurnOrder () {
      let updateStatus = 0;
      try {
        const statusCode = await this.saveForm();
        if (statusCode !== 200) return;
        const { data: { list = [] } } = await api.getQuickGoodsList({ pageIndex: 1, pageSize: Infinity, clientBillNo: this.data.clientBillNo });
        let requestParam = {
          ...this.form.data,
          entrustGoods: list.map(item => {
            let { goodsCode, goodsName, brand, sourceArea, unit, quantity, price, totalPrice, } = item;
            return {
              ...item,
              materialCode: goodsCode,
              materialName: goodsName,
              brandName: brand,
              sourceAreaName: sourceArea,
              sellerUnit: unit,
              sellerQuantity: quantity,
              sellerPrice: price,
              sellerGoodsValue: totalPrice,
            }
          })
        };
        // 重命名 form 数据
        {
          let { billNo, saleCurrency, purchaseCurrency, client, bizType, clientName } = this.form.data;
          requestParam = {
            ...requestParam,
            entrustOrderNo: billNo,
            supplierCurrency: saleCurrency,
            currency: purchaseCurrency,
            clientCode: client,
            entrustOrderType: bizType,
            clientName
          }
        }
        // 转委托单请求
        const { status } = await api.addentrustorderData(requestParam);
        this.data.state = 4, this.form.data.state = 4;
        updateStatus = status;
      } catch (error) {
        console.log(error)
      } finally {
        utools.alertMessage.call(this, updateStatus)
      }
    },
    // 订单退回
    async handleTheOrderReturn () {
      let statusCode = 0;
      let { evaluation } = this.form.data
      try {
        const { status } = await api.changeQuickEntrustData({ ...this.data, state: 3, evaluation });
        statusCode = status;
        this.data.state = 3, this.form.data.state = 3;
        this.dialogVisible = false;
      } catch (error) {
        console.log(error)
      } finally {
        utools.alertMessage.call(this, statusCode)
      }
    },
    // 表格点击search按钮
    async handleTableSearch (index, row) {
      this.currentClickRow = row;
      this.dialog.visibel = true;
      this.dialog.config = tableConfig;
      this.dialog.isTableAlertSave = true;
      this.clickSearchIndex = index;
      this.dialogPageChange()
    },
    // 控制弹窗显示
    changeisShowPopover () {
      this.dialog.visibel = false;
    },
    // 弹窗表格数据请求
    async dialogPageChange (page = {}) {
      try {
        const { data: { list, count } } = await api.getMaterielBaseList(page);
        this.dialog.list = list || [];
        this.dialog.count = count || 0;
      } catch (error) {
        console.log(error)
      }
    },
    // 弹窗保存 修改当条 表格数据
    handlerDialogPreservation (data = {}) {
      // 先判断是否为表格下 的按钮点击的弹窗
      (this.dialog.isTableAlertSave ? this.tableAlertSave : this.formAlertSave)(data);
    },
    // 表格点击选择弹窗的保存
    async tableAlertSave ({
      materielCode: arrivalGoodsCode,
      tradeName: arrivalGoodsName,
      specificationType: arrivalGoodsModel
    } = {}) {
      let statusCode = 0;
      try {
        const { data, status } = await api.updateQuickGoodsData({
          ...this.currentClickRow,
          arrivalGoodsCode,
          arrivalGoodsName,
          arrivalGoodsModel
        });
        statusCode = status;
        let target = this.myTable.tableData[this.clickSearchIndex];
        target['arrivalGoodsCode'] = arrivalGoodsCode,
          target['arrivalGoodsName'] = arrivalGoodsName,
          target['arrivalGoodsModel'] = arrivalGoodsModel;
      } catch (error) {
        console.log(error)
      } finally {
        utools.alertMessage.call(this, statusCode);
      }
    },
    // 表单的弹窗保存
    formAlertSave ({ supplierCode, supplierName, customerNo, customerName, employeeInfoCode, employeeInfoName } = {}) {
      let obj = {
        // 供应商
        supplierName: {
          supplierCode,
          supplierName
        },
        // 客户
        customerName: {
          customerCode: customerNo,
          customerName: customerName
        },
        // 接单人
        salesmanName: {
          salesmanName: employeeInfoName,
          salesmanId: employeeInfoCode
        },
        // 跟单人
        followPersonName: {
          followPersonName: employeeInfoName,
          followPersonId: employeeInfoCode
        },
      };
      this.form.data = { ...this.form.data, ...obj[this.searchTarget] };
    }
    /* // 审核表格分页
    auditTablePageChange ({ pageIndex = 1, pageSize = 10 }) {
      let start = (pageIndex - 1) * pageSize;
      let end = (pageIndex - 1) * pageSize + pageSize
      this.myTable.temporary = this.myTable.tableData.slice(start, end);
    } */
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.form.data, data: this.data },
      path: this.$route.path,
    });
    next();
  }
}
</script>
<style lang="less">
.OnlineOrderEdit {
  color: rgb(102, 102, 102);
  // font-weight: 100;
  .set-border {
    box-sizing: border-box;

    > div {
      padding: 20px;
    }

    & > div:first-child {
      border-bottom: 1px solid #c7c7c7;
    }

    > .form-layout {
      & > .layout-width {
        flex-basis: 33%;
        height: 30px;
        align-items: flex-end;

        & > :first-child {
          // flex-basis: 50%;
          width: 150px;
        }
      }
    }
  }
  .set-form-border {
    margin-bottom: 20px;
  }
  .edit-table {
    > .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cell {
      height: 30px !important;
    }

    .el-table th > .cell {
      position: relative;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
      vertical-align: middle;
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
}
</style>
