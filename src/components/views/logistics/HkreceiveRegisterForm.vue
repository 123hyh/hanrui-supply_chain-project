<template>
  <div class="AddCreditBox hkreceive-register-form">
    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data'
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- 输入框 -->
    <form-components
      :formModel='form.data'
      :formConfig='form.formConfig'
      @handlerSearchClick='handlerFormConfigClickSearch'
    ></form-components>

    <!-- 分割条 -->
    <div class="cut-off-rule">基本信息</div>
    <!-- 表格 -->
    <section v-show="table.isshow">
      <div
        class="mb-10"
        v-show="+(form.data.status||0) <= 1"
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
        :count='table.pageCount'
        @rowClickData='TableClickRowData'
        @handlePageChange='initTableData'
      ></table-component>

    </section>

    <!-- 表格弹窗 -->
    <popover-component
      :isShowPopover="tableDialog.isshow"
      :itemName="tableDialog.itemName"
      :formConfig="tableDialog.queryBarObj"
      :btnObj="tableDialog.btnObj"
      :ruleForm="tableDialog.ruleForm"
      :popoverList="tableDialog.data"
      :popoverListKey="tableDialog.tableConfig"
      :count="tableDialog.count"
      @changeisShowPopover="closeTableDialog"
      @handlePageChange="dialogPageChange"
      @handlerSubPreservation="tableDialogPreservation"
      @handleBtnClickType="handleTableBtnQuery"
    ></popover-component>
    <!-- 表单弹窗 -->
    <popover-component
      itemName="香港收货登记-商品信息"
      :isShowPopover="formDialog.isshow"
      :popoverType="'form'"
      :formData="formDialog"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
    ></popover-component>
    <div></div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
// 公共方法
import api from "@/assets/js/appHelper.js";
import utools from "@/domain/common/utools.js";

// 公共组件
import FormComponents from '@/components/common/form-template/FormComponent.vue'
import PaginationComponent from "@/components/common/Pagination.vue";
import PopoverComponent from "@/components/common/Popover.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

// 注册表
import formConfig from "@/domain/formconfig/logistics/HkreceiveRegister";
import tableConfig from "@/domain/tableconfig/logistics/HkreceiveRegisterItem.js";
import itemFormConfig from "@/domain/formconfig/logistics/HkreceiveRegisterItem.js";

