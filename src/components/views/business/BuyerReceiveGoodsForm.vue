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
    <el-row style="padding:10px 0">
      <form-module-head title></form-module-head>型号
      <el-input
        v-model="arrivalGoodsModel"
        style="width:200px;margin-right:10px"
      ></el-input>
      <el-button
        type="primary"
        @click="getDelegeteBillList"
      >查询</el-button>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="11">
        <el-tabs type="border-card">
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
                v-for="item in entrustGoodsTable"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              ></el-table-column>
            </el-table>
            <pagination
              @handlePageChange="handleTabPageChange"
              :count="delegeteBillTableCount"
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
            v-show="ruleForm.status == '1'"
            type="primary"
            style="width:100%;"
            @click="addLogisticsInfo"
          >增加</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            v-show="ruleForm.status == '1'"
            type="danger"
            style="width:100%;"
            @click="removeLogisticsInfo"
          >移除</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            v-show="ruleForm.status == '1'"
            type="primary"
            style="width:100%;"
            @click="addAllLogisticsInfo"
          >全部增加</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <el-button
            v-show="ruleForm.status == '1'"
            type="danger"
            style="width:100%;"
            @click="removeAllLogisticsInfo"
          >全部移除</el-button>
        </div>
        <div
          center="true"
          style="height:50px;"
        >
          <!-- <el-button
            type="primary"
            style="width:100%;"
            @click="seveAllLogisticsInfo"
          >保存</el-button>-->
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
                  v-if="!(ruleForm.status == '2' ||
            ruleForm.status.charAt(0) == '3' ||
            ruleForm.status == '4' ||
            ruleForm.status.charAt(0) == '5')"
                    size="mini"
                    @click="changeCount(scope.row)"
                    style="padding: 3px;"
                  >确定</el-button>
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
import formConfig from "@/domain/formconfig/business/BuyerReceiveGoods";
import BuyerReceiveGoodsBind from "@/domain/entities/business/BuyerReceiveGoods";

//表格配置
import entrustGoodsTabConfig from "@/domain/tableconfig/commerce/ReceiveEntrustGoods.js";
import buyerLogisticsInfoTable from "@/domain/tableconfig/business/BuyerLogisticsInfo.js";

//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

