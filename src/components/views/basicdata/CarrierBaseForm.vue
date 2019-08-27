<template>
  <div class="Box CarrierBaseForm">
    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data.base'
      :isLoading="isLoading"
      @handleRollback="handleRollback"
      @handlePreserve="handlePreserve"
      @hanldeBlacklist='hanldeBlacklist'
    ></preserve-btn>

    <!-- 子列表 -->
    <el-tabs
      v-model="tabActiveName"
      type="card"
      class="handleTableHeight"
      @tab-click="handleTabsClick"
    >
      <el-tab-pane
        v-for="(item,i) in tabObj"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :disabled=" i > 0 &&  status==='add'"
      ></el-tab-pane>
      <!-- 主form -->
      <form-component
        :formModel="form.data[tabActiveName]"
        :formConfig="form.formConfig[tabActiveName]"
        @handlerFormVerify="handlerFormVerify"
        @handlerSearchClick="rousePopover"
      ></form-component>
      <!-- 子页签 -->
      <el-tabs
        v-show="tabActiveName === 'finance'"
        type="card"
      >
        <el-tab-pane
          label="银行信息"
          name=""
        ></el-tab-pane>
      </el-tabs>

      <!-- 表格按钮 -->
      <div v-show="isShowTable">
        <div
          class="mb-10"
          v-show="(+(form.data.base.status) || 0) <= 1"
        >
          <el-button
            v-for="item in table.btnList"
            :key="item.key"
            v-show="item.isShow"
            :type="item.type"
            @click="handleTabBtnClick(item.key)"
          >{{item.name}}</el-button>
        </div>

        <table-component
          :isSubTable='true'
          :dialog='false'
          :popoverList='table.tableData'
          :popoverListKey='table.tableConfig'
          :count='table.pageCount'
          :activeRow.sync='table.clickRow'
          @handlePageChange='handleTabPageChange'
        ></table-component>

      </div>
    </el-tabs>

    <!-- form 弹窗 -->
    <popover-component
      :isShowPopover.sync="formDialog.isShowPopover"
      :popoverType="'form'"
      :formData="formDialog"
      :itemName="formDialog.itemName"
      @handlerFormVerify="handlerPopFormVerify"
      @formClickPreservation="handlePopFormSubmit"
      @handlerFormConfigClickSearch="rousePopover"
    ></popover-component>

    <!-- table 弹出框 -->
    <popover-component
      :isShowPopover.sync="tableDialog.isShowPopover"
      :itemName="tableDialog.itemName"
      :popoverType="tableDialog.popoverType"
      :ruleForm="tableDialog.ruleForm"
      :formConfig="tableDialog.queryBarConfig"
      :btnObj="tableDialog.btnObj"
      :popoverListKey="tableDialog.tableConfig"
      :popoverList="tableDialog.data"
      :count="tableDialog.count"
      @handleBtnClickType="handleTableDialogClick"
      @changeisShowPopover="rousePopover"
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="handlePageChange"
    ></popover-component>
  </div>
</template>
<script>
// 组件
import FormComponent from "@/components/common/form-template/FormComponent.vue";
import PopoverComponent from "@/components/common/Popover.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


import carrierBase from "@/domain/formconfig/basicdata/CarrierBase";
import carrierFinance from '@/domain/formconfig/basicdata/CarrierFinance.js'
import carrierPurchase from '@/domain/formconfig/basicdata/CarrierPurchase.js'
import carrierCredit from '@/domain/formconfig/basicdata/CarrierCredit.js'

// form弹窗配置
import carrierDriver from '@/domain/formconfig/basicdata/CarrierDriver.js'
import carrierDelivery from '@/domain/formconfig/basicdata/CarrierDelivery.js'
import carrierCar from '@/domain/formconfig/basicdata/CarrierCar.js'
import CarrierBank from '@/domain/formconfig/basicdata/CarrierBank.js'

// 表格配置 
import carrierDriverTable from '@/domain/tableconfig/basicdata/CarrierDriver.js'
import carrierDeliveryTable from '@/domain/tableconfig/basicdata/CarrierDelivery.js'
import carrierCarTable from '@/domain/tableconfig/basicdata/CarrierCar.js'
import carrierBankTable from '@/domain/tableconfig/basicdata/CarrierBank.js'




import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js'

