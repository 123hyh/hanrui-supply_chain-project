<template>
  <div>
    <!-- 弹窗 -->
    <popover
      :width="popover.width"
      :isShowPopover="popover.isShowPopover"
      :popoverType="popover.popoverType"
      :currencySelectInputKey="popover.currencySelectInputKey"
      :formConfig="popover.formConfig"
      :popoverListKey="popover.popoverListKey"
      :popoverList="popover.popoverList"
      :ruleForm="popover.ruleForm"
      :count="popover.count"
      :btnObj="popover.btnObj"
      :itemName="popover.itemName"
      @handleBtnClickType="handleBtnClick"
      @handlerSubPreservation="handlerSubPreservation"
      @changeisShowPopover="changeisShowPopover"
      @handlePageChange="handlePageChange"
    ></popover>

    <!-- 操作按钮 -->
    <preserve-btn
      :form='ruleForm'
      @handlePreserve="saveForm"
      @handleRollback="goBack"
      :isLoading="isLoading"
    ></preserve-btn>

    <!-- 表单 -->
    <div>
      <div
        v-for="(block,i) in formConfig"
        :key="i"
      >
        <form-module-head :title="block.title"></form-module-head>
        <form-component
          :formModel="ruleForm"
          :inputKey="block.list"
          @handlerFormConfigClickSearch="rousePopover"
          @handlerFormVerify="handlerFormVerify"
          @selectChange="selectChange"
        ></form-component>
      </div>
    </div>

    <!-- tab -->
    <el-row :gutter="10">
      <el-col :span="11">
        <el-tabs
          type="border-card"
          @tab-click="tabClick"
        >
          <el-tab-pane label="委托单商品信息">
            <el-table
              :data="delegeteBillTableData"
              border
              highlight-current-row
              @row-click="clickLeftRow"
              ref="leftTable"
              height="400"
            >
              <el-table-column
                v-for="item in delegeteBillTableConfig"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              >
                <!-- <template slot-scope="scope">{{ scope.row }}</template> -->
              </el-table-column>
            </el-table>
            <pagination
              @handlePageChange="entrustGoodsPageChange"
              :count="delegeteBillTableCount"
            ></pagination>
          </el-tab-pane>
          <el-tab-pane label="发运明细">
            <el-table
              :data="HkshipmentBaseTableData"
              border
              highlight-current-row
              ref="leftTable"
              height="400"
            >
              <el-table-column
                v-for="item in HkshipmentBaseTableConfig"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              ></el-table-column>
            </el-table>
            <pagination
              @handlePageChange="HkshipmentBasePageChange"
              :count="HkshipmentBaseTableCount"
            ></pagination>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col
        :span="2"
        center="true"
      >
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            type="primary"
            style="width:100%;"
            @click="addLogisticsInfo"
            v-show="ruleForm.status == '1'"
          >增加</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            type="danger"
            style="width:100%;"
            @click="removeLogisticsInfo"
            v-show="ruleForm.status == '1'"
          >移除</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            type="primary"
            style="width:100%;"
            @click="addAllLogisticsInfo"
            v-show="ruleForm.status == '1'"
          >全部增加</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            type="danger"
            style="width:100%;"
            @click="removeAllLogisticsInfo"
            v-show="ruleForm.status == '1'"
          >全部移除</el-button>
        </div>
      </el-col>
      <el-col :span="11">
        <el-tabs type="border-card">
          <el-tab-pane label="物流明细">
            <el-table
              :data="logisticsTableData"
              border
              highlight-current-row
              ref="rightTable"
              @row-click="clickRightRow"
              height="400"
            >
              <el-table-column
                v-for="item in tableColumn"
                :prop="item.prop"
                :key="item.label"
                :label="item.label"
                :width="item.width"
              ></el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
              >
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    v-model="scope.row.quantity"
                    class="inputTB"
                    :min="0"
                    :controls="false"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                prop="piece"
                label="件数"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.piece"
                    class="inputTB"
                    :min="0"
                    :controls="false"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="piece"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="changeCount(scope.row)"
                    style="padding: 3px;"
                  >确定</el-button>
                  <!-- <i class="el-icon-circle-check" @click="changeCount(scope.row)"></i> -->
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :class="{'hide-page':jumpType=='create'}"
              @handlePageChange="logisticsPageChange"
              :count="logisticsTableCount"
            ></pagination>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import Popover from "@/components/common/Popover.vue";
import Pagination from "@/components/common/Pagination.vue";

// 表单配置
import formConfig from "@/domain/formconfig/business/SellerReceiveGoods";
import formBind from "@/domain/entities/business/SellerReceiveGoods";