export default {
  components: { FormComponent, formModuleHead, Popover, Pagination },
  name: "BuyerReceiveGoodsForm",
  data () {
    return {
      searchTarget: '',
      isLoading: false,
      enterFromBtn: false, //是否从新增/修改按钮进入页面的
      curLeftRow: {}, //左侧表格中被选中的行
      curRightRow: {}, //右侧表格中被选中的行
      logisticsTableData: [], //买方物流信息表格数据
      logisticsTableCount: 1, //买方物流信息表格页码
      delegeteBillTableData: [], //委托单商品信息表格数据
      delegeteBillTableCount: 1,
      delegeteBillTablePager: { pageIndex: 1, pageSize: 10 },
      arrivalGoodsModel: "",
      ruleForm: new BuyerReceiveGoodsBind(),
      formConfig: utools.cloneObj(formConfig),
      entrustGoodsTable: entrustGoodsTabConfig,
      tableColumn: buyerLogisticsInfoTable,
      verify: [], // 表单验证
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
          text: "供应商",
          api: "querysupplierbaseSearch",
          nameFrom: "supplierName",
          codeFrom: "supplierCode"
        },
        {
          key: "5",
          text: "业务员",
          api: "getEmployeeInfo",
          nameFrom: "employeeInfoName",
          codeFrom: "employeeInfoCode"
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
          text: "退款客户",
          api: "getCustomerList",
          nameFrom: "customerName",
          codeFrom: "customerNo"
        }
      ]
    };
  },
  computed: {
    delegeteBillNumber: function () {
      return this.ruleForm.delegeteBillNo;
    },
    tableConfigBind: _ => ({
      querycarrierbaseSearch: _ =>
        require("@/domain/tableconfig/basicdata/CarrierBase.js").default,
      queryentrustorderSearch: _ =>
        require("@/domain/tableconfig/commerce/EntrustOrder.js").default,
      getCreditCompanyNameData: _ =>
        require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
      getCityList: _ =>
        require("@/domain/tableconfig/other/CityList.js").default,
      getTimeLimitData: _ =>
        require("@/domain/tableconfig/basicdata/TransportTime.js").default,
      getDispatchLineData: _ =>
        require("@/domain/tableconfig/basicdata/ShippingRoute.js").default,
      getAreaData: _ =>
        require("@/domain/tableconfig/basicdata/DeliveryArea.js").default,
      getCreditCompanyNameData: _ =>
        require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
      queryclientSearch: _ =>
        require("@/domain/tableconfig/business/Client.js").default,
      getCustomerList: _ =>
        require("@/domain/tableconfig/basicdata/Customer.js").default,
      getCustomerContact: _ =>
        require("@/domain/tableconfig/basicdata/CustomerContact.js").default,
      querysupplierbaseSearch: _ =>
        require("@/domain/tableconfig/basicdata/SupplierBase.js").default,
      getEmployeeInfo: _ =>
        require("@/domain/tableconfig/basicdata/EmployeeInfo.js").default
      // getCustomerContact: _ =>
      //   require("@/domain/tableconfig/basicdata/Customer.js").default
    }),
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
        sendCityName: "城市列表",
        receiptCityName: "城市列表",
        receiveCompanyName: "客户",
        receiveContactName: "客户销售资料联系人",
        dispatchLineName: "发运路线",
        areaName: "交货区域",
        underPartyName: {
          "1": "公司",
          "2": "委托方",
          "3": "客户",
          "4": "供应商",
          "5": "员工资料",
          "6": "其他",
          "7": "客户",
        },
        premiumPartyName: {
          "1": "公司",
          "2": "委托方",
          "3": "客户",
          "4": "供应商",
          "5": "员工资料",
          "6": "其他",
          "7": "客户",
        },
      };
    }
  },
  methods: {
    // 保存数量
    seveQuantity () { },
    sevePiece () {
      this.seveQuantity;
    },
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
        const { data, status } = await api.editBuyerLogisticsInfo(
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
     * 委托单商品信息，物流明细
     */
    //获取委托订单 - 商品信息列表
    async getDelegeteBillList () {
      const { data } = await api.getEntrustGoods({
        entrustOrderNo: this.ruleForm["delegeteBillNo"],
        arrivalGoodsModel: this.arrivalGoodsModel,
        pageSize: this.delegeteBillTablePager.pageSize,
        pageIndex: this.delegeteBillTablePager.pageIndex
      });
      this.delegeteBillTableData = data.list;
      this.delegeteBillTableCount = data.count;
      this.curLeftRow = {}; //清空当前选中行
      this.curRightRow = {};
    },
    //委托单商品信息-表格翻页
    handleTabPageChange: function (page) {
      this.delegeteBillTablePager.pageSize = page.pageSize;
      this.delegeteBillTablePager.pageIndex = page.pageIndex;
      this.getDelegeteBillList();
    },
    //左侧委托订单表格选中行
    clickLeftRow: function (row) {
      this.curLeftRow = row;
    },
    //右侧物流信息表格选中行
    clickRightRow: function (row) {
      this.curRightRow = row;
    },
    //查询物流信息表格
    async serchLogisticsTable (pager) {
      let logisticsInfo = await api.queryBuyerLogisticsInfo({
        billNo: this.ruleForm.billNo,
        pageIndex: pager ? pager.pageIndex : 1,
        pageSize: pager ? pager.pageSize : 10
      });
      this.logisticsTableData = logisticsInfo.data.list;
      this.logisticsTableCount = logisticsInfo.data.count;
      this.curRightRow = {};
    },
    //增加买方物流信息
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
            let cur = this.formatTableData(this.curLeftRow)
            cur.quantity = cur.sellerQuantity - (cur.deliveryQuantity || 0)
            await api.saveBuyerLogisticsInfo(
              JSON.stringify([cur])
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
              // this.element.quantity = 0
              this.logisticsTableData.push(this.formatTableData(element));
            } else {
              let cur = this.formatTableData(element)
              cur.quantity = cur.sellerQuantity - (cur.deliveryQuantity || 0)
              await api.saveBuyerLogisticsInfo(
                JSON.stringify([cur])
              );
              this.serchLogisticsTable();
            }
          }
        });
        this.curLeftRow = {};
      }
    },
    //移除一条买方物流信息
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
            await api.deleteBuyerLogisticsInfo(
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
          await api.deleteBuyerLogisticsInfo(JSON.stringify(sendParams));
          this.serchLogisticsTable();
          this.getDelegeteBillList();
        }
        this.curRightRow = {};
      }
    },
    seveAllLogisticsInfo () { },
    //物流信息翻页
    logisticsPageChange: function (pager) {
      this.serchLogisticsTable(pager);
    },

    /**
     * 主表单
     */

    //新增时：初始化获取单据编号
    async getInitBillNo () {
      try {
        const { data } = await api.getBuyerReceiveOrderNo();
        this.ruleForm.billNo = data;
      } catch (error) {
        console.log(error);
      }
      // 发运组织 默认默认讯宇
      this.ruleForm.dispatchOrganizationCode = 'GSXX2019072300015';
      this.ruleForm.dispatchOrganizationName = '深圳市讯宇供应链管理有限公司';
    },
    //修改时：初始化表单数据
    async initFormData () {
      const billNo = utools.getSession("buyerReceivebillNo").billNo;
      try {
        const { data } = await api.getBuyerReceiveOneData(billNo);
        this.ruleForm = data;
        this.serchLogisticsTable();
      } catch (error) {
        console.log(error);
      }
      let con =  utools.getFromconfigObj(this.formConfig,'delegeteBillNo')
      delete con['btn']
    },
    //返回
    goBack: function () {
      this.$router.push("M0405");
    },
    //保存表单
    async saveForm () {
      if (this.isVerify()) {
        this.isLoading = true;
        try {
          if (this.jumpType == "create") {
            this.ruleForm.logisticsDetail = this.logisticsTableData;
            const { data } = await api.saveBuyerReceiveForm(this.ruleForm);
            this.ruleForm = { ...this.ruleForm, status: data.status || "1" };
            this.$message.success("保存成功");
            utools.setSession("buyerReceiveGoodsForm", {
              jumpType: "update",
              enterFromBtn: true
            });
            utools.setSession("buyerReceivebillNo", {
              billNo: this.ruleForm.billNo
            });
            this.initData();
          } else {
            const { data } = await api.editBuyerReceiveForm(this.ruleForm);
            this.$message.success("修改成功");
            this.initData();
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      } else {
      }
    },
    //获取表单
    handlerFormVerify ($refs) {
      this.verify.push($refs);
    },
    isVerify() {
        var isVerify = true;
        for(let item of this.verify){
          item["formModel"].validate(valid => {
              if(!valid) isVerify = false
          });
          
        }
        return isVerify;
    },

    /**
     * 弹窗
     */
    //点击输入框的搜索图标，弹出弹窗
    async rousePopover (key, obj) {
      this.searchTarget = key;
      if (!obj.api) return;
      this.popover.element = obj;
      this.popover.ruleForm = {
        [key]: ""
      };
      if (key == "receiveContactName") {
        this.popover.ruleForm["customerNo"] = this.ruleForm[
          "receiveCompanyCode"
        ];
      }
      let searchCode = "";
      switch (key) {
        /* 源单据类型的处理 */
        case "sendCityName": {
          searchCode = "keyWords";
          break;
        }
        case "receiptCityName": {
          searchCode = "keyWords";
          break;
        }
      }
      // if (key == "underPartyName" && !this.underPartyType) {
      //   this.$message.warning("请选择运费承担方类型");
      //   return
      // }
      // if (key == "premiumPartyName" && !this.premiumPartyType) {
      //   this.$message.warning("请选择保险费承担方类型");
      //   return
      // }
      this.requestTable().then(val => {
        this.popover = Object.assign({}, this.popover, {
          currencySelectInputKey: key,
          formConfig: [
            {
              label: obj.name,
              moduleBind: searchCode ? searchCode : key === 'delegeteBillNo' ? 'entrustOrderNo' : key,
              isInput: true
            }
          ],
          popoverListKey: this.tableConfigBind[obj.api](),
          popoverList: val.list,
          count: val.count,
          isShowPopover: true
        });
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
      const obj = this.popover.element;
      const WHITE_LIST = ['dispatchOrganizationName', 'carrierName', 'receiveCompanyName', 'receiveContactName', 'dispatchLineName', 'areaName', 'underPartyName', 'premiumPartyName'];
      const WHITE_newLIST = ['delegeteBillNo'];
      let status =
        WHITE_LIST.includes(this.searchTarget) ? '2' : '';
        if(WHITE_newLIST.includes(this.searchTarget)){
          status = '4'
        }
      this.searchTarget == 'underPartyName' && this.ruleForm.underPartyType === '2' && (status = '');
      this.searchTarget == 'premiumPartyName' && this.ruleForm.premiumPartyType === '2' && (status = '');
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
      if (key == "receiveCompanyName") {
        this.ruleForm["receiveCompanyCode"] = data.customerNo;
        this.ruleForm["receiveCompanyName"] = data.customerName;
        return;
      }
      if (key == "delegeteBillNo") {
        this.ruleForm["receiveCompanyCode"] = data.customerCode;
        this.ruleForm["receiveCompanyName"] = data.customerName;
        // return;
      }
      this.popover.element.tableConfig.forEach(item => {
        if (item.value) {
          this.ruleForm[item.value] = data[item.key];
          if (item.value == "underPartyName") {
            this.ruleForm["chargeObject"] = this.ruleForm["underPartyName"];
          }
          if (item.value == "receiveContactName") {
            this.ruleForm["dispatchLineName"] = data.dispatchLine;
            this.ruleForm["receiveCompanyName"] = data.receiveCompany;
            this.ruleForm["areaName"] = data.receiveArea;
            this.ruleForm["receiveAddress"] = data.contactAddress;
            this.ruleForm["contactTel"] = data.tel;
            this.ruleForm["phone"] = data.phone;
            this.ruleForm["receivePostCode"] = data.areaCode;
          }
        }
      });
      console.log(this.ruleForm, "this.ruleForm");
    },
    //关闭弹窗
    changeisShowPopover: function () {
      this.$set(this.popover, "isShowPopover", false);
    },
    //初始化页面数据
    initData: function () {
      const pageState = utools.getSession("buyerReceiveGoodsForm");
      if (pageState.enterFromBtn) {
        this.jumpType = pageState.jumpType;
        if (this.jumpType == "create") {
          this.getInitBillNo();
        } else if (this.jumpType == "update") {
          this.initFormData();
        }
        if (this.jumpType == "update") {
          this.utools.setFormConfig(this.formConfig, [
            {
              key: "delegeteBillNo",
              btn: false
            }
          ]);
        } else {
          this.utools.setFormConfig(this.formConfig, [
            {
              key: "delegeteBillNo",
              btn: true
            }
          ]);
        }
      } else {
        for (const key in pageState) {
          this[key] = pageState[key];
        }
      }
      api.initSelect(this.formConfig);
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
      "logisticsTableData",
      "logisticsTableCount",
      "delegeteBillTableData",
      "delegeteBillTableCount",
      "arrivalGoodsModel",
      "ruleForm",
      "jumpType"
    ];
    const dataObj = this.formatSaveDatas(datas);
    dataObj.enterFromBtn = false;
    utools.setSession("buyerReceiveGoodsForm", dataObj);
  },
  watch: {
    delegeteBillNumber (val) {
      if (val) {
        this.getDelegeteBillList();
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
  width: 50%;
  input {
    height: 100% !important;
    border: 0px;
    border-bottom: 1px solid #909399;
    border-radius: 0;
    background-color: transparent;
    padding: 0 !important;
  }
}
.el-icon-circle-check {
  margin-right: 15px;
}
</style>