// 引入vuex
import { mapGetters, mapMutations } from "vuex";

let ColumnData = "";
export default {
  components: {
    FormComponent,
    PopoverComponent,
    PaginationComponent,
    TableComponent
  },
  data: () => ({
    status: "", //主表的状态
    tabActiveName: "base",
    isLoading: false,
    // 主form
    form: {
      validate: eval, //表单验证回调
      data: {
        base: {},
        finance: {},
        purchase: {},
        delivery: {},
        credit: {},
        car: {},
        driver: {}
      },
      formConfig: {
        base: carrierBase,
        finance: carrierFinance,
        purchase: carrierPurchase,
        delivery: [],
        credit: carrierCredit,
        car: [],
        driver: []
      },
      validate: eval,
      resetFields: eval

    },
    // 列表弹窗
    tableDialog: {
      isShowPopover: false, // 弹窗显示
      itemName: "", // 弹窗标题
      popoverType: "table", // 弹出框
      queryBarConfig: [], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      ruleForm: {}, // 查询栏的model绑定
      tableConfig: [], // 弹出框表头绑定的 key
      data: [], // 表格数据
      count: 0, // 分页数据总条数
      target: ''
    },
    // form 弹窗
    formDialog: {
      isShowPopover: false,
      itemName: "", // 表单标题
      validate: eval, //表单验证回调
      paper: {},
      btnType: "",
      ruleForm: {},
      formConfig: [],
      target: ''
    },
    // 子列表
    table: {
      itemCode: "",
      itemTabObj: {},
      tableData: [],
      tableConfig: [],
      pageCount: 0,
      clickRow: {},
      btnList: [
        { type: "", key: "add", name: "新增", isShow: true },
        { type: "", key: "update", name: "修改", isShow: true },
        { type: "", key: "delete", name: "删除", isShow: true }
      ]
    }
  }),
  computed: {
    ...mapGetters(["getActivePathData"]),
    isShowTable () {
      return !(['base', 'credit', 'purchase', 'purchase'].includes(this.tabActiveName))
    },

    tabObj: () => [
      { name: 'base', label: '基础信息', required: true },
      { name: "finance", label: "财务信息", codeName: "financeCode", required: true },
      { name: "purchase", label: "采购信息", codeName: "purchaseCode" },
      { name: "credit", label: "信用评估", codeName: "creditCode" },
      { name: "delivery", label: "货仓提货地址", codeName: "deliveryCompanyCode" },
      { name: "car", label: "车辆信息", codeName: "carCode" },
      { name: "driver", label: "司机信息", codeName: "driverCode" }
    ],
    DialogRequest: () => ({
      financeName: {
        title: "公司",
        searchCode: "companyCode",
        api: (data = {}) => api.querycompanyinfoSearch(data),
        config: _ =>
          require("@/domain/tableconfig/basicdata/CompanyInfo.js").default
      },
      purchaseCompanyName: {
        title: "承运商",
        searchCode: "carrierCode",
        api: (data = {}) => api.querycarrierbaseSearch(data),
        config: _ =>
          require("@/domain/tableconfig/basicdata/CarrierBase.js").default
      },
      deliveryCompanyName: {
        title: "承运商",
        searchCode: "carrierCode",
        api: (data = {}) => api.querycarrierbaseSearch(data),
        config: _ =>
          require("@/domain/tableconfig/basicdata/CarrierBase.js").default
      },
      orderNos: {
        title: "委托订单",
        searchCode: "entrustOrderNo",
        api: (data = {}) => api.queryentrustorderSearch(data),
        config: _ =>
          require("@/domain/tableconfig/commerce/EntrustOrder.js").default
      },
      goodsName: {
        title: "委托订单-商品明细",
        searchCode: "goodsCode",
        api: (data = {}) => api.getEntrustGoods(data),
        config: _ =>
          require("@/domain/tableconfig/commerce/EntrustGoods.js").default
      }
    }),
    requestAddress () {
      return {
        province: _ => api.getProvince(),
        city: code => api.getCity(code),
        district: code => api.getDistrict(code)
      };
    },
    clickTypeAsync () {
      return {
        search: async page => {
          try {
            let flag = ["car", "driver"].includes(this.tabActiveName);
            let searchApi = this.table.itemTabObj.tabApi[flag ? 'searchApi' : 'searchOneApi'];
            let params = flag
              ? { ...page, carrierCode: this.form.data.base.carrierCode }
              : this.form.data.base.carrierCode;
            let { data, status } = await api[searchApi](params);
            this.table.btnList[0]["isShow"] = flag ? true : !data;

            let resList = flag ? data.list : data ? [data] : [];

            let resCount = flag ? data.count : resList.length;
            resList &&
              (this.utools.turnCodeBoolean(resList),
                (this.table.tableData = resList),
                (this.table.pageCount = resCount));
          } catch (e) {
            console.log(e);
            this.utools.alertMessage.call(this, 0, e.message);
          }
        },
        add: () => (
          this.formDialog = {
            ...this.formDialog, isShowPopover: true, ruleForm: { carrierCode: this.form.data.base.carrierCode }
          },
          this.loadTabCodeNo()
        ),
        update: () => {
          this.utools.titleCallBack.call(this, this.table.clickRow,
            async () => {
              try {
                var { data, status } = await api[
                  this.table.itemTabObj.tabApi["searchOneApi"]
                ](this.table.itemCode);
                this.formDialog.ruleForm = this.table.clickRow = data,
                  this.formDialog.isShowPopover = true;
              } catch (e) {
                console.log(e);
                this.utools.alertMessage.call(this, 0, e.message);
              }
            })
        },
        delete: () => {
          this.utools.titleCallBack.call(this, this.table.clickRow, async () => {
            try {
              var {
                status,
                data: { list, count }
              } = await api[this.table.itemTabObj.tabApi["deleteApi"]](
                this.table.itemCode
              );
              this.utools.alertMessage.bind(this)(status, null, "删除"),
                this.clickTypeAsync["search"]();
            } catch (e) {
              console.log(e);
              this.utools.alertMessage.bind(this)(0, e.message);
            }
          });
        }
      };
    },
  },

  watch: {
    "form.data.base.province": {
      handler (cur, pre) {
        if (!cur || cur == pre) return;
        pre && (delete this.form.data.base.city, delete this.form.data.base.district);
        this.getAddress("city", cur);
      },
      deep: true
    },
    "form.data.base.city": {
      handler (cur, pre) {
        if (!cur || cur == pre) return;
        pre && delete this.form.data.base.district;
        this.getAddress("district", cur);
      },
      deep: true
    }
  },

  methods: {
    ...mapMutations(["addbreadCrumbsList"]),

    /*************************** 供应链供应商methods end ****************** */
    initData () {
      api.initSelect(this.form.formConfig);
      const { formData, status } = this.getActivePathData(this.$route.path);
      for (let key in formData) {
        if (formData.hasOwnProperty) this.form.data[key] = formData[key]
      }
      this.status = status;

      if (status === 'add') {
        this.loadCodeNo()
      } else {
        this.tabActiveName = "base",
          this.handlerTabClick({ name: this.tabActiveName })
      }

      this.getAddress("province");
    },
    handlerTabClick () { },

    // 保存
    handlePreserve: (() => {
      let port = {
        base: api.changeCarrierbaseData,
        finance: api.changeCarrierfinanceData,
        purchase: api.changeCarrierpurchaseData,
        credit: api.changeCarriercreditData
      };
      return function () {
        this.form.validate(async valid => {
          if (valid) {
            utools.saveReceiptsTips.call(
              this,
              async () => {
                await port[this.tabActiveName].call(
                  api,
                  {
                    data: { ...this.form.data[this.tabActiveName], carrierCode: this.form.data.base.carrierCode },
                    method: (() => {
                      if (this.tabActiveName !== 'base') return 'POST';
                      return this.status === 'add' ? 'POST' : 'PUT'
                    })()
                  }
                );
                this.status === 'add' && this.tabActiveName === 'base' && (this.status = 'update', this.$set(this.form.data.base, 'status', '1'));
              }
            )
          }
        })
      }
    })(),
    // 加载省市区
    async getAddress (type, code) {
      try {
        const { data } = await this.requestAddress[type](code);
        this.handleSelectOption(data, type);
      } catch (e) {
        console.log(e);
      }
    },
    handleSelectOption (data, type) {
      for (let item of this.form.formConfig[this.tabActiveName]) {
        if (item.key === type) {
          item.selectOption = data.map(item => ({
            itemKey: item.code,
            itemValue: item.name
          }));
          break;
        }
      }
    },

    // 表单验证方法
    handlerFormVerify ({ formModel } = {}) {
      this.form.validate = formModel ? formModel.validate : () => true;
      this.form.resetFields = formModel ? formModel.resetFields : () => true
    },

    // 点击放大镜
    rousePopover (params, obj, queryData) {
      this.tableDialog.target = params;
      params = ["purchaseName"].includes(params) ? "financeName" : params;
      this.tableDialog.popoverType =
        params == "orderNos" ? "selectTable" : "table"; // 委托单号是多选表格
      // 弹窗条件
      queryData =
        params == "goodsName"
          ? { ...queryData, entrustOrderNos: this.formDialog.ruleForm.orderNos }
          : queryData;
      // 弹窗条件
      params
        ? (async () => {
          try {
            const {
              data: { list, count }
            } = await this.DialogRequest[params]["api"](queryData);
            this.tableDialog = {
              ...this.tableDialog,
              data: list,
              count: count,
              itemName: this.DialogRequest[params]["title"],
              queryBarConfig: [
                {
                  label: "编码",
                  moduleBind: this.DialogRequest[params]["searchCode"],
                  isInput: true
                }
              ],
              tableConfig: this.DialogRequest[params]["config"](),
              isShowPopover: true
            };
          } catch (error) {
            this.utools.alertMessage.call(this, "", "获取数据失败, 请重试");
            console.log(error);
          }
        })()
        : (this.tableDialog.isShowPopover = false);
    },
    handleVerify () { },
    // 黑名单
    async hanldeBlacklist () {
      this.utools.blacklist.call(
        this,
        async () => {
          await api.addCarriercarBlacklist(this.form.data.base.carrierCode)
          this.$set(this.form.data.base, 'hasBlack', true)
        }
      )
    },
    handleRollback () {
      this.$router.push('/M0201')
    },

    // 表格按钮的操作
    handleTabBtnClick (target) {
      let method = {
        add: this.rouserFormDialog,
        update: this.handlerupdateFormDialog,
        delete: this.handlerTableRemove
      }[target];
      this.formDialog.target = target
      if (target === 'add') {
        this.formDialog.isShowPopover = true;
        this.formDialog.ruleForm = {};
      } else if (target === 'update') {
        utools.titleCallBack.call(
          this,
          this.table.clickRow,
          () => {
            this.formDialog.ruleForm = utools.cloneObj(this.table.clickRow)
          }
        )
      }
      method();
    },
    // 表格删除数据
    handlerTableRemove: (() => {
      let port = {
        finance: api.deleteCarrierBankData,
        delivery: api.deletecarrierdeliveryData,
        car: api.deletecarriercarData,
        driver: api.deletecarrierdriverData
      }
      return function () {
        utools.titleCallBack.call(
          this,
          this.table.clickRow,
          utools.deleteMessage.bind(
            this,
            utools.removeReceiptsTips.bind(
              this,
              async () => {
                await port[this.tabActiveName].call(api, this.table.clickRow.itemCode);
                this.handlerTablePageData()
              }
            )

          )
        )
      }
    })(),

    // 唤醒 form 弹窗
    rouserFormDialog () {
      let formConfig = {
        finance: CarrierBank,
        delivery: carrierDelivery,
        car: carrierCar,
        driver: carrierDriver
      }[this.tabActiveName];
      let dialogTitle = {
        finance: '银行信息',
        delivery: '货仓提货地址',
        car: '车辆信息',
        driver: '司机信息'
      }[this.tabActiveName];
      this.formDialog.formConfig = formConfig;
      this.formDialog.isShowPopover = true;
      this.formDialog.itemName = dialogTitle;
      api.initSelect(this.formDialog.formConfig)
    },
    handlerupdateFormDialog () {
      this.rouserFormDialog()
    },

    // 表格弹窗点击确定按钮事件
    handlerSubPreservation (data) {
      let obj = {
        purchaseCompanyName: { purchaseCompany: data.carrierCode, purchaseCompanyName: data.carrierName },
        deliveryCompanyName: { deliveryCompanyCode: data.carrierCode, deliveryCompanyName: data.carrierName },
        financeName: { [this.tableDialog.target]: data.companyName, [this.tableDialog.target.replace(/Name/g, "Code")]: data.companyCode },
        purchaseName: {
          [this.tableDialog.target]: data.companyName,
          [this.tableDialog.target.replace(/Name/g, "Code")]: data.companyCode
        },
        orderNos: () => ({ orderNos: data.map(item => item.entrustOrderNo) }),
        goodsName: {
          ...data,
          orderNos: [data.entrustOrderNo],
          goodsModel: data.arrivalGoodsModel,
        }
      }[this.tableDialog.target];
      this.tableDialog.target === 'orderNos' && (obj = obj());
      // 弹窗和非弹窗的取值
      if (this.tabActiveName == 'delivery') {
        this.formDialog.ruleForm = { ...this.formDialog.ruleForm, ...obj }
      } else {
        this.form.data[this.tabActiveName] = { ... this.form.data[this.tabActiveName], ...obj }
      }
    },
    handleTableDialogClick () { },
    handlePageChange () { },
    handleTabPageChange () { },
    handlerPopFormVerify () { },

    // form弹窗点击确定按钮事件
    handlePopFormSubmit: (() => {
      let cb = {
        finance: api.changeCarrierBankData,
        delivery: api.changeCarrierdeliveryData,
        car: api.changeCarriercarData,
        driver: api.changeCarrierdriverData
      };
      return function () {
        utools.saveReceiptsTips.call(
          this,
          async () => {
            await cb[this.tabActiveName].call(api, {
              data: {
                ...this.formDialog.ruleForm,
                [this.tabActiveName === 'finance' ? 'billNo' : 'carrierCode']: this.form.data.base.carrierCode
              },
              method: this.formDialog.target === 'add' ? 'POST' : 'PUT'
            });
            this.handlerTablePageData();
            this.formDialog.isShowPopover = false;
          }
        )
      }
    })(),

    // 页签点击操作 （请求表单数据和表格数据）
    handleTabsClick: (() => {
      let port = {
        finance: api.searchOnecarrierfinanceData,
        purchase: api.searchOnecarrierpurchaseData,
        credit: api.searchOnecarriercreditData,
      };
      return async function ({ name } = {}) {
        try {
          this.setTabsTable();
          const active = this.tabActiveName;
          this.handlerTablePageData();
          if (Object.keys(port).includes(name) && utools.isNull(this.form.data[active])) {
            const { data } = await port[active].call(api, this.form.data.base.carrierCode);
            for (let key in data) {
              if (data.hasOwnProperty(key)) this.$set(this.form.data[active], key, data[key])
            }
          }
        } catch (error) {
          this.$message.error('获取数据失败，请重试')
          console.log(error)
        }
      }
    })(),

    // 分页查询 表格数据 
    async handlerTablePageData (data = {}) {
      let port = {
        finance: api.getCarrierBankData,
        delivery: api.querycarrierdeliverySearch,
        car: api.querycarriercarSearch,
        driver: api.querycarrierdriverSearch
      };
      const active = this.tabActiveName;
      // 表格数据
      if (Object.keys(port).includes(this.tabActiveName)){
        const { data: { list = [], count = 0 } } = await port[active].call(api, {
          // 银行信息的code不同
          [active !== 'finance' ? 'carrierCode' : 'billNo']: this.form.data.base.carrierCode,
          ...data
        });
        this.table.tableData = list,
          this.table.pageCount = count
      }
    },

    // 设置页签对应的表格
    setTabsTable () {
      let tableConfig = {
        finance: carrierBankTable,
        delivery: carrierDeliveryTable,
        car: carrierCarTable,
        driver: carrierDriverTable
      }[this.tabActiveName] || [];
      this.table.tableConfig = tableConfig,
        this.table.tableData = [], this.table.pageCount = 0;
    },
    //加载编号
    async loadCodeNo () {
      try {
        let { data } = await api.getcarrierbaseCode();
        this.$set(this.form.data.base, 'carrierCode', data)
      } catch (e) {
        this.$message.error('获取编码失败，请重试！')
        console.log(e);
      }
    },
  },
  created () {
    this.initData();
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.form.data, status: this.status },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less">
.CarrierBaseForm {
  /*  .form-layout {
    > div {
      flex-basis: 20vw;
      height: 15px;
    }
  } */
  .Box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .handleTableHeight {
    height: 48vh;
  }
  .el-tabs__nav {
    & > :first-child::before {
      content: "*";
      color: red;
    }
  }
}
</style>
