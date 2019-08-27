<template>
  <div>
    <!-- 操作按钮 -->
    <preserve-btn
      :form="form.data"
      :isLoading="form.isLoading"
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
    ></preserve-btn>
    <!-- 表单 -->
    <form-component
      :inputKey="form.config"
      :formModel="form.data"
      @handlerFormConfigClickSearch="handlerSearchClick"
    ></form-component>
    <!-- 页签 -->
    <div style="margin:20px 0 20px 0">
      <el-tabs
        v-model="active"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="项目明细"
          name="chargeinformation"
        ></el-tab-pane>
        <el-tab-pane
          label="物料信息"
          name="materialinformation"
        ></el-tab-pane>
      </el-tabs>
      <!-- <div v-show="+form.data.status<=1">
        <el-button @click="openItemdetail()">修改</el-button>
        <el-button @click="deleteItemdetail()">删除</el-button>
      </div>-->
    </div>
    <!-- 表格 -->
    <table-component
      :isSubTable="true"
      :tableDataKey="table.config"
      :tableData="tableDataList"
      @TableClickRowData="TableClickRowData"
    ></table-component>
    <!-- 分页 -->
    <pagination
      ref="pagination"
      :count="table.data.count"
      @handlePageChange="handleChange"
    ></pagination>
    <!-- 表单弹窗 -->
    <popover-component
      width="1100px"
      :popoverType="'form'"
      :isShowPopover="formDialog.isshow"
      :itemName="formDialog.itemName"
      :formData="formDialog"
      @handlerFormConfigClickSearch="handlerSearchClick"
      @formClickPreservation="updateItemdetail"
      @changeisShowPopover="closeFormDialog"
    ></popover-component>
    <!-- 表格弹窗 -->
    <popover-component
      :isShowPopover="tableDialog.isshow"
      :currencySelectInputKey="tableDialog.itemKey"
      :itemName="tableDialog.itemName"
      :formConfig="tableDialog.queryConfig"
      :btnObj="tableDialog.btnObj"
      :popoverListKey="tableDialog.config"
      :popoverList="tableDialog.data.list"
      :count="tableDialog.data.count"
      :ruleForm="tableDialog.ruleForm"
      @handleBtnClickType="handleTableDialogClick"
      @handlePageChange="handlePageChange"
      @handlerSubPreservation="tableDialogPreservation"
      @changeisShowPopover="closeTableDialog"
    ></popover-component>
  </div>
</template>
<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import TableComponent from "@/components/common/TabTable.vue";
import Pagination from "@/components/common/Pagination";
import PopoverComponent from "@/components/common/Popover.vue";
import api from "@/assets/js/appHelper.js";
// 表单表格
import entities from "@/domain/entities/finance/Receivesettlement";
import formConfig from "@/domain/formconfig/finance/Receivesettlement";
// 子表
import entitiesOne from "@/domain/entities/finance/ReceivesettlementMateriel";
import tableConfigOne from "@/domain/tableconfig/finance/ReceivesettlementMateriel";
import formConfigOne from "@/domain/formconfig/finance/ReceivesettlementMateriel";
import entitiesTwo from "@/domain/entities/finance/ReceivesettlementFee";
import tableConfigTwo from "@/domain/tableconfig/finance/ReceivesettlementFee";
import formConfigTwo from "@/domain/formconfig/finance/ReceivesettlementFee";
// 弹窗
import entrustOrder from "@/domain/tableconfig/commerce/EntrustOrder.js";
import SupplierBase from "@/domain/tableconfig/basicdata/SupplierBase.js";
import Client from "@/domain/tableconfig/business/Client.js";
import Customer from "@/domain/tableconfig/basicdata/Customer.js";
import CompanyInfo from "@/domain/tableconfig/basicdata/CompanyInfo.js";
import Department from "@/domain/tableconfig/system/Department.js";
import taxTypeName from "@/domain/tableconfig/basicdata/TaxCategory.js";
import FinanceProject from "@/domain/tableconfig/basicdata/FinanceProject";

