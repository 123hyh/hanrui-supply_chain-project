<template>
  <div class="Box CarrierBaseForm">
    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data.base'
      :isLoading="isLoading"
      @handleRollback="handleRollback"
      @handlePreserve="handlePreserve"
      @handleVerify="handleVerify"
      @hanldeBlacklist='hanldeBlacklist'
    ></preserve-btn>

    <!-- 子列表 -->
    <el-tabs
      v-model="table.tabActiveName"
      type="card"
      class="handleTableHeight"
      @tab-click="handlerTabClick"
    >
      <el-tab-pane
        v-for="item in tabObj"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :disabled="table.isTabDisabled"
      ></el-tab-pane>
      <!-- 主form -->
      <form-component
        :formModel="form.data[table.tabActiveName]"
        :formConfig="form.formConfig[table.tabActiveName]"
        @handlerFormVerify="handlerFormVerify"
        @handlerSearchClick="rousePopover"
      ></form-component>
      <div v-if="!table.isTabDisabled">
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
          @rowClickData='clickTableRow'
          @handlePageChange='handleTabPageChange'
        ></table-component>

      </div>
    </el-tabs>
    <!-- form 弹窗 -->
    <popover-component
      :isShowPopover="formDialog.isShowPopover"
      :popoverType="'form'"
      :formData="formDialog"
      :itemName="formDialog.itemName"
      @handlerFormVerify="handlerPopFormVerify"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlePopFormSubmit"
      @handlerFormConfigClickSearch="rousePopover"
    ></popover-component>
    <!-- table 弹出框 -->
    <popover-component
      :isShowPopover="tableDialog.isShowPopover"
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
import api from "@/assets/js/appHelper.js";
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
      }
    },
    // 列表弹窗
    tableDialog: {
      isShowPopover: false, // 弹窗显示
      itemName: "", // 弹窗标题
      popoverType: "table", // 弹出框
      queryBarConfig: [], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      ruleForm: { tenantId: "hfy" }, // 查询栏的model绑定
      tableConfig: [], // 弹出框表头绑定的 key
      data: [], // 表格数据
      count: 0 // 分页数据总条数
    },
    // form 弹窗
    formDialog: {
      isShowPopover: false,
      itemName: "", // 表单标题
      validate: new Function(), //表单验证回调
      paper: {},
      btnType: "",
      ruleForm: {},
      formConfig: []
    },
    // 子列表
    table: {
      isTabDisabled: true,
      tabActiveName: "base",
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
    tabObj: () => [
      { name: 'base', label: '基础信息' },
      { name: "finance", label: "财务信息", codeName: "financeCode", required: true },
      { name: "purchase", label: "采购信息", codeName: "purchaseCode" },
      { name: "delivery", label: "货仓提货地址", codeName: "deliveryCompanyCode" },
      { name: "credit", label: "信用评估", codeName: "creditCode" },
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
            let flag = ["car", "driver"].includes(this.table.tabActiveName);
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
            this.utools.alertMessage.call(this, status, e.message);
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
                this.utools.alertMessage.call(this, status, e.message);
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
              this.utools.alertMessage.bind(this)(status, e.message);
            }
          });
        }
      };
    }
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

    async hanldeBlacklist () {
      this.utools.blacklist.call(
        this,
        async () => {
          await api.addCarriercarBlacklist(this.form.data.base.carrierCode)
          this.$set(this.form.data.base, 'hasBlack', true)
        }
      )
    },
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
      for (let item of this.form.formConfig[this.table.tabActiveName]) {
        if (item.key === type) {
          item.selectOption = data.map(item => ({
            itemKey: item.code,
            itemValue: item.name
          }));
          break;
        }
      }
    },
    /************************** 弹窗methods start *******************/
    handleTableDialogClick () {
      //点击列表弹窗查询栏按钮事件
      this.rousePopover(this.dialogTarget, null, this.tableDialog.ruleForm);
    },
    // 列表弹窗确认事件
    handlerSubPreservation (data) {
      let obj = {
        purchaseCompanyName: { purchaseCompany: data.carrierCode, purchaseCompanyName: data.carrierName },
        deliveryCompanyName: { deliveryCompany: data.carrierCode, deliveryCompanyName: data.carrierName },
        financeName: { [this.dialogTarget]: data.companyName, [this.dialogTarget.replace(/Name/g, "Code")]: data.companyCode },
        purchaseName: {
          [this.dialogTarget]: data.companyName,
          [this.dialogTarget.replace(/Name/g, "Code")]: data.companyCode
        },
        orderNos: () => ({ orderNos: data.map(item => item.entrustOrderNo) }),
        goodsName: {
          ...data,
          orderNos: [data.entrustOrderNo],
          goodsModel: data.arrivalGoodsModel,
        }
      }[this.dialogTarget];
      this.dialogTarget === 'orderNos' && (obj = obj())
      this.formDialog.ruleForm = { ...this.formDialog.ruleForm, ...obj }
    },
    // 点击放大镜
    rousePopover (params, obj, queryData) {
      this.dialogTarget = params;
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
    //table弹窗分页
    handlePageChange (paper) {
      this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm, ...paper };
      this.handleTableDialogClick(); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    handlerFormVerify ({ formModel } = {}) {
      try {
        this.form.validate = formModel ? formModel.validate : eval(true);
      } catch (error) {
        console.log(error)
      }
    },
    handlerPopFormVerify ({ formModel: { validate } }) {
      this.formDialog.validate = validate;
    },
    isVerify () {
      let isVerify = false;
      this.form.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    isPopFormVerify () {
      let isVerify = false;
      this.formDialog.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    handleRollback () {
      // 返回
      this.$router.push("M0201");
    },

    handleVerify () {
      // 审核
      console.log("handleVerify");
    },
    /*************** 供应链供应商methods start******************/
    //保存主表单
    async handlePreserve () {
      if (this.isVerify()) {
        this.isLoading = true;
        this.utools.saveReceiptsTips.call(
          this,
          {
            async successCallback () {

              let { data, status } = await api[
                this.status === "add"
                  ? "addcarrierbaseData"
                  : "editcarrierbaseData"
              ](this.form.data[this.table.tabActiveName]);

              this.status === "add" &&
                ((this.table.isTabDisabled = false),
                  (this.table.tabActiveName = "finance"),
                  this.handlerTabClick({ name: this.table.tabActiveName }));

              this.$set(this.form.data.base, 'status', data.status)
            },

            finallyCallback () {
              this.isLoading = false;
            }
          }
        )
      }
    },
    // 切换页签
    handlerTabClick ({ name } = tab, event) {
      this.table.itemTabObj = {
        ...this.tabObj.filter(item => item.name == name)[0],
        tabApi: {
          searchApi: `querycarrier${name}Search`,
          addApi: `addcarrier${name}Data`,
          editApi: `editcarrier${name}Data`,
          deleteApi: `deletecarrier${name}Data`,
          searchOneApi: `searchOnecarrier${name}Data`,
          getCodeApi: `getcarrier${name}Code`
        }
      };
      let upperCaseName = this.utools.capitalize(name);
      this.table.tableConfig = require("@/domain/tableconfig/basicdata/Carrier" +
        upperCaseName).default;
      this.formDialog.formConfig = require("@/domain/formconfig/basicdata/Carrier" +
        upperCaseName).default;
      api.initSelect(this.formDialog.formConfig);
      this.handleTabPageChange({ pageIndex: 1 });
      this.table.clickRow = {}; // 清空当前行数据
    },

    // 子列表分页
    handleTabPageChange (paper) {
      this.handleTabBtnClick("search", paper);
    },

    // 显示子表form 弹窗
    handleTabBtnClick (clickType, page) {
      this.formDialog.btntype = clickType;
      this.clickTypeAsync[clickType](page);
    },

    // 弹窗提交
    async handlePopFormSubmit () {
      if (this.isPopFormVerify()) {
        let sCode = 200;
        try {
          let apiType = this.table.itemTabObj.tabApi[this.formDialog.btntype === "add" ? 'addApi' : 'editApi'],
            { data, status } = await api[apiType](this.formDialog.ruleForm);

          this.clickTypeAsync["search"]();
          this.formDialog.isShowPopover = false
        } catch (e) {
          sCode = 0
          console.log(e);
        } finally {
          this.$message({
            type: sCode ? 'success' : 'error',
            message: `提交${sCode ? '成功！' : '失败，请重试！'}`
          })
        }
      }
    },
    // 取消 form 弹窗
    closeFormDialog () {
      if (!this.formDialog.isShowPopover) return;
      this.formDialog.isShowPopover = !this.formDialog.isShowPopover;
    },
    // 选中当前行
    clickTableRow (row) {
      this.table.clickRow = row;
      // 判断是否是多行列表
      this.table.itemCode = row[["car", "driver"].includes(this.table.tabActiveName) ? 'itemCode' : 'carrierCode']
    },
    async loadCodeNo () {
      //加载编号
      try {
        let { data } = await api.getcarrierbaseCode();
        this.$set(this.form.data.base, 'carrierCode', data)
      } catch (e) {
        this.$message.error('获取编码失败，请重试！')
        console.log(e);
      }
    },
    async loadTabCodeNo () {
      try {
        //加载子列表编号
        if (!["car", "driver"].includes(this.table.tabActiveName)) {
          const { data } = await api[
            this.table.itemTabObj.tabApi["getCodeApi"]
          ]();
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            [this.table.itemTabObj["codeName"]]: data
          };
        }
      } catch (e) {
        console.log(e);
      }
    },
    /*************************** 供应链供应商methods end ****************** */
    initData () {
      api.initSelect(this.form.formConfig);
      const { formData, status } = this.getActivePathData(this.$route.path);
      for (let key in formData) {
        if (formData.hasOwnProperty) this.form.data = formData[key]
      }
      debugger
      this.status = status;

      if (status === 'add') {
        this.loadCodeNo()
      } else {
        this.table.isTabDisabled = false,
          this.table.tabActiveName = "finance",
          this.handlerTabClick({ name: this.table.tabActiveName })
      }

      this.getAddress("province");
    }
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
    margin-top: 20px;
  }
  .el-tabs__nav {
    & > :first-child::before {
      content: "*";
      color: red;
    }
  }
}
</style>
