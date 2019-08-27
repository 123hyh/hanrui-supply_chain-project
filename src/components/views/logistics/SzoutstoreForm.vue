<template>
  <div class="AddCreditBox szoutstore-form">
    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data'
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      @handleExport='handleExport'
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- 输入框 -->
    <form-component
      :formModel="form['data']"
      :inputKey="form['formConfig']"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
    ></form-component>
    <!-- 分割条 -->
    <div class="cut-off-rule">基本信息</div>
    <!-- 表格 -->
    <section v-show="table.isshow">
      <div
        class="mb-10"
        v-show="+form.data.status || 0 <= 1"
      >
        <el-button
          :disabled="!addcz"
          @click="handlerTableBtnClick('add')"
        >新增</el-button>
        <el-button @click="handlerTableBtnClick('update')">修改</el-button>
        <el-button @click="handlerTableBtnClick('delete')">删除</el-button>
      </div>

      <table-component
        :isSubTable='true'
        :dialog='false'
        :popoverList='table.tableData'
        :popoverListKey='table.tableConfig'
        :count='pageCount'
        :activeRow.sync='clickRowData'
        @handlePageChange='initTableData'
      ></table-component>

    </section>
    <!-- 子表单弹窗 -->
    <el-dialog
      v-dialogDrag
      width="1100px"
      :close-on-click-modal='false'
      :title="itemDialogTitle"
      :visible.sync="formDialog.isshow"
      @close.native="closeFormDialog"
      close-on-press-escape
      :before-close="closeFormDialog"
    >
      <div
        :key="i"
        v-for="(item,i) in formDialog.formConfig"
      >
        <form-module-head
          :title="item.title"
          v-show="item.showline"
        ></form-module-head>
        <form-config
          ref="formD"
          :formModel="formDialog.ruleForm"
          :inputKey="item.list"
          @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
          @handlerFormVerify="handlerFormVerify"
        ></form-config>
      </div>
      <div class="btn-right">
        <el-button @click.stop="handlerTableFormPreservation">确定</el-button>
        <el-button @click.stop="closeFormDialog">取消</el-button>
      </div>
    </el-dialog>
    <!-- <popover-component
      :isShowPopover="formDialog.isshow"
      :popoverType="'form'"
      :formData="formDialog"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
    ></popover-component>-->
    <!-- 点选弹窗 -->
    <popover-component
      :isShowPopover="tableDialog.isshow"
      :itemName="tableDialog.title"
      :popoverList="tableDialog.data"
      :popoverListKey="tableDialog.tableConfig"
      :count="tableDialog.count"
      :btnObj="tableDialog.btnObj"
      :ruleForm="tableDialog.ruleForm"
      :formConfig="tableDialog.queryBarObj"
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
      @handleBtnClickType="handleBtnClick"
      @handlePageChange="handlePageChange"
    ></popover-component>
    <div></div>
  </div>
</template>
<script>
// 公共方法
import api from "@/assets/js/appHelper.js"
import utools from "@/domain/common/utools.js"

// 公共组件
import FormComponent from "@/components/common/FormConfig.vue"
import PaginationComponent from "@/components/common/Pagination.vue"
import PopoverComponent from "@/components/common/Popover.vue"
import formModuleHead from "@/components/common/FormModuleHead.vue"
import FormConfig from "@/components/common/FormConfig"

// 注册表
import formConfig from "@/domain/formconfig/logistics/Szoutstore.js"
import tableConfig from "@/domain/tableconfig/logistics/Hkoutstoreitem.js"
import itemFormConfig from "@/domain/formconfig/logistics/Hkoutstoreitem.js"
import { mapGetters, mapMutations } from "vuex"
import { window } from 'd3-selection'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


