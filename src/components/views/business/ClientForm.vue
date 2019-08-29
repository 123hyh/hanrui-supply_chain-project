<template>
  <div class="Box ClientForm">
    <!-- table 弹出框 -->
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
      @changeisShowPopover="rousePopover"
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="handlePageChange"
    ></popover>
    <!-- 保存 返回 按钮 -->
    <preserve-btn
      :form='clientForm'
      @handlePreserve="tabActiveName!='bank'? handlePreserve(): handlePreserve('finance')"
      @handleRollback="handleRollback"
      @hanldeBlacklist='hanldeBlacklist'
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- tab -->
    <div>
      <el-tabs
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
        class="tabs-defined"
      >
        <el-tab-pane
          label="基本资料"
          name="contact"
        >
          <form-config
            :inputKey="clientKey"
            :formModel="clientForm"
            @handlerFormVerify="handlerFormVerify"
            @handlerFormConfigClickSearch="rousePopover"
          ></form-config>
        </el-tab-pane>
        <el-tab-pane
          v-if="isJurisdiction"
          label="财务资料"
          name="bank"
        >
          <form-config
            :inputKey="columnDataFinanceKey"
            :formModel="columnDataFinance"
            @handlerFormVerify="handlerFormVerify_finance"
            @handlerFormConfigClickSearch="rousePopover"
          ></form-config>
        </el-tab-pane>
        <el-tab-pane
          label="收货资料"
          name="receive"
        ></el-tab-pane>
        <el-tab-pane
          label="开票资料"
          name="invoice"
        ></el-tab-pane>
        <el-tab-pane
          label="供应商委托收款协议"
          name="gatherAgreement"
        ></el-tab-pane>
        <el-tab-pane
          label="协议明细"
          name="agreement"
        ></el-tab-pane>
        <el-tab-pane
          label="业务员"
          name="salesman"
        ></el-tab-pane>
        <el-tab-pane
          label="商务员"
          name="businessPart"
        ></el-tab-pane>
        <el-tab-pane
          label="客户拜访记录"
          name="visit"
        ></el-tab-pane>
        <el-tab-pane
          label="其他信息"
          name="other"
        ></el-tab-pane>
        <el-tab-pane
          label="流失原因"
          name="lost"
        ></el-tab-pane>
        <!-- 表格 -->
        <el-row :gutter="10">
          <el-col
            :span="24"
            class="handleTableHeight"
          >
            <div
              class="mb-10"
              v-if="tabActiveName != 'agreement' && (clientForm.status == '1' || !clientForm.status)"
            >
              <el-button @click="openTabForm('create')">新增</el-button>
              <el-button @click="openTabForm('update')">修改</el-button>
              <el-button @click="openTabForm('delete')">删除</el-button>
            </div>

            <table-component
              :isSubTable='true'
              :dialog='false'
              :popoverList='dataTab'
              :popoverListKey='columnDataTable'
              :count='queryTableData.count'
              :activeRow.sync='curRowData'
              @handlePageChange='handleTabPageChange'
            ></table-component>

          </el-col>
        </el-row>
      </el-tabs>
    </div>

    <!--弹出层： 供应链供应商form -->
    <el-dialog
      v-dialogDrag
      :visible.sync="popFormTab"
      :close-on-click-modal="false"
      width="1150px"
      :title="title"
    >
      <form-config
        :formModel="columnData"
        :inputKey="columnDataKey"
        @handlerFormConfigClickSearch="rousePopover"
        @handlerFormVerify="handlerFormVerify"
      ></form-config>
      <!-- 按钮行 -->
      <div slot="footer">
        <el-button
          type="primary"
          @click="saveTab"
        >保存</el-button>
        <el-button
          type="cancel"
          @click="closeTabForm"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入公共的table组件
import Popover from "@/components/common/Popover.vue";
import FormConfig from "@/components/common/FormConfig.vue";
import Pagination from "@/components/common/Pagination.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


import Client from "@/domain/entities/business/Client";
import ClientFormConfig from "@/domain/formconfig/business/Client";