export default {
  watch: {
    "form.data.sourceBillType": {
      handler (cur, pre) {
        if (cur === pre) return;
        utools.setFormConfig(this.form.formConfig, [
          {
            key: "delegeteBillNo",
            name:
              cur === "1" ? "委托单" : cur === "2" ? "卖方交(发)货" : "其他",
            btn: cur !== "3" && this.status == "add"
          },
          {
            key: "delegeteName",
            btn: cur === "3"
          },
          {
            key: "supplierName",
            btn: cur === "3"
          },
          {
            key: "customerName",
            btn: cur === "3"
          }
        ]);
        for (let item of this.table.tableConfig) {
          if (item.prop === "delegeteBillNo") {
            item.label =
              cur === "1" ? "委托单" : cur === "2" ? "卖方交(发)货" : "其他";
          }
        }
        utools.setFormConfig(this.formDialog.formConfig, [
          {
            key: "delegeteBillNo",
            name: cur === "1" ? "委托单" : cur === "2" ? "卖方交(发)货" : "其他"
          }
        ]);
        if (this.status === "update") {
          return;
        }
        let pam = {
          delegete: "",
          delegeteName: "",
          supplier: "",
          supplierName: "",
          customer: "",
          customerName: ""
        };
        this.form.data = { ...this.form.data, delegeteBillNo: "", ...pam };
        this.table.tableData = [];
        if (cur === "1" || cur === "2") {
          this.addcz = false;
        } else {
          this.addcz = true;
        }
        // 3 位 其他
        // if (cur === '3') {
        //   //--------
        //   this.isAddzb = false
        // } else {
        //   this.isAddzb = true
        // }
        // this.table.tableData = [];
        // pre && (this.form.data.delegeteBillNo = "");
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    DialogTitle () {
      return {
        warehouseName: "仓库",
        delegeteName: "委托方",
        issueTypeName: "事务类型",
        storeOrgName: "库存组织",
        supplierName: "供应商",
        customerName: "客户",
        delegeteBillNo: {
          /* 源单据类型的选择 为 1（委托单）后  委托单接口，为 2（卖方交发货）后  卖方交发货  table的config文件如同*/
          "1": "委托单",
          "2": "卖方交发货"
        },
        materialCode: "物料",
        taxNo: "税号",
        brandName: "品牌",
        originPlaceName: "产地",
        unitName: "计量单位"
      };
    },
    DialogRequest () {
      return {
        warehouseName: (data = {}) => api.getWarehouseList(data),
        delegeteName: (data = {}) => api.queryclientSearch(data),
        issueTypeName: (data = {}) => api.getTransactionTypeList(data),
        storeOrgName: (data = {}) => api.getCreditCompanyNameData(data),
        supplierName: (data = {}) => api.querysupplierbaseSearch(data),
        customerName: (data = {}) => api.getCustomerList(data),
        delegeteBillNo: {
          /* 源单据类型的选择 为 1（委托单）后  委托单接口，为 2（卖方交发货）后  卖方交发货  table的config文件如同*/
          "1": (data = {}) => api.queryentrustorderSearch(data),
          "2": (data = {}) => api.sellerReceiveSearch(data)
        },
        materialCode: (data = {}) => api.getMaterielBaseList(data),
        taxNo: (data = {}) => api.getCustomsMaterielList(data),
        brandName: (data = {}) => api.getBrandList(data),
        originPlaceName: (data = {}) => api.getOriginList(data),
        unitName: (data = {}) => api.getMeasurement(data)
      };
    },
    tableConfigs: () => ({
      warehouseName: _ =>
        require("@/domain/tableconfig/basicdata/Warehouse.js").default,
      delegeteName: _ =>
        require("@/domain/tableconfig/business/Client.js").default,
      issueTypeName: _ =>
        require("@/domain/tableconfig/basicdata/TransactionType.js").default,
      storeOrgName: _ =>
        require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
      supplierName: _ =>
        require("@/domain/tableconfig/basicdata/SupplierBase.js").default,
      customerName: _ =>
        require("@/domain/tableconfig/basicdata/Customer.js").default,
      delegeteBillNo: {
        "1": _ => require("@/domain/tableconfig/commerce/EntrustOrder").default,
        "2": _ =>
          require("@/domain/tableconfig/business/SellerReceiveGoods").default
      },
      materialCode: _ =>
        require("@/domain/tableconfig/basicdata/MaterielBase.js").default,
      taxNo: _ =>
        require("@/domain/tableconfig/basicdata/CustomsMateriel.js").default,
      brandName: _ =>
        require("@/domain/tableconfig/basicdata/Brand.js").default,
      originPlaceName: _ =>
        require("@/domain/tableconfig/basicdata/Origin.js").default,
      unitName: _ =>
        require("@/domain/tableconfig/basicdata/Measurement.js").default
    })
  },
  components: {
    TableComponent,
    PaginationComponent,
    PopoverComponent,
    FormComponents
  },
  data () {
    return {
      addcz: false,
      isAddzb: true,
      tableBtnType: "",
      dialogTarget: "",
      status: "update",
      isLoading: false,
      form: {
        data: {},
        formConfig: utools.cloneObj(formConfig)
      },
      formDialog: {
        isshow: false,
        ruleForm: {},
        formConfig: utools.cloneObj(itemFormConfig)
      },
      table: {
        isshow: true,
        tableData: [],
        tableConfig,
        pageCount: 0
      },
      pageCount: 0,
      tableDialog: {
        isshow: false,
        itemName: '',
        ruleForm: { tenantId: "hfy" },
        count: 0,
        title: "",
        queryBarObj: [{ label: "编码", moduleBind: "code", isInput: true }], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        data: [],
        tableConfig: []
      },
      clickRowData: {},
      tableTopBtn: ""
    };
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),

    dialogPageChange (page) {
      this.handleTableBtnQuery(page);
    },

    async handleTableBtnQuery (page = {}) {
      let queryData = {};
      let obj = {
        issueTypeName: "transactionCode",
        storeOrgName: "companyCode",
        warehouseName: "warehouseCode",
        delegeteBillNo: {
          "1": "clientCode",
          "2": "billNo"
        },
        materialCode: "materielCode",
        taxNo: "customsMaterielCode",
        brandName: "brandCode",
        originPlaceName: "originCode",
        unitName: "measurementCode"
      };
      this.tableDialog.ruleForm && this.dialogTarget !== "delegeteBillNo"
        ? (queryData[obj[this.dialogTarget]] = this.tableDialog.ruleForm[
          "code"
        ])
        : (queryData[
          obj[this.dialogTarget][this.form.data.sourceBillType]
        ] = this.tableDialog.ruleForm["code"]);
      if (typeof page === "object") {
        queryData = { ...queryData, ...page };
      }
      try {
        const {
          data: { list, count }
        } = await (this.dialogTarget === "delegeteBillNo"
          ? this.DialogRequest[this.dialogTarget][
            this.form.data.sourceBillType
          ](queryData)
          : this.DialogRequest[this.dialogTarget](queryData));

        this.tableDialog = { ...this.tableDialog, data: list, count }
      } catch (error) {
        console.log(error);
      }
      this.tableDialog.isshow = true;
    },
    initFormData () {
      const { formData = {}, status, itemTable = {} } = this.getActivePathData(
        this.$route.path
      );
      utools.judgeNullObj(itemTable) && (this.table = itemTable);
      formData && (this.form.data = formData);
      this.status = status;
      if (status === "add") {
        if (!this.form.data.billNo) {
          this.getHkreceiveRegisterNo();
        }
        this.form.data = {
          ...this.form.data,
          sourceBillType: "1",
          billStatus: "1"
        }; // 源单据类型默认为委托单
      } else {
        this.form.data = formData;
        this.initTableData();
      }
      utools.setFormConfig(this.form.formConfig, [
        { key: "sourceBillType", disabled: isAdd ? false : true },
        { key: "delegeteBillNo", btn: !isAdd ? false : true }
      ]);
    },
    async initTableData (page = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getHkreceiveRegisterItemList({
          ...page,
          billNo: this.form.data.billNo
        });
        this.table.tableData = list, this.pageCount = count;
      } catch (error) {
        console.log(error);
      }
    },
    async handlerFormConfigClickSearch (params) {
      this.tableDialog.ruleForm = {};
      this.dialogTarget = params;
      const WHITE_LIST = ['issueTypeName', 'storeOrgName', 'warehouseName', 'materialCode', 'brandName', 'originPlaceName', 'unitName', 'taxNo']; // 白名单
      let status = WHITE_LIST.includes(this.dialogTarget) ? '2' : ''
      try {
        // 源单据类型切换 的处理
        const IS_DELEG = params === "delegeteBillNo";
        const {
          data: { list, count }
        } = await (IS_DELEG
          ? this.DialogRequest[params][this.form.data.sourceBillType]
          : this.DialogRequest[params])({ status });
        this.tableDialog.data = list;

        // 匹配表格标题
        this.tableDialog.itemName =
          IS_DELEG
            ? this.DialogTitle[params][this.form.data.sourceBillType]
            : this.DialogTitle[params];
        console.log(this.tableDialog.itemName);

        // 匹配表格配置
        this.tableDialog.tableConfig =
          IS_DELEG
            ? this.tableConfigs[params][this.form.data.sourceBillType]()
            : this.tableConfigs[params]();
        this.tableDialog.isshow = true,
          this.tableDialog.count = count;
      } catch (error) {
        utools.alertMessage.bind(this)("", "获取数据失败, 请重试");
        console.log(error);
      }
    },
    TableClickRowData (data) {
      this.clickRowData = data;
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
    },
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    async tableDialogPreservation (data) {
      let params = {};
      switch (this.dialogTarget) {
        case "warehouseName":
          params = {
            warehouse: data.warehouseCode,
            warehouseName: data.warehouseName
          };
          break;
        case "issueTypeName":
          params = {
            issueType: data.transactionCode,
            issueTypeName: data.transactionName
          };
          break;
        case "storeOrgName":
          params = {
            storeOrgName: data.companyName,
            storeOrg: data.companyCode
          };
          break;
        case "delegeteName":
          params = { delegeteName: data.clientName, delegete: data.clientNo };
          break;
        case "supplierName":
          params = {
            supplierName: data.supplierName,
            supplier: data.supplierCode
          };
          break;
        case "customerName":
          params = {
            customerName: data.customerName,
            customer: data.customerNo
          };
          break;
        // 表格下新增弹窗的选择
        case "materialCode":
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            materialCode: data.materielCode,
            materialName: data.tradeName,
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
        // 源单据类型的 切换后选择表格数据
        case "delegeteBillNo": {
          let pam = data
          if (this.form.data.sourceBillType === "1") {
            // 1 为委托单
            this.form.data = {
              ...this.form.data,
              delegeteBillNo: data.entrustOrderNo,
              delegeteName: data.clientName,
              delegete: data.clientCode,
              supplierName: data.supplierName,
              supplier: data.supplierCode,
              customerName: data.customerName,
              customer: data.customerCode,
              reportGateType: data.reportGateType
            };
            // 子
            this.getEntrustGoods(data.entrustOrderNo);
          } else if (this.form.data.sourceBillType === "2") {
            const { data } = await api.searchOneentrustorderData(pam.delegeteBillNo);
            // 2 为 卖方交发提货
            this.form.data = {
              ...this.form.data,
              delegeteBillNo: pam.billNo,
              delegete: data.clientCode,
              delegeteName: data.clientName,
              supplier: data.supplierCode,
              supplierName: data.supplierName,
              customer: data.customerCode,
              customerName: data.customerName,
            };
            this.querySellerLogisticsInfo(pam.billNo);
          }
          break;
        }
        // 计量单位
        case "unitName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            unit: data.measurementCode,
            unitName: data.measurementUnit
          };
          break;
        }
      }
      this.form.data = { ...this.form.data, ...params };
    },

    async handlerTableBtnClick (type) {
      api.initSelect(this.formDialog.formConfig);
      switch (type) {
        case "add":
          this.zbcz = "add";
          this.formDialog = {
            ...this.formDialog,
            ruleForm: { receiptOrderCode: this.form.data.receiptOrderCode },
            isshow: true
          };
          break;
        case "update":
          utools.judgeNullObj(this.clickRowData)
            ? ((this.zbcz = "update"),
              (this.formDialog = {
                ...this.formDialog,
                ruleForm: this.utools.cloneObj(this.clickRowData),
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
      if (this.zbcz != "delete" && !this.formDialog.ruleForm.materialCode) {
        utools.alertMessage.call(this, "", "请选择物料编码");
        return;
      }
      let form = this.formDialog.ruleForm;
      // 添加
      if (this.zbcz == "add") {
        let { data } = await api.getChildCode();
        form.itemCode = data;
        form.billNo = this.form.data.billNo;
        this.table.tableData.push(form);
        if (this.status == "update") {
          const { data } = await api.changeHkreceiveRegisterItemList(form);
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
            const { data } = await api.changeHkreceiveRegisterItemList(
              form,
              "PUT"
            );
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
            const { data } = await api.deleteHkreceiveRegisterItem(
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
    async handlePreserve () {
      if (
        this.form.data.sourceBillType != "3" &&
        this.form.data.delegeteBillNo == ""
      ) {
        this.$message.warning("请选择单据");
        return;
      }
      this.isLoading = true;
      let code = 0;
      let isAdd = this.status === "add";
      try {
        const { data, status } = await api.changeHkreceiveRegisterData(
          // 新增状态 参数不同 调用的接口也不同
          isAdd
            ? {
              hkreceiveRegister: this.form.data,
              hkreceiveRegisterItems: this.table.tableData
            }
            : this.form.data,
          isAdd ? "POST" : "PUT"
        );
        this.form.data = { ...this.form.data, status: data.status || "1" };
        code = status;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
      utools.alertMessage.bind(this)(code);
      code === 200 &&
        ((this.status = "update"),
          this.initTableData(),
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
    },
    handlebackspacing () {
      this.$router.push({
        path: "/M0501"
      });
    },
    async getHkreceiveRegisterNo () {
      try {
        const { data } = await api.getHkreceiveRegisterNo();
        this.$set(this.form.data, 'billNo', data)
      } catch (error) {
        console.log(error);
      }
    },
    async getEntrustGoods (entrustOrderNo) {
      // 1 为委托单
      try {
        const {
          data: { list, count }
        } = await api.getEntrustGoods({ entrustOrderNo });
        this.table.tableData = list.map(item => {
          delete item.entrustOrderNo;
          const {
            goodsCode: materialCode,
            goodsName: materialName,
            arrivalGoodsModel: specificationType,
            sourceArea: originPlace,
            sellerQuantity: quantity,
            sellerUnit: unit,
          } = item;
          return {
            ...item,
            billNo: this.form.data.billNo,
            delegeteBillNo: this.form.data.delegeteBillNo,
            materialCode,
            materialName,
            specificationType,
            originPlace,
            quantity,
            unit,
            originPlace: item.sourceArea,
            originPlaceName: item.sourceAreaName,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    async querySellerLogisticsInfo (billNo) {
      try {
        const {
          data: { list, count }
        } = await api.querySellerLogisticsInfo({ billNo: billNo });
        this.table.tableData = list.map(item => {
          return {
            ...item,
            billNo: this.form.data.billNo,
            delegeteBillNo: this.form.data.delegeteBillNo,
            materialCode: item.inventoryCode,
            materialName: item.inventoryName,
            sellerUnitName: item.unitName
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
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
    if (isAdd) {
      this.getHkreceiveRegisterNo(),
        this.form.data = {
          ...this.form.data,
          sourceBillType: "1",
          billStatus: "1",
          receiveStatus: "2"
        };
      const DATE = new Date();
      this.$set(this.form.data, 'scheduleDeliveryTime', `${DATE.getFullYear()}-${DATE.getMonth() + 1}-${DATE.getDate()} 00:00:00`);
    } else {
      this.initTableData()
    }
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
    if (this.form.data.sourceBillType == "3") {
      this.addcz = true;
    }
  },
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
  }
};
</script>
<style  lang="less">
.hkreceive-register-form,
.AddCreditBox {
  .title {
    display: flex;
    align-items: center;

    > h5 {
      flex: 0.5;
    }

    &::after {
      content: "";
      display: block;
      flex: 9;
      border-bottom: 1px solid #000;
    }

    & {
      margin-top: 1rem;
    }
  }
  .handleTableHeight {
    height: 48vh;
  }

  .btnBottom {
    margin-bottom: 10px;
  }
}
</style>