//表格配置
import delegeteBillTableConfig from "@/domain/tableconfig/commerce/sellerReceiveEntrustGoods";
import HkshipmentBaseTableConfig from "@/domain/tableconfig/logistics/HkshipmentBase";
import sellerLogisticsTableConfig from "@/domain/tableconfig/business/SellerLogisticsInfo.js";
import tableConfigBind from "@/domain/tableconfig/common/ApiTable.js";

//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

export default {
  components: { FormComponent, formModuleHead, Popover, Pagination },
  data () {
    return {
      searchTarget: '',
      isLoading: false,
      delegeteBillTableConfig, //委托单商品信息表格配置
      delegeteBillTableData: [], //委托单商品信息表格数据
      delegeteBillTableCount: 1,

      HkshipmentBaseTableData: [], //发运明细表格数据
      HkshipmentBaseTableConfig, //发运明细表格配置
      HkshipmentBaseTableCount: 1,

      sellerLogisticsTableConfig, //卖方物流信息表格配置
      logisticsTableData: [], //卖方物流信息表格数据
      logisticsTableCount: 1, //卖方物流信息表格页码

      curLeftRow: {}, //左侧表格中被选中的行
      curRightRow: {}, //右侧表格中被选中的行

      ruleForm: new formBind(),
      formConfig,
      tableColumn: sellerLogisticsTableConfig,

      verify: {}, // 表单验证
      jumpType: "", //页面状态：新增/修改
      popover: {
        //弹出框组件参数
        isShowPopover: false, // 弹窗显示
        width: "50%", // 弹窗宽度
        popoverType: "table", // 弹出框类型
        itemName: "", // 弹窗标题
        formConfig: [], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        ruleForm: {}, // 查询栏的model绑定
        popoverListKey: [], // 弹出框表头绑定的 key
        popoverList: [], // 表格数据
        currencySelectInputKey: "", //弹出框选中对应的key值
        count: 0, // 分页数据总条数
        element: {} //查询元素的整个对象
      },
      typeUrls: [
        //承担方类型选中不同值，承担对象对应不同的api
        {
          key: "1",
          text: "公司",
          api: "getCreditCompanyNameData",
          nameFrom: "companyName",
          codeFrom: "companyCode"
        },
        {
          key: "2",
          text: "委托方",
          api: "queryclientSearch",
          nameFrom: "clientName",
          codeFrom: "clientNo"
        },
        {
          key: "3",
          text: "客户",
          api: "getCustomerList",
          nameFrom: "customerName",
          codeFrom: "customerNo"
        },
        {
          key: "4",
          text: "业务员",
          api: "getEmployeeInfo",
          nameFrom: "employeeInfoName",
          codeFrom: "employeeInfoCode"
        },
        {
          key: "5",
          text: "退款客户",
          api: "getCustomerList",
          nameFrom: "customerName",
          codeFrom: "customerNo"
        },
        {
          key: "6",
          text: "其它",
          api: "",
          nameFrom: "",
          codeFrom: ""
        },
        {
          key: "7",
          text: "供应商",
          api: "querysupplierbaseSearch",
          nameFrom: "supplierName",
          codeFrom: "supplierCode"
        }
      ]
    };
  },
  computed: {
    delegeteBillNumber: function () {
      return this.ruleForm.delegeteBillNo;
    },
    underPartyType () {
      return this.ruleForm.underPartyType;
    },
    premiumPartyType () {
      return this.ruleForm.premiumPartyType;
    },
    DialogTitle () {
      return {
        dispatchOrganizationName: "公司",
        carrierName: "承运商",
        carModelName: "车型",
        dispatchLineName: "发运路线",
        areaName: "交货区域",
        underPartyName: {
          "1": "公司",
          "2": "委托方",
          "3": "客户",
          "4": "员工资料",
          "5": "客户",
          "6": "其他",
          "7": "供应商",
        },
        premiumPartyName: {
          "1": "公司",
          "2": "委托方",
          "3": "客户",
          "4": "员工资料",
          "5": "客户",
          "6": "其他",
          "7": "供应商",
        },
      };
    },
    maxBind () {
      return function (value) {
        if (value.temporary == null) {
          value.temporary = value.quantity;
        }
        // 卖方数量 - 已提货数量 + 当前提货数量
        return (
          value.sellerQuantity - (value.shippedQuantity || 0) + value.temporary
        );
      };
    }
  },
  methods: {
    //委托订单信息格式转换为物流信息
    formatTableData: function (bill) {
      const info = { ...bill };
      info.entryNo = bill.itemCode ? bill.itemCode : bill.entryNo;
      info.billNo = this.ruleForm.billNo;
      info.inventoryCode = bill.orderModel;
      info.inventoryName = bill.arrivalGoodsName;
      info.specificationType = bill.arrivalGoodsModel;
      info.unit = bill.sellerUnit;
      info.unitName = bill.sellerUnitName;
      info.quantity = 0;
      return info;
    },
    async changeCount (row) {
      if (this.jumpType == "update") {
        const { data, status } = await api.editSellerLogisticsInfo(
          JSON.stringify(row)
        );
        if (status == "200") {
          this.$message.success(data);
          this.getDelegeteBillList();
        } else {
          this.$message.error("修改失败");
        }
        this.serchLogisticsTable();
      }
    },
    //表单中，承担方类型下拉框，与承担方对象搜索弹窗联动
    selectChange: function (value, element) {
      const relation = {
        underPartyType: "underPartyName",
        premiumPartyType: "premiumPartyName"
      };
      if (
        element.key == "underPartyType" ||
        element.key == "premiumPartyType"
      ) {
        let one = this.formConfig[2].list.find(
          item => item.key == relation[element.key]
        );
        console.log(one, "one");
        const typeApi = this.typeUrls.find(item => item.key == value);
        one.api = typeApi.api;
        one.tableConfig[0].key = typeApi.nameFrom;
        one.tableConfig[1].key = typeApi.codeFrom;
        //其它时，可输入
        value == "6" ? (one.disabled = false) : (one.disabled = true);
        //切换类型时，清除对象值
        if (element.key == "underPartyType") {
          this.ruleForm["underPartyName"] = "";
          this.ruleForm["underParty"] = "";
        }
        if (element.key == "premiumPartyType") {
          this.ruleForm["premiumPartyName"] = "";
          this.ruleForm["premiumParty"] = "";
        }
      }
    },
    /**
     * 主表单
     */
    //初始化页面数据
    initData: function () {
      const pageState = utools.getSession("sellerReceiveGoodsForm");
      if (pageState.enterFromBtn) {
        this.jumpType = pageState.jumpType;
        if (pageState.jumpType == "create") {
          this.getInitBillNo();
        } else {
          this.initFormData();
        }
      } else {
        for (const key in pageState) {
          this[key] = pageState[key];
        }
      }
      api.initSelect(this.formConfig);
    },
    //新增时：初始化获取单据编号
    async getInitBillNo () {
      try {
        const { data } = await api.getSellerReceiveOrderNo();
        this.ruleForm.billNo = data;
      } catch (error) {
        console.log(error);
      }
      // 发运组织 默认默认讯宇
      this.ruleForm.dispatchOrganizationCode = 'GSXX2019072300015';
      this.ruleForm.dispatchOrganizationName = '深圳市讯宇供应链管理有限公司';
      // 承运商
      this.ruleForm.carrierCode = 'GSXX2019072300015';
      this.ruleForm.carrierName = '深圳市讯宇供应链管理有限公司';
      // 交货方式
      this.ruleForm.deliveryMode = '2';
      
    },
    //修改时：初始化表单数据，和物流明细
    async initFormData () {
      const billNo = utools.getSession("sellerReceivebillNo").billNo;
      try {
        const { data } = await api.getSellerReceiveOneData(billNo);
        this.ruleForm = data;
        this.serchLogisticsTable();
      } catch (error) {
        console.log(error);
      }
    },
    //返回
    goBack: function () {
      this.$router.push("M0406");
    },
    //保存表单
    async saveForm () {
      if (this.isVerify()) {
        this.isLoading = true;
        try {
          if (this.jumpType == "create") {
            this.ruleForm.logisticsDetail = this.logisticsTableData;
            const { data } = await api.saveSellerReceiveForm(this.ruleForm);
            this.ruleForm = { ...this.ruleForm, status: data.status || "1" };
            this.$message.success("保存成功");
            utools.setSession("sellerReceiveGoodsForm", {
              jumpType: "update",
              enterFromBtn: true
            });
            utools.setSession("sellerReceivebillNo", {
              billNo: this.ruleForm.billNo
            });
            this.initData();
          } else {
            const { data } = await api.editSellerReceiveForm(this.ruleForm);
            this.$message.success("修改成功");
            this.initData();
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      } else {
        this.$message.error("单据编号、承运商、委托单号不能为空");
        console.log("验证失败");
      }
    },
    //获取表单
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    //表单验证
    isVerify () {
      return (
        this.ruleForm.carrierCode &&
        this.ruleForm.delegeteBillNo &&
        this.ruleForm.billNo
      );
    },
    // isVerify() {
    //     let isVerify = false;
    //     this.verify["formModel"].validate(valid => {
    //         isVerify = valid;
    //     });
    //     return isVerify;
    // },

    /**
     * 弹窗
     */
    //点击输入框的搜索图标，弹出弹窗
    async rousePopover (key, obj) {
      this.searchTarget = key;
      if (!obj.api) return;
      this.popover.element = obj;
      let keys = key === 'delegeteBillNo' ? 'entrustOrderNo' : key;
      this.popover.ruleForm = {
        [keys]: ''
      };
      this.requestTable().then(val => {
        this.popover = Object.assign({}, this.popover, {
          currencySelectInputKey: key,
          formConfig: [{ label: obj.name, moduleBind: keys, isInput: true }],
          popoverListKey: tableConfigBind[obj.api](),
          popoverList: val.list,
          count: val.count,
          isShowPopover: true
        });
        console.log(this.popover.formConfig)
        if (key == "underPartyName") {
          this.popover.itemName = this.DialogTitle[key][this.underPartyType];
        } else if (key == "premiumPartyName") {
          this.popover.itemName = this.DialogTitle[key][this.premiumPartyType];
        } else {
          this.popover.itemName = this.DialogTitle[key];
        }
      });

    },
    //请求弹窗中表格数据
    async requestTable () {
      console.log(this.searchTarget);
      const WHITE_LIST = ['dispatchOrganizationName', 'carrierName', 'carModelName', 'dispatchLineName', 'areaName', 'underPartyName', 'premiumPartyName'];
      let status =
        WHITE_LIST.includes(this.searchTarget) ? '2' : '';
      this.searchTarget == 'underPartyName' && this.ruleForm.underPartyType === '2' && (status = '');
      this.searchTarget == 'premiumPartyName' && this.ruleForm.premiumPartyType === '2' && (status = '');

      const obj = this.popover.element;
      const { data } = await api[obj.api]({ ...this.popover.ruleForm, status });
      console.log(data, "初始数据---");
      return data;
    },
    //弹窗中，点击查询
    handleBtnClick: function () {
      this.requestTable().then(val => {
        this.popover = Object.assign({}, this.popover, {
          popoverList: val.list,
          count: val.count
        });
      });
    },
    //弹窗中，点击页码查询
    handlePageChange: function (paper) {
      this.popover.ruleForm.pageIndex = paper.pageIndex;
      this.popover.ruleForm.pageSize = paper.pageSize;
      this.handleBtnClick();
    },
    //弹窗中，点击保存
    handlerSubPreservation: function (data, key) {
      this.popover.element.tableConfig.forEach(item => {
        if (item.value) {
          this.ruleForm[item.value] = data[item.key];
        }
      });
      console.log(this.ruleForm, "this.ruleForm");
    },
    //关闭弹窗
    changeisShowPopover: function () {
      this.$set(this.popover, "isShowPopover", false);
    },

    /**
     * 委托单商品信息，发运明细，物流明细
     */
    //获取委托订单 - 商品信息列表
    async getDelegeteBillList (pager) {
      const { data } = await api.getEntrustGoods({
        entrustOrderNo: this.ruleForm["delegeteBillNo"],
        pageSize: pager ? pager.pageSize : 10,
        pageIndex: pager ? pager.pageIndex : 1
      });
      this.delegeteBillTableData = data.list;
      this.delegeteBillTableCount = data.count;
      this.curLeftRow = {}; //清空当前选中行
      this.curRightRow = {};
    },
    //获取发运明细 - 表格数据
    async getHkshipmentBaseList (pager) {
      const { data } = await api.getHkShipmentBase({
        delegeteBillNo: this.ruleForm["delegeteBillNo"],
        pageSize: pager ? pager.pageSize : 10,
        pageIndex: pager ? pager.pageIndex : 1
      });
      this.HkshipmentBaseTableData = data.list;
      this.HkshipmentBaseTableCount = data.count;
    },
    //委托单商品信息-表格翻页
    entrustGoodsPageChange: function (pager) {
      this.getDelegeteBillList(pager);
      this.curLeftRow = {};
    },
    //发运明细 - 表格翻页
    HkshipmentBasePageChange: function (pager) {
      this.getHkshipmentBaseList(pager);
    },
    //左侧切换tab标签时，清空当前选中行
    tabClick: function () {
      this.curLeftRow = {};
    },
    //委托单商品信息-选中行
    clickLeftRow: function (row) {
      this.curLeftRow = row;
    },
    //增加卖方物流信息
    async addLogisticsInfo () {
      if (JSON.stringify(this.curLeftRow) == "{}") {
        this.$message.warning("请选择要增加的数据");
      } else {
        const isAdded = this.logisticsTableData.find(
          item => item.entryNo === this.curLeftRow.itemCode
        );
        if (!isAdded) {
          if (this.jumpType == "create") {
            this.logisticsTableData.push(this.formatTableData(this.curLeftRow));
          } else {
            await api.saveSellerLogisticsInfo(
              JSON.stringify([this.formatTableData(this.curLeftRow)])
            );
            this.serchLogisticsTable();
          }
        } else {
          this.$message.warning("不能添加重复信息");
        }
      }
    },
    //全部增加物流信息
    async addAllLogisticsInfo () {
      if (this.delegeteBillTableData.length == 0) {
        this.$message.warning("请选择要增加的数据");
      } else {
        this.delegeteBillTableData.forEach(async element => {
          const isAdded = this.logisticsTableData.find(
            item => item.entryNo === element.itemCode
          );
          if (!isAdded) {
            if (this.jumpType == "create") {
              this.logisticsTableData.push(this.formatTableData(element));
            } else {
              await api.saveSellerLogisticsInfo(
                JSON.stringify([this.formatTableData(element)])
              );
              this.serchLogisticsTable();
            }
          }
        });
        this.curLeftRow = {};
      }
    },
    //查询物流信息表格
    async serchLogisticsTable (pager) {
      let logisticsInfo = await api.querySellerLogisticsInfo({
        billNo: this.ruleForm.billNo,
        pageIndex: pager ? pager.pageIndex : 1,
        pageSize: pager ? pager.pageSize : 10
      });
      this.logisticsTableData = logisticsInfo.data.list;
      this.logisticsTableCount = logisticsInfo.data.count;
      this.curRightRow = {};
    },
    //右侧物流信息表格选中行
    clickRightRow: function (row) {
      this.curRightRow = row;
    },
    //移除一条物流信息
    async removeLogisticsInfo () {
      if (JSON.stringify(this.curRightRow) == "{}") {
        this.$message.warning("请选择要移除的数据");
      } else {
        const dataIndex = this.logisticsTableData.findIndex(
          item => item.entryNo === this.curRightRow.entryNo
        );
        if (dataIndex != -1) {
          if (this.jumpType == "create") {
            this.logisticsTableData.splice(dataIndex, 1);
          } else {
            await api.deleteSellerLogisticsInfo(
              JSON.stringify([{ itemCode: this.curRightRow.itemCode }])
            );
            this.serchLogisticsTable();
            this.getDelegeteBillList();
          }
        } else {
          this.$message.warning("请选择要移除的信息");
        }
      }
    },
    //全部移除物流信息
    async removeAllLogisticsInfo () {
      if (this.logisticsTableData.length == 0) {
        this.$message.warning("请选择要移除的数据");
      } else {
        if (this.jumpType == "create") {
          this.logisticsTableData = [];
        } else {
          let sendParams = [];
          for (let i = 0; i < this.logisticsTableData.length; i++) {
            sendParams.push({
              itemCode: this.logisticsTableData[i].itemCode
            });
          }
          await api.deleteSellerLogisticsInfo(JSON.stringify(sendParams));
          this.serchLogisticsTable();
          this.getDelegeteBillList();
        }
        this.curRightRow = {};
      }
    },
    //物流信息翻页
    logisticsPageChange: function (pager) {
      this.serchLogisticsTable(pager);
    },
    //整理要存储的数据
    formatSaveDatas: function (datas) {
      let datasObj = {};
      for (let i = 0; i < datas.length; i++) {
        datasObj[datas[i]] = this[datas[i]];
      }
      return datasObj;
    }
  },
  created () {
    this.initData();
  },
  beforeDestroy () {
    var datas = [
      "delegeteBillTableData",
      "delegeteBillTableCount",
      "HkshipmentBaseTableData",
      "HkshipmentBaseTableCount",
      "logisticsTableData",
      "logisticsTableCount",
      "ruleForm",
      "jumpType"
    ];
    const dataObj = this.formatSaveDatas(datas);
    dataObj.enterFromBtn = false;
    utools.setSession("sellerReceiveGoodsForm", dataObj);
  },
  watch: {
    delegeteBillNumber (val) {
      if (val) {
        this.getDelegeteBillList();
        this.getHkshipmentBaseList();
      }
    }
  }
};
</script>

<style lang='less'>
.hide-page {
  visibility: hidden;
}
.inputTB {
  width: 100%;
  input {
    height: 100% !important;
    border: 0px;
    border-bottom: 1px solid #909399;
    border-radius: 0;
    background-color: transparent;
    padding: 0 !important;
  }
}
</style>