import { mapMutations, mapGetters } from "vuex";
import { async, Promise } from "q";
export default {
  components: {
    FormComponent,
    TableComponent,
    Pagination,
    PopoverComponent
  },
  data: () => ({
    status: "",
    writeback: "",
    form: {
      config: formConfig,
      data: new entities(),
      isLoading: false
    },
    active: "chargeinformation",
    tableOne: {
      config: tableConfigOne,
      data: {
        alllist: [],
        count: 0
      },
      ruleForm: {},
      rowData: {}
    },
    tableTwo: {
      config: tableConfigTwo,
      data: {
        alllist: [],
        count: 0
      },
      ruleForm: {},
      rowData: {}
    },
    formDialogOne: {
      formConfig: formConfigOne,
      ruleForm: new entitiesOne(),
      itemName: "物料信息",
      isshow: false
    },
    formDialogTwo: {
      formConfig: formConfigTwo,
      ruleForm: new entitiesTwo(),
      itemName: "计费信息",
      isshow: false
    },
    tableDialog: {
      config: [],
      data: {
        list: [],
        count: 0
      },
      itemKey: "",
      itemName: "",
      queryConfig: [],
      btnObj: [{ type: "search", label: "查询" }],
      ruleForm: {},
      isshow: false
    }
  }),
  computed: {
    ...mapGetters(["getActivePathData"]),
    table () {
      if (this.active == "materialinformation") {
        return this.tableOne;
      } else {
        return this.tableTwo;
      }
    },
    formDialog () {
      if (this.active == "materialinformation") {
        return this.formDialogOne;
      } else {
        return this.formDialogTwo;
      }
    },
    tableDataList () {
      let pageIndex = this.table.ruleForm.pageIndex || 1;
      let pageSize = this.table.ruleForm.pageSize || 10;
      let start = (pageIndex - 1) * pageSize;
      let end = pageIndex * pageSize;
      return this.table.data.alllist.slice(start, end) || [];
    },
    countSettleAmount () {
      return (this.formDialog.ruleForm.countSettleAmount =
        this.formDialog.ruleForm.sourceAmount *
        this.formDialog.ruleForm.settleRate || "");
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 保存主表
    async handlePreserve () {
      this.isLoading = true;
      try {
        if (this.status == "update") {
          const { data, status } = await api.editreceivesettlementData(
            this.form.data
          );
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          this.form.data.receiveSettlementMaterielList = this.tableOne.data.alllist;
          this.form.data.receiveSettlementFeeList = this.tableTwo.data.alllist;
          const { data, status } = await api.addreceivesettlementData(
            this.form.data
          );
          if (status) {
            this.status = "update";
            this.$message.success("操作成功");
            this.getItemdetail(); //重新获取子表编码
          }
        }
      } catch (e) {
        this.$message.error("操作失败，请重试！");
      } finally {
        this.isLoading = false;
      }
    },

    // 返回
    handlebackspacing () {
      this.$router.push("M0805");
    },

    // 覆盖（带出）子表
    async writeItemdetail () {
      try {
        const /* { data, status } */[
          { data },
          { data: project }
        ] = await Promise.all([
          api.getEntrustGoods({
            entrustOrderNo: this.form.data.delegeteBillNo,
            pageIndex: null,
            pageSize: null
          }),
          api.getReceiveSettlementProject({
            billNo: this.form.data.billNo,
            delegeteBillNo: this.form.data.delegeteBillNo
          })
        ]);
        // 付款申请的受托方付款列表
        data.list.map(item => {
          item.billNo = this.form.data.billNo;
          item.delegeteBillNo = this.form.data.delegeteBillNo;
          item.materielName = item.arrivalGoodsName;
          item.materielCode = item.orderModel;
          item.materielType = item.arrivalGoodsModel;
          item.measurement = item.sellerUnitName;
          item.quantity = item.sellerQuantity;
          item.unitPrice = item.sellerPrice;
          item.currency = item.sellerCurrency;
          item.actualUnitPrice = item.sellerPrice;
          item.amount = item.sellerGoodsValue;
          item.tariff = item.customTaxAmount;
          item.paymentType = this.form.data.paymentType;
        });

        this.tableOne = {
          ...this.tableOne,
          data: { alllist: data.list, count: data.count }
        };
        this.tableTwo = {
          ...this.tableTwo,
          data: { alllist: project, count: project.count }
        };
      } catch (e) {
        this.$message.error("查询失败，请重试");
        return;
      }
      if (this.status == "update") {
        try {
          const data = await Promise.all([
            api.batchreceivesettlementMaterielData(this.tableOne.data.alllist),
            api.batchreceivesettlementFeeData(this.tableTwo.data.alllist)
          ]);
        } catch (e) {
          this.$message.error("修改失败，请重试");
          return;
        }
        this.getItemdetail();
      }
      this.table.rowData = {};
      this.$message.success("添加成功");
    },

    // 查询子表
    async getItemdetail () {
      let rule = {
        billNo: this.form.data.billNo,
        pageIndex: null,
        pageSize: null
      };
      let getListOne = async _ => {
        const { data, status } = await api.queryreceivesettlementMaterielSearch(
          rule
        );
        this.tableOne.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.tableOne.data.count = data.count;
      };
      let getListTow = async _ => {
        const { data: { list = [], count = 0 }, status } = await api.queryreceivesettlementFeeSearch(
          rule
        );
        this.tableTwo.data.alllist = JSON.parse(JSON.stringify(list));
        this.tableTwo.data.count = count;
        // 如果来源是报关计划，按照委托订单的协议方案的受托方计费项目来显示项目明细
        let IS_BGJH = list.some(item => item.sourceBill.slice(0, 4) === 'BGJH');
        IS_BGJH && this.handleFilterProject()
      };
      try {
        await Promise.all([getListTow(), getListOne()]);
        this.table.data = { ...this.table.data };
      } catch (e) {
        this.$message.error("查询失败");
      }
    },

    // 过滤 计费项目 显示项目明细表格数据
    async handleFilterProject () {
      try {
        const { data: { agreementSolutionCode, agreementCode } } = await api.searchOneentrustorderData(this.form.data.delegeteBillNo);
        if (!(agreementSolutionCode && agreementCode)) return;

        var params = { solutionNo: agreementSolutionCode, agreementNo: agreementCode, pageSize: Infinity }
        const { data: { list, count } } = await api.getAgreementclinetPage(params);
    
       /*  const code = list.map(item=> item.chargeItemCode);
        this.tableTwo.data.alllist = this.tableTwo.data.alllist.filter(item => {
          if(item.sourceBill.slice(0, 4) === 'BGJH'){
            if(code[0] === item.feeProject){
              debugger
            }
          }else{
            return item
          }
        }) */
      } catch (error) {
        console.log(error)
      }
    },

    // 切换子表
    handleClick () {
      this.$refs["pagination"].currentPage = 1;
      this.table.ruleForm.pageIndex = 1;
      this.table.data = { ...this.table.data };
    },
    // 表格点击行
    TableClickRowData (row) {
      this.table.rowData = row;
    },
    // 表格双击行
    handleDbclickTable (data) {
      this.TableClickRowData(data);
      this.openItemdetail();
    },
    // 打开子表操作
    openItemdetail () {
      if (!this.table.rowData.itemCode) {
        this.$message.warning("请选择一条数据");
        return;
      }
      this.formDialog.ruleForm = this.table.rowData;
      this.formDialog.isshow = true;
    },
    // 关闭子表操作
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    // 增加子表
    async addItemdetail (data) {
      this.table.data.alllist.splice(0, 0, data);
      this.table.data.count++;
      if (this.status == "update") {
        try {
          const { data, status } =
            this.active == "materialinformation"
              ? await api.addreceivesettlementMaterielData(data)
              : await api.addreceivesettlementFeeData(data);
        } catch (e) {
          this.$message.error("增加失败，请重试");
          return;
        }
        this.getItemdetail();
      }
      this.table.rowData = {};
      this.formDialog.isshow = false;
      this.$message.success("增加成功");
    },
    // 修改子表
    async updateItemdetail () {
      const dataIndex = this.table.data.alllist.findIndex(
        item => item.itemCode == this.table.rowData.itemCode
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1, this.formDialog.ruleForm);
        if (this.status == "update") {
          try {
            const { data, status } =
              this.active == "materialinformation"
                ? await api.editreceivesettlementMaterielData(
                  this.formDialog.ruleForm
                )
                : await api.editreceivesettlementFeeData(
                  this.formDialog.ruleForm
                );
          } catch (e) {
            this.$message.error("修改失败，请重试");
            return;
          }
          this.getItemdetail();
        }
        this.formDialog.isshow = false;
        this.$message.success("修改成功");
      }
    },
    // 删除子表
    async deleteItemdetail () {
      if (!this.table.rowData.itemCode) {
        this.$message.warning("请选择一条数据");
        return;
      }
      const dataIndex = this.table.data.alllist.findIndex(
        item => item.itemCode == this.table.rowData.itemCode
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1);
        this.table.data.count--;
        if (this.status == "update") {
          try {
            const { data, status } =
              this.active == "materialinformation"
                ? await api.deletereceivesettlementMaterielData(
                  this.table.rowData.itemCode
                )
                : await api.deletereceivesettlementFeeData(
                  this.table.rowData.itemCode
                );
          } catch (e) {
            this.$message.error("删除失败，请重试");
            return;
          }
          this.getItemdetail();
        }
        this.table.rowData = {};
        this.$message.success("删除成功");
      }
    },
    // 表格切换页码
    handleChange (paper) {
      this.table.ruleForm.pageIndex = paper.pageIndex;
      this.table.ruleForm.pageSize = paper.pageSize;
      this.table.data = { ...this.table.data };
    },
    // 点选
    async handlerSearchClick (key) {
      let port = {
        delegeteBillNo: (data = {}) => api.queryentrustorderSearch(data),
        clientName: (data = {}) => api.queryclientSearch(data),
        customerName: (data = {}) => api.getCustomerList(data),
        companyName: (data = {}) => api.getCreditCompanyNameData(data),
        salesGroup: (data = {}) => api.getCreditCompanyNameData(data),
        taxCategoryName: (data = {}) => api.getTaxCategoryList(data),
        feeProjectName: (data = {}) => api.getFinanceProject(data)
      };
      const WHITE_LIST = [
        "customerName",
        "companyName",
        "salesGroup",
        "taxCategoryName"
      ];
      const REQ_DATA = {
        ...this.tableDialog.ruleForm,
        status: WHITE_LIST.includes(key) ? "2" : ""
      };
      try {
        const {
          data: { list, count }
        } = await port[key](REQ_DATA);
        this.tableDialog.data.list = list;
        this.tableDialog.data.count = count;
      } catch (e) {
        this.$message.error("接口未配置或获取数据失败，请重试！");
        console.log(e);
        return;
      }
      let dialogconfig = {
        delegeteBillNo: {
          config: entrustOrder,
          itemKey: key,
          itemName: "委托订单",
          queryConfig: [
            {
              label: "委托订单编码",
              moduleBind: "entrustOrderNo",
              isInput: true
            }
          ],
          isshow: true
        },
        clientName: {
          config: Client,
          itemKey: key,
          itemName: "委托方",
          queryConfig: [
            {
              label: "委托方编码",
              moduleBind: "clientNo",
              isInput: true
            }
          ],
          isshow: true
        },
        customerName: {
          config: Customer,
          itemKey: key,
          itemName: "客户",
          queryConfig: [
            {
              label: "客户编码",
              moduleBind: "customerNo",
              isInput: true
            }
          ],
          isshow: true
        },
        companyName: {
          config: CompanyInfo,
          itemKey: key,
          itemName: "公司",
          queryConfig: [
            {
              label: "公司编码",
              moduleBind: "storeOrgCode",
              isInput: true
            }
          ],
          isshow: true
        },
        taxCategoryName: {
          config: taxTypeName,
          itemKey: key,
          itemName: "税种",
          queryConfig: [
            {
              label: "税种编码",
              moduleBind: "billCode",
              isInput: true
            }
          ],
          isshow: true
        },
        salesGroup: {
          config: CompanyInfo,
          itemKey: key,
          itemName: "组织",
          queryConfig: [
            {
              label: "组织编码",
              moduleBind: "storeOrgCode",
              isInput: true
            }
          ],
          isshow: true
        },
        feeProjectName: {
          config: FinanceProject,
          itemKey: key,
          itemName: "计费项目",
          queryConfig: [
            {
              label: "计费项目编码",
              moduleBind: "financeProjectCode",
              isInput: true
            }
          ],
          isshow: true
        }
      };
      this.tableDialog = { ...this.tableDialog, ...dialogconfig[key] };
    },
    // 表格弹窗顶部查询事件
    handleTableDialogClick () {
      this.tableDialog.ruleForm.pageIndex = 1;
      this.handlerSearchClick(this.tableDialog.itemKey);
    },
    //  表格弹窗切换页码
    handlePageChange (paper) {
      this.tableDialog.ruleForm.pageIndex = paper.pageIndex;
      this.tableDialog.ruleForm.pageSize = paper.pageSize;
      this.handlerSearchClick(this.tableDialog.itemKey);
    },
    // 点选回调
    async tableDialogPreservation (rowData, key) {
      if (key && rowData) {
        switch (key) {
          case "delegeteBillNo":
            delete rowData["status"];
            delete rowData["statusName"];
            this.form.data = { ...this.form.data, ...rowData };
            this.form.data[key] = rowData["entrustOrderNo"];
            this.form.data["customer"] = rowData["customerCode"];
            this.form.data["customerName"] = rowData["customerName"];
            this.form.data["receiveDate"] = rowData["advanceReceivableDate"];
            this.form.data["settleCurrency"] = rowData["supplierCurrency"];
            this.form.data["company"] = rowData["trusteeCode"];
            this.form.data["companyName"] = rowData["trusteeName"];
            this.form.data["paymentType"] = rowData["receivableMethod"];
            this.form.data["settlementMethod"] = rowData["settlementMethod"];
            this.form.data["salesGroupCode"] = rowData["departmentCode"];
            this.form.data["salesGroup"] = rowData["purchaseUnitName"];
            this.form.data["totalAmount"] = rowData["vatTotalAmount"];
            this.form.data["declareCustoms"] = rowData["reportGateType"];
            this.form.data["bizReceivable"] = rowData["totalServiceCharge"];
            this.form.data["financialReceivables"] = rowData["advanceAmount"];
            this.form.data["client"] = rowData["clientCode"]; // 委托方
            this.form.data["customer"] = rowData["customerCode"]; //客户
            break;
          case "clientName":
            this.form.data["client"] = rowData["clientNo"];
            this.form.data[key] = rowData[key];
            break;
          case "customerName":
            this.form.data["customer"] = rowData["customerNo"];
            this.form.data[key] = rowData[key];
            break;
          case "companyName":
            this.form.data["company"] = rowData["customerNo"];
            this.form.data[key] = rowData[key];
            break;
          case "taxCategoryName":
            this.form.data["taxCategory"] = rowData["billCode"];
            this.form.data[key] = rowData[key];
            break;
          case "salesGroup":
            this.form.data["salesGroupCode"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
            break;
          case "feeProjectName":
            this.formDialog.ruleForm["feeProject"] =
              rowData["financeProjectCode"];
            this.formDialog.ruleForm[key] = rowData["financeProjectName"];
            break;
          default:
            this.form.data[key] = rowData[key];
            break;
        }
        this.form.data = { ...this.form.data };
        this.formDialog.ruleForm = { ...this.formDialog.ruleForm };
      }
    },
    // 关闭表格弹窗回调
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.tableDialog.ruleForm = {};
    }
  },
  watch: {
    "form.data.delegeteBillNo" (newVal, oldVal) {
      if (this.writeback || newVal == oldVal) return;
      this.writeItemdetail();
    },
    "formDialog.ruleForm.settleCurrency" (newVal, oldVal) {
      if (newVal) {
        (async _ => {
          let { data } = await api.getExchange();
          data.forEach(item => {
            item.currency == "澳大利亚元" &&
              this.formDialog.ruleForm.settleCurrency == 1 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice),
              item.currency == "瑞士法郎" &&
              this.formDialog.ruleForm.settleCurrency == 2 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice),
              item.currency == "人命币" &&
              this.formDialog.ruleForm.settleCurrency == 3 &&
              (this.formDialog.ruleForm.settleRate = "1.0000"),
              item.currency == "欧元" &&
              this.formDialog.ruleForm.settleCurrency == 4 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice),
              item.currency == "英镑" &&
              this.formDialog.ruleForm.settleCurrency == 5 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice),
              item.currency == "港币" &&
              this.formDialog.ruleForm.settleCurrency == 6 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice),
              item.currency == "日元" &&
              this.formDialog.ruleForm.settleCurrency == 7 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice),
              item.currency == "美元" &&
              this.formDialog.ruleForm.settleCurrency == 8 &&
              (this.formDialog.ruleForm.settleRate = item.cenPrice);
          });
        })();
      }
    },
    countSettleAmount (newVal, oldVal) { }
  },

  async created () {
    api.initSelect(this.form.config);
    api.initSelect(this.formDialogOne.formConfig);
    api.initSelect(this.formDialogTwo.formConfig);
    this.writeback = true;
    const { formData = {}, status = "" } =
      this.getActivePathData(this.$route.path) || {};
    // 回写数据
    this.status = status;

    if (formData) {
      Object.assign(this.form.data, formData);
    }

    // 查询或加载编码
    if (this.status == "update") {
      this.getItemdetail();
    } else {
      try {
        let { data } = await api.getreceivesettlementCode();
        this.form.data.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.tableOne.data.alllist =
        this.form.data.receivesettlementMaterielList || [];
      this.tableOne.data.count =
        this.form.data.receivesettlementMaterielListcount || 0;
      this.tableTwo.data.alllist =
        this.form.data.receivesettlementFeeList || [];
      this.tableTwo.data.count =
        this.form.data.receivesettlementFeeListcount || 0;
    }
    this.form.data = { ...this.form.data };
    this.$nextTick(function () {
      this.writeback = false;
    });
  },

  beforeRouteLeave (to, form, next) {
    if (this.status != "update") {
      this.form.data.receivesettlementMaterielList = this.tableOne.data.alllist;
      this.form.data.receivesettlementMaterielListcount = this.tableOne.data.count;
      this.form.data.receivesettlementFeeList = this.tableTwo.data.alllist;
      this.form.data.receivesettlementFeeListcount = this.tableTwo.data.count;
    }
    this.addbreadCrumbsList({
      data: {
        formData: this.form.data,
        status: this.status
      },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style scoped lang="less">
</style>