import ClientFinance from "@/domain/entities/business/ClientFinance";
import ClientFinanceFormConfig from "@/domain/formconfig/business/ClientFinance";
import api from "@/assets/js/appHelper.js";
import utools from "@/domain/common/utools";
// 引入vuex
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
let ColumnData = "";
export default {
  name: 'ClientForm',
  components: {
    Popover,
    FormConfig,
    Pagination,
    TableComponent
  },
  data () {
    return {
      isJurisdiction: true,
      popover: {
        //弹出框组件参数
        isShowPopover: false, // 弹窗显示
        width: "50%", // 弹窗显示
        popoverType: "table", // 弹出框
        currencySelectInputKey: "", //弹出框选中对应的key值
        popoverListKey: [], // 弹出框表头绑定的 key
        popoverList: [], // 表格数据
        count: 0, // 分页数据总条数
        ruleForm: {}, // 查询栏的model绑定
        curPopStorage: {}, // 当前弹窗传递的数据
        formConfig: [], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        itemName: "", // 弹窗标题
        apiKey: "" //弹窗内部的接口
      },
      /************* 弹窗data end *****************/
      activeForm: {},
      tabActiveName: "contact", // 激活tab菜单
      // 主form
      verify: {}, // 表单验证
      verify_finance: {}, // 财务表单验证
      curRowData: {},
      jumpType: "",
      clientForm: new Client(),
      clientKey: ClientFormConfig,
      /*********** 供应链供应商data start***********/
      // table
      dataTab: [],
      // table - 列
      columnDataTable: [],
      columnDataFinanceKey: ClientFinanceFormConfig,
      columnDataFinance: new ClientFinance(),
      // 查询条件 form
      queryTableData: {},
      // 新增form
      queryApi: "",
      title: "",
      columnData: "",
      columnDataKey: "",
      //form弹出框
      popFormTab: false,
      isLoading: false
      /*********** 供应链供应商data end***********/
    };
  },
  computed: {
    requestAddress () {
      return {
        province: () => api.getProvince(),
        city: code => api.getCity(code),
        county: code => api.getDistrict(code)
      };
    },
    ...mapGetters(["btnType", "getbreadCrumbsList", "getActivePathData"])
  },
  watch: {
    "clientForm.province": {
      handler (cur, pre) {
        if (!cur || cur == pre) return;
        pre && (delete this.clientForm.city, delete this.clientForm.county);
        this.getAddress("city", cur);
      },
      deep: true
    },
    "clientForm.city": {
      handler (cur, pre) {
        if (!cur || cur == pre) return;
        pre && delete this.clientForm.county;
        this.getAddress("county", cur);
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(["addBtnType", "addbreadCrumbsList"]),
    // 融资授信额度的处理
    setCredit ({ data: { list } } = {}) {

      // 优化后
      const [{ creditLimitAmount = '', creditLimit = '', exportMaxTaxLimit = '', exportAmountLimit = '' } = {}] = list;
      let obj = {
        customerLimit: creditLimitAmount,
        noExportLimit: creditLimit,
        exportTaxLimit: exportMaxTaxLimit,
        exportMatLimit: exportAmountLimit
      };

      for (let key of Object.keys(obj)) {
        this.$set(this.clientForm, key, obj[key])
      };
    },

    async getAddress (type, code) {
      try {
        const { data } = await this.requestAddress[type](code);
        this.handleSelectOption(data, type);
      } catch (e) {
        console.log(e);
      }
    },
    handleSelectOption (data, type) {
      for (let item of this.clientKey) {
        if (item.key === type) {
          item.selectOption = data.map(item => ({
            itemKey: item.code,
            itemValue: item.name
          }));
          break;
        }
      }
    },
    async hanldeBlacklist () {
      utools.blacklist.call(
        this,
        async () => {
          await api.addClientBlacklist(this.clientForm.clientNo);
          this.$set(this.clientForm, 'hasBlack', true)
        }
      )
    },
    /************************** 弹窗methods start *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
      var obj = null;
      return function (type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    handleBtnClickObj () {
      return {
        search: async () => {
          try {
            var {
              data: { count, list }
            } = await api.querySearch(
              this.popover.apiKey,
              this.popover.ruleForm
            );
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (e) {
            console.log(e);
          }
          // 清空查询数据
          this.popover.formConfig.map((e, i) => {
            if (this.popover.ruleForm[e.moduleBind])
              this.popover.ruleForm[e.moduleBind] = "";
          });
        }
      };
    },
    //table
    handlerSubPreservation (rowData, key) {
      console.log(rowData, key);
      if (this.clientForm[key] !== undefined) {
        if (
          key == "outcomeOwner" ||
          key == "orderReceiverName" ||
          key == "orderFollowerName"
        ) {
          this.clientForm[key] = rowData["employeeInfoName"];
          // 映射编码
          let personCode =
            key == "outcomeOwner"
              ? "outcomeOwnerCode"
              : key == "orderReceiverName"
                ? "orderReceiverCode"
                : "orderFollowerCode";
          this.clientForm[personCode] = rowData["employeeInfoCode"];
        } else if (key.includes("inlandDestination")) {
          this.clientForm[key] = rowData["domesticDestinationName"];
          this.clientForm["inlandDestinationCode"] =
            rowData["domesticDestinationCode"];
        } else if (key.includes("parentName")) {
          this.clientForm[key] = rowData["clientName"];
          this.clientForm["parentCode"] = rowData["clientNo"];
        } else {
          this.clientForm[key] = rowData["customerName"]; // 委托方名称
          this.clientForm["clientShortName"] = rowData["customerShortName"]; // 简称
          this.clientForm["registeredNo"] = rowData["businessLicense"]; // 工商注册号 - 营业执照注册号
          this.clientForm["irsNumber"] = rowData["taxId"]; // 国税编号 - 税务登记号
          this.clientForm["tel"] = rowData["tel"]; // 座机电话号码
          this.clientForm["email"] = rowData["email"]; // Email
          this.clientForm["url"] = rowData["websiteUrl"]; // 网址
          this.clientForm["fax"] = rowData["fax"]; // 传真
          this.clientForm["businessLicenseAddress"] = rowData["companyAddress"]; // 营业执照地址 - 公司地址
          this.clientForm["registerMoney"] = rowData["registerMoney"]; // 注册资金(万)
          this.clientForm["establishedTime"] = rowData["establishedTime"]; // 成立日期
        }
      } else if (
        this.columnDataFinance[key] !== undefined ||
        key == "organizationName"
      ) {
        if (key.includes("leader") || key.includes("salesman")) {
          this.columnDataFinance[key] = rowData["employeeInfoName"];
          this.columnData[key] = rowData["employeeInfoName"];
          let personCode = key == "leader" ? "leaderCode" : "salesmanCode";
          this.columnDataFinance[personCode] = rowData["employeeInfoCode"];
          this.columnDataFinance["department"] = rowData["department"];
          this.columnData["department"] = rowData["department"];
        } else if (key.includes("department")) {
          this.columnDataFinance[key] = rowData["departmentName"];
          this.columnData[key] = rowData["departmentName"];
          this.clientForm["departmentCode"] = rowData["departmentCode"];
        } else if (key.includes("organizationName")) {
          this.columnDataFinance["organizationCode"] = rowData["companyCode"];
          this.columnDataFinance["organizationName"] =
            rowData["companyName"] || "";
        } else {
          this.columnDataFinance[key] = rowData[key];
        }
      } else if (
        this.columnDataFinance[key] !== undefined ||
        key == "companyName"
      ) {
        if (key.includes("leader") || key.includes("salesman")) {
          this.columnDataFinance[key] = rowData["employeeInfoName"];
          this.columnData[key] = rowData["employeeInfoName"];
          let personCode = key == "leader" ? "leaderCode" : "salesmanCode";
          this.columnDataFinance[personCode] = rowData["employeeInfoCode"];
          this.columnDataFinance["department"] = rowData["department"];
          this.columnData["department"] = rowData["department"];
        } else if (key.includes("department")) {
          this.columnDataFinance[key] = rowData["departmentName"];
          this.columnData[key] = rowData["departmentName"];
          this.clientForm["departmentCode"] = rowData["departmentCode"];
        } else if (key.includes("organizationName")) {
          this.columnDataFinance["organizationCode"] = rowData["companyCode"];
          this.columnDataFinance["organizationName"] =
            rowData["companyName"] || "";
        } else {
          this.columnDataFinance[key] = rowData[key];
        }
      } else if (this.columnData[key] !== undefined || key == "followPerson") {
        if (
          key.includes("leader") ||
          key.includes("salesman") ||
          key.includes("businessPart")
        ) {
          this.columnData[key] = rowData["employeeInfoName"];
          // 映射编码
          let personCode =
            key == "leader"
              ? "leaderCode"
              : key == "salesman"
                ? "salesmanCode"
                : "businessPartCode";
          this.clientForm[personCode] = rowData["employeeInfoCode"];
          this.columnDataFinance["department"] = rowData["department"];
          this.columnData["department"] = rowData["department"];
        } else if (key.includes("department")) {
          this.columnData[key] = rowData["departmentName"];
          this.clientForm["departmentCode"] = rowData["departmentCode"];
        } else if (key.includes("followPerson")) {
          this.columnData[key] = rowData["employeeInfoCode"];
          this.columnData["followPerson"] = rowData["employeeInfoName"];
        } else {
          this.columnData[key] = rowData[key];
        }
      }
    },
    // 员工资料
    employeeInfo () {
      this.popover.formConfig = [
        { label: "职员编码", moduleBind: "employeeInfoCode", isInput: true }
      ];
      this.popover.apiKey = "/employeeinfo";
      this.popover.itemName = "员工资料";
      this.popover.popoverListKey = [
        // 设置表格的表头
        { key: "employeeInfoCode", name: "职员编码" },
        { key: "employeeInfoName", name: "名字" },
        { key: "department", name: "部门" },
        { key: "contactInfo", name: "联系方式" },
        { key: "leader", name: "上级领导" }
      ];
    },
    rousePopover (type) {
      console.log(type)
      if (this.clientForm[type] !== undefined) {
        if (
          type == "outcomeOwner" ||
          type == "orderReceiverName" ||
          type == "orderFollowerName"
        ) {
          this.employeeInfo();
        } else if (type == "inlandDestination") {
          this.popover.formConfig = [
            {
              label: "编码",
              moduleBind: "domesticDestinationCode",
              isInput: true
            }
          ];
          this.popover.apiKey = "/domesticdestination";
          this.popover.itemName = "境内目的地";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "domesticDestinationCode", name: "编码" },
            { key: "domesticDestinationName", name: "名称" },
            { key: "domesticDestinationAbb", name: "简称" },
            { key: "customsCode", name: "对应海关编码" },
            { key: "description", name: "描述" }
          ];
        } else if (type == "clientTradeName") {
          this.popover.formConfig = [
            {
              label: "报关单编码",
              moduleBind: "customsFormCode",
              isInput: true
            }
          ];
          this.popover.apiKey = "/customsformbase";
          this.popover.itemName = "报关单-基础信息";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "customsFormCode", name: "报关单编码" },
            { key: "customsType", name: "报关类型" },
            { key: "customsStatus", name: "报关状态" },
            { key: "destination", name: "境内目的地" },
            { key: "conveyance", name: "运输工具" }
          ];
        } else if (type === "clientName") {
          this.popover = {
            ...this.popover,
            formConfig: [
              { label: "商机管理", moduleBind: "businessNo", isInput: true }
            ],
            apiKey: "/business",
            itemName: "商机管理",
            popoverListKey: require("@/domain/tableconfig/business/Business.js")
              .default
          };
        } else {
          this.popover.formConfig = [
            { label: "委托方", moduleBind: "businessNo", isInput: true }
          ];
          this.popover.apiKey = "/client";
          this.popover.itemName = "委托方";
          this.popover.popoverListKey = require("@/domain/tableconfig/business/Client.js").default; /* [
            // 设置表格的表头
            { key: "businessNo", name: "商机编号" },
            { key: "customerName", name: "委托方名称" },
            { key: "customerCode", name: "委托方编码" },
            { key: "customerShortName", name: "委托方简称" },
            { key: "companyAddress", name: "公司地址" },
          ]; */
        }
      } else if (this.columnDataFinance[type] !== undefined) {
        if (type == "leader" || type == "salesman") {
          this.employeeInfo();
        } else if (type == "department") {
          this.popover.formConfig = [
            { label: "部门编码", moduleBind: "departmentCode", isInput: true }
          ];
          this.popover.apiKey = "/department";
          this.popover.itemName = "部门资料";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "departmentCode", name: "部门编码" },
            { key: "departmentName", name: "部门名称" },
            { key: "parentDepartment", name: "上级部门" },
            { key: "remark", name: "部门说明" }
          ];
        } else {
          this.popover.formConfig = [
            { label: "公司编码", moduleBind: "companyCode", isInput: true }
          ];
          this.popover.apiKey = "/companyinfo";
          this.popover.itemName = "公司";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "companyCode", name: "公司编码" },
            { key: "companyName", name: "名称" },
            { key: "address", name: "详细地址" },
            { key: "corporate", name: "法人代表" },
            { key: "registFund", name: "注册资金" }
          ];
        }
      } else if (this.columnData[type] !== undefined) {
        if (type == "leader" || type == "salesman" || type == "businessPart") {
          this.employeeInfo();
        } else if (type == "department") {
          this.popover.formConfig = [
            { label: "部门编码", moduleBind: "departmentCode", isInput: true }
          ];
          this.popover.apiKey = "/department";
          this.popover.itemName = "部门资料";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "departmentCode", name: "部门编码" },
            { key: "departmentName", name: "部门名称" },
            { key: "parentDepartment", name: "上级部门" },
            { key: "remark", name: "部门说明" }
          ];
        } else if (type == "followPerson") {
          this.popover.formConfig = [
            { label: "职员编码", moduleBind: "employeeInfoCode", isInput: true }
          ];
          this.popover.apiKey = "/employeeinfo";
          this.popover.itemName = "员工资料";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "employeeInfoCode", name: "职员编码" },
            { key: "employeeInfoName", name: "名字" },
            { key: "department", name: "部门" },
            { key: "contactInfo", name: "联系方式" },
            { key: "leader", name: "上级领导" }
          ];
        } else {
          this.popover.formConfig = [
            { label: "委托方编号", moduleBind: "clientNo", isInput: true }
          ];
          this.popover.apiKey = "/clientfinance";
          this.popover.itemName = "委托方";
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: "clientNo", name: "委托方编号" },
            { key: "leader", name: "财务业务员" },
            { key: "organizationCode", name: "财务组织编码" },
            { key: "contact", name: "联系人" },
            { key: "organizationName", name: "财务组织名称" }
          ];
        }
      };

      // 基础资料 请求提交状态的白名单
      const WHITE_LIST = [
        'orderReceiverName', 'orderFollowerName', 'outcomeOwner', 'inlandDestination', 'organizationName', 'leader', 'department', 'salesman', 'businessPart', 'followPerson'
      ]

      let currencyObj = {
        // 配置当前点击请求对象
        [type]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(
              this.popover.apiKey,
              { ...this.popover.ruleForm, status: WHITE_LIST.includes(type) ? '2' : '' }
            );
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (error) {
            console.log(error);
          }
        }
      };
      this.popover.currencySelectInputKey = type; // 设置当前点击输入框key
      type && currencyObj[type]();
      this.popover.isShowPopover = !this.popover.isShowPopover;
    },
    //分页
    handlePageChange (paper) {
      this.popover.ruleForm.pageIndex = paper.pageIndex;
      this.popover.ruleForm.pageSize = paper.pageSize;
      this.handleBtnClick("search"); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    handlerFormVerify_finance ($refs) {
      this.verify_finance = $refs;
    },
    isVerify (tabType) {
      let isVerify = false;
      // 不同的页签不同的验证规则
      let fun = tabType ? "verify_finance" : "verify";
      this[fun]["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },

    //分页
    async handleTabPageChange (paper = {}) {
      const bankParams = this.utools.cloneObj(paper);
      delete bankParams.clientNo;
      const {
        data: { list, count }
      } = await (
        this.tabActiveName == 'bank' ?
          api.getClientBlankData({ billNo: paper.clientNo, ...bankParams }) :
          api.querySearch(
            "/client" + this.tabActiveName.toLowerCase(),
            paper
          ));
      this.dataTab = list;
      utools.turnCodeBoolean(this.dataTab);
      this.queryTableData.count = count;
    },
    handleRollback () {
      this.$router.push("/M0204");
    },
    // 第一个字母转大写
    capitalize ([first, ...rest]) {
      return first ? first.toUpperCase() + rest.join("") : "";
    },
    async handlerTabClick ({ name } = tab, event) {
      this.title =
        name == "contact"
          ? "联系人"
          : name == "bank"
            ? "银行信息"
            : name == "receive"
              ? "收货资料"
              : name == "invoice"
                ? "开票资料"
                : name == "gatherAgreement"
                  ? "供应商委托收款协议"
                  : name == "agreement"
                    ? "协议明细"
                    : name == "salesman"
                      ? "业务员"
                      : name == "businessPart"
                        ? "商务员"
                        : name == "visit"
                          ? "客户拜访记录"
                          : name == "other"
                            ? "其他信息"
                            : "流失原因";
      ColumnData = require("@/domain/entities/business/Client" +
        this.capitalize(name)).default;
      this.columnData = new ColumnData();
      this.columnDataTable = require("@/domain/tableconfig/business/Client" +
        this.capitalize(name)).default;
      console.log(`Client${this.capitalize(name)}`);
      this.columnDataKey = require("@/domain/formconfig/business/Client" +
        this.capitalize(name)).default;
      api.initSelect(this.columnDataFinanceKey);
      api.initSelect(this.columnDataKey);
      this.columnDataFinance.clientNo = sessionStorage.clientNo;
      this.columnData.clientNo = sessionStorage.clientNo;
      this.handleTabPageChange({
        pageIndex: 1,
        clientNo: this.columnData.clientNo
      });
      this.curRowData = {}; // 清空当前行数据
    },
    /*************** 供应链供应商methods start******************/
    //保存主表单
    async handlePreserve (tabName) {
      let formData = "",
        editApiKey = "",
        addApiKey = "";
      tabName == "finance"
        ? (() => {
          (formData = this.columnDataFinance),
            (editApiKey = "editclientfinanceData"),
            (addApiKey = "addclientfinanceData");
        })()
        : (() => {
          (formData = this.clientForm),
            (editApiKey = "editclientData"),
            (addApiKey = "addclientData");
        })();
      if (
        (this.jumpType == "update" && tabName != "finance") ||
        (this.jumpType == "update" && tabName == "finance" && formData.itemCode)
      ) {
        if (this.isVerify()) {
          this.isLoading = true;
          try {
            const { data } = await api[editApiKey](formData);
            this.clientForm = {
              ...this.clientForm,
              status: data.status || "1"
            };
            if (data) {
              // 提交成功后...
              this.$message.success("修改成功");
            }
          } catch (e) {
            this.$message.error('修改失败，请重试！')
            console.log(e);
          } finally {
            this.isLoading = false;
          }
        }
      } else {
        if (this.isVerify(tabName)) {
          this.isLoading = true;
          try {
            const { data } = await api[addApiKey](formData);
            this.clientForm = {
              ...this.clientForm,
              status: data.status || "1"
            };
            this.setCredit(await api.getCredit({
              customerCode: this.clientForm.clientNo
            }))
            if (data) {
              // 提交成功后...
              this.$message.success("保存成功");
            }
          } catch (e) {
            console.log(e);
            this.$message.error("保存失败，请重试！");
          } finally {
            this.isLoading = false;
          }
        }
      }
    },
    // 新增修改子form
    async saveTab () {
      if (this.isVerify()) {
        utools.saveReceiptsTips.call(
          this,
          async () => {
            // 验证成功
            if (this.btnType == "update") {
              const { data: editData } = await this.tabActiveName === 'bank' ? api.changeClientBlankData({ method: 'PUT', data: this.columnData, }) : api.editData(
                "/client" + this.tabActiveName.toLowerCase(),
                this.columnData
              );
              if (editData) {
                // 提交成功后...
                this.$message.success("修改成功");
                this.popFormTab = false; //关闭弹窗
                this.handlerTabClick({ name: this.tabActiveName }); //数据刷新
              }
            } else {
              const { data: addData } = await this.tabActiveName === 'bank' ?
                api.changeClientBlankData({ method: 'POST', data: { ...this.columnData, billNo: this.columnData.clientNo }, }) :
                api.addData(
                  "/client" + this.tabActiveName.toLowerCase(),
                  this.columnData
                );
              if (addData) {
                // 提交成功后...
                this.$message.success("保存成功");
                this.popFormTab = false; //关闭弹窗
                this.handlerTabClick({ name: this.tabActiveName }); //数据刷新
              }
            }
            this.popFormTab = false;
            this.handleTabPageChange({ [this.tabActiveName !== 'bank' ? 'clientNo' : 'clientNo']: this.columnData.clientNo })
          }
        )
      }
    },
    // 是否新增修改
    async openTabForm (btnType) {
      if (btnType != "create" && JSON.stringify(this.curRowData) != "{}") {
        try {
          if (this.tabActiveName === 'bank') {

          } else {
            const { data: searchOneData } = await api.searchOneData(
              "/client" + this.tabActiveName.toLowerCase(),
              { itemCode: this.curRowData.itemCode }
            );
            this.curRowData = searchOneData;
          }

        } catch (e) {
          console.log(e);
        }
      }
      // 拿数据
      this.columnData =
        btnType == "create" ? new ColumnData() : this.curRowData;
      //显示空选提示语
      if (btnType != "create" && JSON.stringify(this.curRowData) == "{}") {
        this.$message.error("请选择数据");
      } else if (btnType != "delete") {
        this.columnData.clientNo = sessionStorage.clientNo;
        this.addBtnType(btnType);
        this.popFormTab = true;
      }
      // 确认删除
      if (btnType == "delete" && JSON.stringify(this.curRowData) != "{}") {
        utools.deleteMessage.call(
          this,
          utools.removeReceiptsTips.bind(
            this,
            async () => {
              const { data, status } = await this.tabActiveName === 'bank' ?
                api.deleteClientBlankData(this.curRowData.itemCode) :
                api.deleteData(
                  "/client" + this.tabActiveName.toLowerCase(),
                  this.curRowData.itemCode
                );
              this.handleTabPageChange({ [this.tabActiveName !== 'bank' ? 'clientNo' : 'clientNo']: this.columnData.clientNo })
              this.handlerTabClick({ name: this.tabActiveName });
            }
          )
        );
      }
    },
    async loadCodeNo () {
      //加载编号
      try {
        let { data } = await api.getclientCode();
        sessionStorage.clientNo = this.clientForm.clientNo = data;
        this.handlerTabClick({ name: "contact" }); // 只能放后面加载联系人列表
      } catch (e) {
        console.log(e);
      }
    },
    // 取消弹窗
    closeTabForm () {
      this.popFormTab = false;
    },
    // 选中当前行
    clickTabRow (row) {
      // 获取修改内容
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    async getClickRowFinance () {
      const {
        data: { list, count }
      } = await api.searchclientfinanceData({
        clientNo: this.clientForm.clientNo
      });
      this.columnDataFinance = list.length > 0 ? list[0] : new ClientFinance();
    }
    /*************************** 供应链供应商methods end *******************/
  },
  async created () {
    // let jurisdiction = this.$store.state.authorityControl.listBtn['M0204']
    // if(jurisdiction.indexOf('finance')>-1){
    //   this.isJurisdiction=true
    // }
    api.initSelect(this.clientKey);
    this.getAddress("province");
    // 切换路由数据保存
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.clientForm = formData);
    this.jumpType = status;
    if (this.jumpType == "update") {
      this.clientForm = JSON.parse(sessionStorage.ClientForm);
      sessionStorage.clientNo = this.clientForm.clientNo;
      try {
        this.setCredit(await api.getCredit({
          customerCode: this.clientForm.clientNo
        }))
        /*  const { data: creditData } = await api.getCredit({
           customerCode: this.clientForm.clientNo
         }); */
        /* this.clientForm["customerLimit"] =
          creditData.list.length > 0
            ? creditData.list[0]["creditLimitAmount"]
              ? creditData.list[0]["creditLimitAmount"]
              : 0
            : 0;
        this.clientForm["noExportLimit"] =
          creditData.list.length > 0
            ? creditData.list[0]["creditLimit"]
              ? creditData.list[0]["creditLimit"]
              : 0
            : 0;
        this.clientForm["exportTaxLimit"] =
          creditData.list.length > 0
            ? creditData.list[0]["exportMaxTaxLimit"]
              ? creditData.list[0]["exportMaxTaxLimit"]
              : 0
            : 0;
        this.clientForm["exportMatLimit"] =
          creditData.list.length > 0
            ? creditData.list[0]["exportAmountLimit"]
              ? creditData.list[0]["exportAmountLimit"]
              : 0
            : 0; */
      } catch (e) {
        console.log(e);
      }
      this.getClickRowFinance();
      this.handlerTabClick({ name: "contact" }); // 只能放后面加载联系人列表
    } else {
      this.jumpType == "add" && this.loadCodeNo(); //加载编号
      this.clientForm.billStatus = "10";
    }
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.clientForm, status: this.jumpType },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less" >
.ClientForm,
.Box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .handleTableHeight {
    height: 48vh;
  }
  .tabs-defined {
    > :first-child {
      > div > div > div {
        > :first-child::before,
        :nth-child(2)::before,
        :nth-child(7)::before,
        :nth-child(8)::before {
          content: "*";
          color: red;
        }
      }
    }
  }
}
</style>