export default {
  name: 'szoutstoreForm',
  components: {
    FormComponent,
    TableComponent,
    PaginationComponent,
    PopoverComponent,
    formModuleHead,
    FormConfig
  },
  data () {
    return {
      // 表单
      form: {
        data: {},
        formConfig
      },
      // 表格
      table: {
        isshow: true,
        tableData: [],
        tableConfig
      },
      // 子表单
      formDialog: {
        isshow: false,
        ruleForm: {},
        formConfig: itemFormConfig
      },
      // 点选
      tableDialog: {
        isshow: false,
        data: [],
        title: "",
        tableConfig: [],
        ruleForm: { tenantId: "hfy" },
        count: 0,
        queryBarObj: [
          { label: "编码", moduleBind: "companyCode", isInput: true }
        ], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }] // 查询栏按钮
      },
      addcz: false,
      isLoading: false,
      tableBtnType: "",
      dialogTarget: "",
      status: "",
      pageCount: 0,
      clickRowData: {},
      zbcz: ""
    };
  },
  created () {
    api.initSelect(this.form.formConfig);
    const { formData = {}, status, itemTable = {} } = this.getActivePathData(
      this.$route.path
    );
    utools.judgeNullObj(formData) && (this.form.data = formData);
    utools.judgeNullObj(itemTable) && (this.table = itemTable);
    utools.judgeNullObj(status) && (this.status = status);
    let isAdd = this.status === "add";

    isAdd
      ? (this.getCode(),
        (this.form.data = {
          ...this.form.data,
          sourceBillType: this.form.data.sourceBillType ? this.form.data.sourceBillType : "1",
          billStatus: "1"
        }))
      : this.initTableData();

    // 如果是 修改状态，把源单据禁用
    utools.setFormConfig(this.form.formConfig, [
      {
        key: "sourceBillType",
        disabled: !isAdd
      },
      {
        key: "delegeteBillNo",
        disabled: !isAdd
      }
    ]);
    // ‘增加’按钮显示
    if (this.form.data.sourceBillType == "4") {
      this.addcz = true;
    }
  },
  watch: {
    "form.data.sourceBillType" (cur, pre) {
      if (cur === pre) return;
      utools.setFormConfig(this.form.formConfig, [
        {
          key: "delegeteBillNo",
          name: new Map([
            ['1', '深圳收货入库单'],
            ['2', '深圳发货通知单'],
            ['3', '委托单'],
            ['4', '其他']
          ]).get(cur),
          btn: cur !== "4" && this.status == "add",
          rules: cur !== '4' ? [
            { required: true, message: "必填", trigger: ['blur'] }
          ] : []
        },
        {
          key: "delegeteName",
          btn: cur === "4"
        },
        {
          key: "supplierName",
          btn: (cur === "4" || cur === "2") && this.status == "add"
        },
        {
          key: "customerName",
          btn: (cur === "4" || cur === "2") && this.status == "add"
        }
      ]);


      // 表格列表的字段中文显示
      for (let item of this.table.tableConfig) {
        if (item.prop === "delegeteBillNo") {
          item.label =
            cur === "1"
              ? "深圳收货入库单"
              : cur === "2"
                ? "深圳发货通知单"
                : cur === "3"
                  ? "委托单"
                  : "其他";
        }
      }
      /*  utools.setFormConfig(this.formDialog.formConfig, [
         {
           key: "delegeteBillNo",
           name:
             cur === "1"
               ? "深圳收货入库单"
               : cur === "2"
                 ? "深圳发货通知单"
                 : cur === "3"
                   ? "委托单"
                   : "其他"
         }
       ]); */
      if (this.status === "update") {
        return;
      }
      let pam = {
        delegete: "",
        delegeteName: "",
        supplier: "",
        supplierName: "",
        customer: "",
        customerName: "",
        reportGateType: "",
        issueType: "",
        issueTypeName: "",
        storeOrg: "",
        storeOrgName: "",
        department: "",
        departmentName: "",
        exchangeRate: "",
        summary: "",
        initData: "",
        bizDate: ''
      };
      pre && (this.form.data = { ...this.form.data, delegeteBillNo: "", ...pam }, this.table.tableData = []); // pre 等于undefined 一定是首次加载或者页签切换回来， 处理页签切换把原有数据清空
      if (cur === "1" || cur === "2" || cur === "3") {
        this.addcz = false;
      } else {
        this.addcz = true;
      }
    }
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: {
        formData: this.form.data,
        status: this.status,
        itemTable: { ...this.table }
      },
      path: this.$route.path
    });
    next();
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    itemDialogTitle () {
      const type = this.form.data.sourceBillType;
      let title = '';
      switch (type) {
        case '1':
          title = '来源深圳收货入库单'; break;
        case '2':
          title = '来源深圳发货通知单'; break;
        case '3':
          title = '来源委托单'; break;
        case '其他':
          title = '其他';
      }
      return title;
    },
    DialogRequest () {
      return {
        assistUnitName: (data = {}) => api.getMeasurement(data),
        issueTypeName: (data = {}) => api.getTransactionTypeList(data),
        storeOrgName: (data = {}) => api.getCreditCompanyNameData(data),
        warehouseName: (data = {}) => api.getWarehouseList(data),
        sourceBillType: (data = {}) => [],
        delegeteName: (data = {}) => api.queryclientSearch(data),
        inBillNoDelegeteName: (data = {}) => api.queryclientSearch(data),
        supplierName: (data = {}) => api.querysupplierbaseSearch(data),
        customerName: (data = {}) => api.getCustomerList(data),
        inBillCustomerName: (data = {}) => api.getCustomerList(data),
        delegeteBillNo: {
          "1": (data = {}) => api.querySzinstore(data), //-----
          "2": (data = {}) => api.queryImportinvoice(data), //-----
          "3": (data = {}) => api.queryentrustorderSearch(data)
        },
        carrierName: (data = {}) => api.querycarrierbaseSearch(data),
        inventoryName: (data = {}) => api.getMaterielBaseList(data),
        taxNo: (data = {}) => api.getCustomsMaterielList(data),
        brandName: (data = {}) => api.getBrandList(data),
        originPlaceName: (data = {}) => api.getOriginList(data),
        unitName: (data = {}) => api.getMeasurement(data),
        deliveryCustomerName: (data = {}) => api.getCreditCompanyNameData(data),
        departmentName: (data = {}) => api.getDepartment(data),
        storekeeperName: (data = {}) => api.queryemployeeinfoSearch(data),
        baseUnitName: (data = {}) => api.getMeasurement(data),
        inventoryCode: (data = {}) => api.getMaterielBaseList(data)
      };
    },
    tableConfigs: () => ({
      issueTypeName: _ =>
        require("@/domain/tableconfig/basicdata/TransactionType.js").default,
      storeOrgName: _ =>
        require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
      warehouseName: _ =>
        require("@/domain/tableconfig/basicdata/Warehouse.js").default,
      sourceBillType: _ => [] /* 暂时为空 */,
      delegeteName: _ =>
        require("@/domain/tableconfig/business/Client.js").default,
      inBillNoDelegeteName: _ =>
        require("@/domain/tableconfig/business/Client.js").default,
      supplierName: _ =>
        require("@/domain/tableconfig/basicdata/SupplierBase.js").default,
      customerName: _ =>
        require("@/domain/tableconfig/basicdata/Customer.js").default,
      inBillCustomerName: _ =>
        require("@/domain/tableconfig/basicdata/Customer.js").default,
      delegeteBillNo: {
        "1": _ =>
          require("@/domain/tableconfig/logistics/Szinstore.js").default,
        "2": _ =>
          require("@/domain/tableconfig/logistics/Szimportinvoice.js").default,
        "3": _ => require("@/domain/tableconfig/commerce/EntrustOrder").default
      },
      assistUnitName: _ =>
        require("@/domain/tableconfig/basicdata/Measurement.js").default,
      carrierName: _ =>
        require("@/domain/tableconfig/basicdata/CarrierBase.js").default,
      inventoryName: _ =>
        require("@/domain/tableconfig/basicdata/MaterielBase.js").default,
      taxNo: _ =>
        require("@/domain/tableconfig/basicdata/CustomsMateriel.js").default,
      brandName: _ =>
        require("@/domain/tableconfig/basicdata/Brand.js").default,
      originPlaceName: _ =>
        require("@/domain/tableconfig/basicdata/Origin.js").default,
      deliveryCustomerName: _ =>
        require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
      departmentName: _ =>
        require("@/domain/tableconfig/system/Department.js").default,
      storekeeperName: _ =>
        require("@/domain/tableconfig/basicdata/EmployeeInfo.js").default,
      unitName: _ =>
        require("@/domain/tableconfig/basicdata/Measurement.js").default,
      baseUnitName: _ =>
        require("@/domain/tableconfig/basicdata/Measurement.js").default,
      inventoryCode: _ => require('@/domain/tableconfig/basicdata/MaterielBase.js').default
    }),
    DialogTitle () {
      return {
        issueTypeName: "事务类型",
        storeOrgName: "库存组织",
        warehouseName: "仓库",
        sourceBillType: (data = {}) => [],
        delegeteName: "委托方",
        supplierName: "供应商",
        customerName: "客户",
        inBillNoDelegeteName: "转入单号委托方",
        inBillCustomerName: "转入单的客户",
        delegeteBillNo: {
          "1": "深圳收货入库单",
          "2": "深圳发货通知单",
          "3": "委托单"
        },
        assistUnitName: "辅助计量单位",
        departmentName: "部门",
        storekeeperName: "仓管员",
        deliveryCustomerName: "送货客户",
        inventoryName: "存货名称",
        carrierName: "承运商",
        materialCode: "基础物料",
        taxNo: "税号",
        brandName: "品牌",
        originPlaceName: "产地",
        unitName: "计量单位",
        baseUnitName: "基本计量单位",
        purchaseOrg: "部门列表"
      };
    },
    DialogSearchCode () {
      return {
        issueTypeName: "transactionCode",
        storeOrgName: "companyCode",
        warehouseName: "warehouseCode",
        sourceBillType: (data = {}) => [],
        delegeteName: "clientNo",
        supplierName: "supplierCode",
        customerName: "customerNo",
        inBillNoDelegeteName: "clientNo",
        inBillCustomerName: "customerNo",
        delegeteBillNo: {
          "1": "billNo",
          "2": "billNo",
          "3": "entrustOrderNo"
        },
        assistUnitName: "measurementCode",
        departmentName: "departmentCode",
        storekeeperName: "employeeInfoCode",
        deliveryCustomerName: "companyCode",
        inventoryName: "materielCode",
        carrierName: "carrierCode",
        materialCode: "materialCode",
        taxNo: "customsMaterielCode",
        brandName: "brandCode",
        originPlaceName: "originCode",
        unitName: "measurementCode",
        baseUnitName: "measurementCode",
        purchaseOrg: "departmentCode"
      };
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),

    // 导出按钮事件
    async handleExport () {
      try {
        this.utools.downFile(`/szoutstore/export/${this.form.data.billNo}`)
      } catch (error) {
        this.$message({
          type: 'error',
          message: '导出失败, 请重试！'
        })
        console.log(error)
      }
    },

    // 表单点选
    async handlerFormConfigClickSearch (params, x, pageData = {}) {
      this.dialogTarget = params;
      let request = new Function();
      let tableConfig = [];
      let title = "";
      let searchCode = "";
      switch (this.dialogTarget) {
        /* 源单据类型的处理 */
        case "delegeteBillNo": {
          request = this.DialogRequest[this.dialogTarget][
            this.form.data.sourceBillType
          ];
          title = this.DialogTitle[params][this.form.data.sourceBillType];
          searchCode = this.DialogTitle[params][this.form.data.sourceBillType];
          tableConfig = this.tableConfigs[this.dialogTarget][
            this.form.data.sourceBillType
          ];
          break;
        }
        default: {
          request = this.DialogRequest[this.dialogTarget];
          title = this.DialogTitle[params];
          searchCode = this.DialogSearchCode[params];
          tableConfig = this.tableConfigs[this.dialogTarget];
          break;
        }
      }
      console.log(this.dialogTarget)
      const WHITE_LIST = [
        'deliveryCustomerName', 'issueTypeName', 'storeOrgName', 'departmentName',
        'supplierName', 'customerName', 'inBillCustomerName', 'inventoryCode',
        'brandName', 'originPlaceName', 'taxNo', 'unitName', 'assistUnitName', 'warehouseName', 'storekeeperName'
      ];
      try {
        const {
          data: { list, count }
        } = await request({ ...pageData, status: WHITE_LIST.includes(this.dialogTarget) ? '2' : '' });
        this.tableDialog = {
          ...this.tableDialog,
          title: title,
          data: list,
          count: count,
          tableConfig: tableConfig(),
          queryBarObj: [
            { label: "编码", moduleBind: searchCode, isInput: true }
          ],
          isshow: true
        };
      } catch (error) {
        utools.alertMessage.call(this, "", "获取数据失败, 请重试");
        console.log(error);
      }
    },
    handleBtnClick () {
      //点击列表弹窗 查询栏按钮事件
      this.handlerFormConfigClickSearch(
        this.dialogTarget,
        null,
        this.tableDialog.ruleForm
      );
      this.tableDialog.ruleForm = {}; // 查询完自动清空查询条件
    },
    //分页
    handlePageChange (paper) {
      this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm, ...paper };
      this.handleBtnClick(); //翻页查询
    },
    // 回调验证规则
    handlerFormVerify ($refs) { },
    // 点选弹窗保存
    async tableDialogPreservation (data) {
      switch (this.dialogTarget) {
        case "delegeteBillNo": {
          /* 当前源单据类型的值 去不同的数  1 为香港收货登记  2 为委托订单*/
          let param = {};
          let searchCode = {};
          let pam = data;
          if (this.form.data.sourceBillType == "1") {
            param.delegeteBillNo = pam.billNo;
            const { data } = await api.getSzinstore(pam.billNo);
            param.delegete = data.delegete;
            param.delegeteName = data.delegeteName;
            param.supplier = data.supplier;
            param.supplierName = data.supplierName;
            param.customer = data.customer;
            param.customerName = data.customerName;
            param.issueTypeName = data.issueTypeName; // 事务类型
            param.issueType = data.issueType;
            param.reportGateType = data.reportGateType; // 报关类型
            param.storeOrg = data.storeOrg; // 库存组织
            param.storeOrgName = data.storeOrgName;
            param.department = data.department; // 部门
            param.departmentName = data.departmentName;
            param.exchangeRate = data.exchangeRate; // 汇率
            param.summary = data.summary; // 摘要
            param.initData = data.initData; // 初始化单据
            param.bizDate = data.bizDate; // 初始化单据
            searchCode = { billNo: data.billNo };
          } else if (this.form.data.sourceBillType == "2") {
            param.delegeteBillNo = pam.billNo;
            const { data } = await api.getImportinvoice(pam.billNo);
            param.delegete = data.delegete;
            param.delegeteName = data.delegeteName;
            param.deliveryAddress = data.receiveAddress
            // param.supplier = data.supplier
            // param.supplierName = data.supplierName
            // param.customer = data.customer
            // param.customerName = data.customerName
            searchCode = { billNo: data.billNo };
          } else if (this.form.data.sourceBillType == "3") {
            param.delegeteBillNo = pam.entrustOrderNo;
            const { data } = await api.searchOneentrustorderData(
              pam.entrustOrderNo
            );
            param.delegete = data.clientCode;
            param.delegeteName = data.clientName;
            param.supplier = data.supplierCode;
            param.supplierName = data.supplierName;
            param.customer = data.clientCode;
            param.customerName = data.clientName;
            param.reportGateType = data.reportGateType;
            searchCode = { entrustOrderNo: data.entrustOrderNo };
          }
          // 主表
          this.form.data = { ...this.form.data, ...param };
          // 子表
          this.getItemTableData(searchCode);
          break;
        }
        case "issueTypeName": {
          this.form.data = {
            ...this.form.data,
            issueTypeName: data.transactionName,
            issueType: data.transactionCode
          };
          break;
        }
        case "storeOrgName": {
          this.form.data = {
            ...this.form.data,
            storeOrgName: data.companyName,
            storeOrg: data.companyCode
          };
          break;
        }
        case "delegeteName": {
          this.form.data = {
            ...this.form.data,
            delegeteName: data.clientName,
            delegete: data.clientNo
          };
          break;
        }
        case "inBillNoDelegeteName": {
          this.form.data = {
            ...this.form.data,
            inBillNoDelegeteName: data.clientName,
            inBillNoDelegete: data.clientNo
          };
          break;
        }
        case "inBillCustomerName": {
          this.form.data = {
            ...this.form.data,
            inBillCustomerName: data.customerName,
            inBillCustomer: data.customerNo
          };
          break;
        }
        case "supplierName": {
          if (this.formDialog.isshow == true) {
            this.formDialog.ruleForm = {
              ...this.formDialog.ruleForm,
              supplierName: data.supplierName,
              supplier: data.supplier
            };
          } else {
            this.form.data = {
              ...this.form.data,
              supplierName: data.supplierName,
              supplier: data.supplier
            };
          }
          break;
        }
        case "storekeeperName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            storekeeperName: data.employeeInfoName,
            storekeeper: data.employeeInfoCode
          };
          break;
        }
        case "customerName": {
          this.form.data = {
            ...this.form.data,
            customerName: data.customerName,
            customer: data.customerNo
          };
          break;
        }
        case "carrierName": {
          this.form.data = {
            ...this.form.data,
            carrierName: data.carrierName,
            carrier: data.carrierCode
          };
          break;
        }
        case "departmentName": {
          this.form.data = {
            ...this.form.data,
            departmentName: data.departmentName,
            department: data.departmentCode
          };
          break;
        }
        case "deliveryCustomerName": {
          this.form.data = {
            ...this.form.data,
            deliveryCustomerName: data.companyName,
            deliveryCustomer: data.companyCode
          };
          break;
        }
        case "warehouseName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            warehouseName: data.warehouseName,
            warehouse: data.warehouseCode
          };
          break;
        }
        // 辅助计量单位
        case "assistUnitName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            assistUnit: data.measurementCode,
            assistUnitName: data.measurementUnit
          };
          break;
        }
        // 表格下新增弹窗的选择
        case "inventoryName":
          // api.getMaterielCustomAll().then(res => {
          //   res.data.list.forEach(element => {
          //     if (element.materielCode == data.materielCode) {
          //       console.log(element)
          //     }
          //   });
          // });
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            inventoryCode: data.materielCode,
            inventoryName: data.tradeName,
            specificationType: data.specificationType
          };
          break;
        case "taxNo":
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            taxNo: data.taxNo
          };
          break;
        case "brandName":
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            brand: data.brandCode,
            brandName: data.brandName
          };
          break;
        case "originPlaceName":
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            originPlace: data.originCode,
            originPlaceName: data.originName
          };
          break;
        // 计量单位
        case "unitName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            unit: data.measurementCode,
            unitName: data.measurementUnit
          };
          break;
        }
        // 计量单位
        case "baseUnitName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            baseUnit: data.measurementCode,
            baseUnitName: data.measurementUnit
          };
          break;
        }
        case 'inventoryCode': {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            customsTradeName: data.tradeName,
            inventoryName: data.tradeName,
            inventoryCode: data.materielCode,
          }
        }
      }
    },

    // 获取子表，香港收货登记的商品信息/委托订单
    async getItemTableData (searchCode) {
      let isRec = this.form.data.sourceBillType === "1"; // 根据 来源单据  判断是否为 深圳收货入库单
      let isSzi = this.form.data.sourceBillType === "2"; // 根据 来源单据  判断是否为 深圳发货通知单
      try {
        const {
          data: { list, count }
        } = await api[
          isRec
            ? "querySzinstoreItem"
            : isSzi
              ? "queryImportinvoiceitem"
              : "getEntrustGoods" //-----
        ](searchCode);
        let tableData = [],
          tableItem = {};
        let fetchConfig = item => ({
          '1': {/* 深圳收货入库单 */
            ...item,
            billNo: this.form.data.billNo,
            delegeteBillNo: this.form.data.delegeteBillNo,
            customsTradeName: item.inventoryName
          },
          '2': { /* 深圳发货通知单 */
            ...item,
            inventoryCode: item.materialCode,
            inventoryName: item.materialName,
            netWeight: item.weight,
            billNo: this.form.data.billNo,
            delegeteBillNo: this.form.data.delegeteBillNo,
            customsTradeName: item.materialName,
            originPlace: item.sourceArea,
            originPlaceName: item.sourceAreaName,
          },
          any: {
            ...item,
            billNo: this.form.data.delegeteBillNo,
            delegeteBillNo: this.form.data.delegeteBillNo,
            inventoryCode: item.arrivalGoodsModel,
            inventoryName: item.arrivalGoodsName,
            tradeName: item.goodsName,
            tradeCode: item.goodsCode,
            specificationType: item.orderModel,
            quantity: item.sellerQuantity,
            receiveQuantity: item.sellerQuantity,
            harvestQuantity: item.sellerQuantity,
            originPlace: item.sourceArea,
            originPlaceName: item.sourceAreaName,
            unit: item.sellerUnit,
            unitName: item.sellerUnitName,
            customsTradeName: item.arrivalGoodsName
          }
        });
        const type = this.form.data.sourceBillType, isAny = type !== '1' && type !== '2';
        tableData = list.map(item => {
          const obj = fetchConfig(item), data = isAny ? obj['any'] : obj[type];
          return data;
        })
        /*  list.map(item => {
           tableItem = isRec
             ? {
               ...item,
               billNo: this.form.data.billNo,
               delegeteBillNo: this.form.data.delegeteBillNo
             }
             : isSzi
               ? {
                 ...item,
                 billNo: this.form.data.billNo,
                 delegeteBillNo: this.form.data.delegeteBillNo
               }
               : {
                 ...item,
                 billNo: this.form.data.delegeteBillNo,
                 delegeteBillNo: this.form.data.delegeteBillNo,
                 inventoryCode: item.arrivalGoodsModel,
                 inventoryName: item.arrivalGoodsName,
                 tradeName: item.goodsName,
                 tradeCode: item.goodsCode,
                 specificationType: item.orderModel,
                 quantity: item.sellerQuantity,
                 receiveQuantity: item.sellerQuantity,
                 harvestQuantity: item.sellerQuantity,
                 originPlace: item.sourceArea,
                 originPlaceName: item.sourceAreaName,
                 unit: item.sellerUnit,
                 unitName: item.sellerUnitName
               };
           tableData.push(tableItem);
         }); */
        this.table = {
          ...this.table,
          tableData: tableData,
          isshow: true,
          pageCount: count
        };
      } catch (error) {
        console.log(error);
      }
    },
    // 保存
    async handlePreserve () {
      if (
        this.form.data.sourceBillType != "4" &&
        this.form.data.delegeteBillNo == ""
      ) {
        this.$message.warning("请选择单据");
        return;
      }
      this.isLoading = true;
      try {
        if (this.status == "add") {
          this.form.data.szoutstoreitemList = this.table.tableData;
          var data = await api.saveSzoutstore(this.form.data);
          this.form.data = { ...this.form.data, status: "1" };
          // var data = await api.saveSzoutstore({szoutstoreitemList: this.table.tableData,szoutstore: this.form.data});
        } else {
          var data = await api.updateHkoutstore(this.form.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
      if (data) {
        data && this.$message.success(`保存成功`);
        this.status === "add" &&
          ((this.status = "update" && this.initTableData()),
            // 如果是 修改状态，把源单据禁用
            utools.setFormConfig(this.form.formConfig, [
              {
                key: "sourceBillType",
                disabled: true
              },
              {
                key: "delegeteBillNo",
                disabled: true,
                btn: false
              }
            ]),
            (this.form.formConfig = [...this.form.formConfig]));
      } else {
        this.$message.success(`保存失败`);
      }
    },

    /**
     * @method handlerTableBtnClick 表格按钮 当前点击对象的类型
     * @param { String } type 当前点击类型
     * @param {} row 点击的当条数据
     */
    async handlerTableBtnClick (type) {
      api.initSelect(this.formDialog.formConfig);
      switch (type) {
        case "add":
          this.zbcz = "add";
          this.formDialog = {
            ...this.formDialog,
            ruleForm: { billNo: this.form.data.billNo },
            isshow: true
          };
          break;
        case "update":
          utools.judgeNullObj(this.clickRowData)
            ? ((this.zbcz = "update"),
              (this.formDialog = {
                ...this.formDialog,
                ruleForm: this.clickRowData,
                isshow: true
              }))
            : utools.alertMessage.call(this, "", "请选择一条数据");
          break;
        case "delete":
          utools.judgeNullObj(this.clickRowData)
            ? ((this.zbcz = "delete"), this.handlerTableFormPreservation())
            : utools.alertMessage.call(this, "", "请选择一条数据");
          break;
      }
    },
    // 子表单弹窗保存
    async handlerTableFormPreservation () {
      if (
        this.zbcz != "delete" &&
        !utools.judgeNullObj(this.formDialog.ruleForm)
      ) {
        utools.alertMessage.call(this, "", "请输入内容");
        return;
      }
      let form = this.formDialog.ruleForm;
      // 添加
      if (this.zbcz == "add") {
        let { data } = await api.getChildCode();
        form.itemCode = data;
        this.table.tableData.push(form);
        if (this.status == "update") {
          const { data } = await api.saveSzoutstoreitem(form);
          data && this.initTableData();
        }
        this.$message.success("操作成功");
      }
      // 修改
      if (this.zbcz == "update") {
        const dataIndex = this.table.tableData.findIndex(
          item => item.itemCode == this.clickRowData.itemCode
        );
        if (dataIndex != -1) {
          this.table.tableData.splice(dataIndex, 1, form);
          if (this.status == "update") {
            const { data } = await api.updateSzoutstoreitem(form);
            data && this.initTableData();
          }
          this.$message.success("操作成功");
        } else {
          this.$message.warning("操作失败");
        }
      }
      // 删除
      if (this.zbcz == "delete") {
        const dataIndex = this.table.tableData.findIndex(
          item => item.itemCode == this.clickRowData.itemCode
        );
        if (dataIndex != -1) {
          this.table.tableData.splice(dataIndex, 1);
          if (this.status == "update") {
            const { data } = await api.removeSzoutstoreitem(
              this.clickRowData.itemCode
            );
            data && this.initTableData();
          }
          this.$message.success("操作成功");
        } else {
          this.$message.warning("操作失败");
        }
      }
      this.formDialog.isshow = false;
    },
    // 切换分页
    async initTableData (page = {}) {
      try {
        const {
          data: { list, count }
        } = await api.querySzoutstoreitem({
          ...page,
          billNo: this.form.data.billNo
        });
        (this.table.tableData = list), (this.pageCount = count);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取code
    async getCode () {
      try {
        const { data } = await api.getSzoutstoreCode(); //----
        this.form.data = { ...this.form.data, billNo: data };
      } catch (error) {
        console.log(error);
      }
    },

    // 关闭弹窗
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
    },
    // 关闭电选弹窗
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    // f返回
    handlebackspacing () {
      this.$router.push({
        path: "/M0710" //-----
      });
    }
  }
};
</script>
<style scoped lang="less">
.szoutstore-form,
.AddCreditBox {
  .btn-right {
    text-align: right;
    margin: 25px 0 0 0;
    & > button {
      margin-left: 30px !important;
    }
  }
}
</style>
