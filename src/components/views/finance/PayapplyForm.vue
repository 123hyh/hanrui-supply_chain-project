<template>
  <div>
    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data'
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
    <div style="margin:20px 0 20px 0">
      <el-tabs
        v-model="active"
        type="card"
      >
        <el-tab-pane
          :label="formDialogOne.itemName"
          name="onemodel"
        ></el-tab-pane>
      </el-tabs>
      <div v-show="+form.data.status || 0 <=1">
        <el-button
          @click="openItemdetail('add')"
          v-show="form.data.payType == '6' || form.data.payType == '8'"
        >增加</el-button>
        <el-button @click="openItemdetail('update')">修改</el-button>
        <el-button @click="deleteItemdetail()">删除</el-button>
      </div>

    </div>
    <!-- 表格 -->
    <table-component
      :isSubTable='true'
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
      :popoverType="'form'"
      :isShowPopover="formDialog.isshow"
      :itemName="formDialog.itemName"
      :formData="formDialog"
      @handlerFormConfigClickSearch="handlerSearchClick"
      @formClickPreservation="clickItemdetail"
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
import utools from '@/domain/common/utools.js'

// 表单表格
import entities from "@/domain/entities/finance/Payapply";
import formConfig from "@/domain/formconfig/finance/Payapply";
// 子表
import entitiesOne from "@/domain/entities/finance/Payapplydetail";
import tableConfigOne from "@/domain/tableconfig/finance/Payapplydetail";
import formConfigOne from "@/domain/formconfig/finance/Payapplydetail";
// 弹窗
import entrustOrder from "@/domain/tableconfig/commerce/EntrustOrder.js";
import SupplierBase from "@/domain/tableconfig/basicdata/SupplierBase.js";
import SupplierBank from "@/domain/tableconfig/basicdata/SupplierBank.js";
import Client from "@/domain/tableconfig/business/Client.js";
import ClientBank from "@/domain/tableconfig/business/ClientBank.js";
import Customer from "@/domain/tableconfig/basicdata/Customer.js";
import CustomerBank from "@/domain/tableconfig/basicdata/CustomerBank.js";
import CompanyInfo from "@/domain/tableconfig/basicdata/CompanyInfo.js";
import Department from "@/domain/tableconfig/system/Department";
import taxTypeName from "@/domain/tableconfig/basicdata/TaxCategory.js";
import FinanceProject from "@/domain/tableconfig/basicdata/FinanceProject";
import Payapply from "@/domain/tableconfig/finance/Payapply";

import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    FormComponent,
    TableComponent,
    Pagination,
    PopoverComponent
  },
  data: () => ({
    status: "",
    itemstatus: "",
    writeback: "",
    form: {
      config: utools.cloneObj(formConfig) ,
      data: new entities(),
      isLoading: false
    },
    active: "onemodel",
    tableOne: {
      config: tableConfigOne,
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
      itemName: "付款申请信息",
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
      if (this.active == "onemodel") {
        return this.tableOne;
      }
    },
    formDialog () {
      if (this.active == "onemodel") {
        return this.formDialogOne;
      }
    },
    tableDataList () {
      let pageIndex = this.table.ruleForm.pageIndex || 1;
      let pageSize = this.table.ruleForm.pageSize || 10;
      let start = (pageIndex - 1) * pageSize;
      let end = pageIndex * pageSize;
      return this.table.data.alllist.slice(start, end) || [];
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 保存主表
    async handlePreserve () {
      this.isLoading = true;
      try {   
        if (this.status == "update") {
          const { data, status } = await api.updatepayapply(this.form.data);
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          this.form.data.payapplydetailList = this.table.data.alllist;
          this.form.data.payapplydetailListcount = this.table.data.count;
          const { data, status } = await api.addpayapply(this.form.data);
          if (status) {
            this.$set(this.form.data, 'status', '1')
            this.status = "update";
            this.$message.success("操作成功");
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
      this.$router.push("M0809");
    },
    // 覆盖（带出）子表   ------付款类型/委托单号/收款单位/是否来源多张单
    async writePayapplydetail () {
      if (this.form.data.payType == "6" || this.form.data.payType == "8")
        return;
      try {
        if (this.form.data.multipleBill && this.form.data.receiverDepartment) {
          // 收款单位
          var { data, status } = await api.queryentrusttrusteepanymentSearch({
            unitType: this.form.data.receiverDepartmentType,
            unitCode: this.form.data.receiverDepartment,
            hasPayApply: true,
            pageIndex: null,
            pageSize: null
          });
        } else if (
          !this.form.data.multipleBill &&
          this.form.data.entrustOrderNo
        ) {
          // 委托单号
          var { data, status } = await api.queryentrusttrusteepanymentSearch({
            entrustOrderNo: this.form.data.entrustOrderNo,
            hasPayApply: true,
            pageIndex: null,
            pageSize: null
          });
        } else {
          return;
        }
        // 付款申请的受托方付款列表
        data.list.map(item => {
          item.billNo = this.form.data.billNo;
          item.delegateBillNo = item.entrustOrderNo;
          item.recordedAmount = item.paymentAmount + item.otherAmount;//已计金额
          item.applyPayAmount = item.paymentAmount + item.otherAmount;//申请付款金额
          item.delegateBillCreateTime = item.createTime;//委托单制单时间
        });
        this.tableOne.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.tableOne.data.count = data.count;
      } catch (e) {
        this.$message.error("查询失败，请重试");
        return;
      }
      if (this.status == "update") {
        try {
          const { data, status } = await api.batchpayapplydetailData(
            this.tableOne.data.alllist
          );
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
      try {
        const { data, status } = await api.querypayapplydetailSearch({
          billNo: this.form.data.billNo,
          pageIndex: null,
          pageSize: null
        });
        this.tableOne.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.tableOne.data.count = data.count;
        this.table.data = { ...this.table.data };
      } catch (e) {
        this.$message.error("查询失败");
      }
    },
    // 表格点击行
    TableClickRowData (row) {
      this.table.rowData = row;
    },
    // 表格双击行
    handleDbclickTable (data) {
      this.TableClickRowData(data);
      this.openItemdetail("update");
    },
    // 打开子表操作
    openItemdetail (jap) {
      if (jap == "update" && !this.table.rowData.itemCode) {
        this.$message.warning("请选择一条数据");
        return;
      }
      this.itemstatus = "add";
      this.formDialog.ruleForm.billNo = this.form.data.billNo
      jap == "update" &&
        ((this.formDialog.ruleForm = this.table.rowData),
          (this.itemstatus = "update"));
      this.formDialog.isshow = true;
    },
    // 关闭子表操作
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    // 操作子表
    clickItemdetail () {
      if (this.itemstatus == "update") {
        this.updateItemdetail();
      } else {
        this.addItemdetail();
      }
    },
    // 增加子表
    async addItemdetail (data) {
      this.table.data.alllist.splice(0, 0, data);
      this.table.data.count++;
      if (this.status == "update") {
        try {
          const { data, status } = await api.addpayapplydetail(data);
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
    // 操作子表
    async updateItemdetail () {
      const dataIndex = this.table.data.alllist.findIndex(
        item => item.itemCode == this.table.rowData.itemCode
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1, this.formDialog.ruleForm);
        if (this.status == "update") {
          try {
            const { data, status } = await api.updatepayapplydetail(
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
            const { data, status } = await api.removepayapplydetail(
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
      if (
        key == "receiverDepartmentName" &&
        !this.form.data.receiverDepartmentType
      ) {
        return this.$message.warning("请选择收款单位类型");
      }
      if (key == "receiverAccount" && !this.form.data.receiverDepartmentName) {
        return this.$message.warning("请选择收款单位");
      }
      if (key == "sourceBillNo" && this.formDialog.ruleForm.sourceBillType) {
        return this.$message.warning("请虚选择来源单据类型");
      }
      let port = {
        entrustOrderNo: (data = {}) => api.queryentrustorderSearch(data),
        receiverDepartmentName: {
          "1": (data = {}) => api.querysupplierbaseSearch(data), //供应商
          "2": (data = {}) => api.getCustomerList(data), //退款客户
          "3": (data = {}) => api.queryclientSearch(data), //委托方
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerList(data) //客户
        },
        companyName: (data = {}) => api.getCreditCompanyNameData(data),
        receiverAccount: {
          "1": (data = {}) => api.querysupplierbankSearch(data), //供应商银行账户
          "2": (data = {}) => api.getCustomerBan(data), //退款客户银行账户
          "3": (data = {}) => api.getClientBlankData(data), //委托方银行账户
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerBan(data) //客户银行账户
        },
        departmentName: (data = {}) => api.getDepartment(data),
        chargeItemName: (data = {}) => api.queryfinanceprojectSearch(data),
        sourceBillNo: (data = {}) => api.queryentrustorderSearch(data),

      };
      const REQ_DATA = { ...this.tableDialog.ruleForm },
        WHITE_LIST = ['companyName', 'departmentName'];
      key === 'receiverDepartmentName' && this.form.data.receiverDepartmentType !== '3' && (REQ_DATA.status = '2');
      WHITE_LIST.includes(key) && (REQ_DATA.status = '2')
      try {
        const {
          data: { list, count }
        } =
          key == "receiverDepartmentName" || key == "receiverAccount"
            ? await port[key][this.form.data.receiverDepartmentType](
              REQ_DATA
            )
            : await port[key](REQ_DATA);
        this.tableDialog.data.list = list;
        this.tableDialog.data.count = count;
      } catch (e) {
        this.$message.error("接口未配置或获取数据失败，请重试！");
        console.log(e);
        return;
      }
      let dialogconfig = {
        entrustOrderNo: {
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
        receiverDepartmentName: {
          "1": {
            config: SupplierBase,
            itemKey: key,
            itemName: "供应商",
            queryConfig: [
              {
                label: "供应商编码",
                moduleBind: "supplierCode",
                isInput: true
              }
            ],
            isshow: true
          },
          "2": {
            config: Customer,
            itemKey: key,
            itemName: "退款客户",
            queryConfig: [
              {
                label: "客户编码",
                moduleBind: "customerNo",
                isInput: true
              }
            ],
            isshow: true
          },
          "3": {
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
          "5": {
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
          }
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
        receiverAccount: {
          "1": {
            config: SupplierBank,
            itemKey: key,
            itemName: "供应商银行",
            queryConfig: [
              {
                label: "编码",
                moduleBind: "supplierCode",
                isInput: true
              }
            ],
            isshow: true
          },
          "2": {
            config: CustomerBank,
            itemKey: key,
            itemName: "退款客户银行",
            queryConfig: [
              {
                label: "编码",
                moduleBind: "customerNo",
                isInput: true
              }
            ],
            isshow: true
          },
          "3": {
            config: ClientBank,
            itemKey: key,
            itemName: "委托方银行",
            queryConfig: [
              {
                label: "编码",
                moduleBind: "clientNo",
                isInput: true
              }
            ],
            isshow: true
          },
          "5": {
            config: CustomerBank,
            itemKey: key,
            itemName: "客户银行",
            queryConfig: [
              {
                label: "编码",
                moduleBind: "customerNo",
                isInput: true
              }
            ],
            isshow: true
          }
        },
        departmentName: {
          config: Department,
          itemKey: key,
          itemName: "部门",
          queryConfig: [
            {
              label: "部门编码",
              moduleBind: "departmentCode",
              isInput: true
            }
          ],
          isshow: true
        },
        chargeItemName: {
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
        },
        sourceBillNo: {
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
      };
      if (key == "receiverDepartmentName" || key == "receiverAccount") {
        this.tableDialog = {
          ...this.tableDialog,
          ...dialogconfig[key][this.form.data.receiverDepartmentType]
        };
      } else {
        this.tableDialog = { ...this.tableDialog, ...dialogconfig[key] };
      }
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
    tableDialogPreservation (rowData, key) {
      if (key && rowData) {
        switch (key) {
          case "entrustOrderNo":
            this.form.data[key] = rowData["entrustOrderNo"];
            break;
          case "sourceBillNo":
            this.form.data[key] = rowData["entrustOrderNo"];
            break;
          case "receiverDepartmentName":
            this.form.data.receiverDepartmentType == "1" &&
              ((this.form.data["receiverDepartment"] = rowData["supplierCode"]),
                (this.form.data[key] = rowData["supplierName"])),
              (this.form.data.receiverDepartmentType == "2" ||
                this.form.data.receiverDepartmentType == "5") &&
              ((this.form.data["receiverDepartment"] = rowData["customerNo"]),
                (this.form.data[key] = rowData["customerName"])),
              this.form.data.receiverDepartmentType == "3" &&
              ((this.form.data["receiverDepartment"] = rowData["clientNo"]),
                (this.form.data[key] = rowData["clientName"]));
            this.form.data.receiverCountry =
              rowData["national"] || rowData["country"];
            this.form.data.receiverProvence = rowData["provinceName"];
            this.form.data.receiverCityCountry =
              rowData["districtName"] || rowData["countyName"];
            this.form.data["payerPhone"] = rowData["tel"];
            break;
          case "companyName":
            this.form.data["company"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
            break;
          case "receiverAccount":
            this.form.data[key] = rowData["bankCardNo"] || rowData["bankNo"];
            this.form.data["accountName"] = rowData["userName"];
            this.form.data["payBank"] = rowData["bankName"];
            this.form.data["backAddress"] = rowData["bankAddress"];
            this.form.data["payMoneyType"] = rowData["currency"];
            break;
          case "departmentName":
            this.form.data["department"] = rowData["departmentCode"];
            this.form.data[key] = rowData[key];
            break;
          case "chargeItemName":
            this.tableDialog.ruleForm["chargeItem"] = rowData["financeProjectCode"];
            this.tableDialog.ruleForm[key] = rowData['financeProjectName'];
            break;
          default:
            this.form.data.key = rowData[key];
            break;
        }
        this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm };
        this.form.data = { ...this.form.data };
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
    "form.data.receiverDepartmentType" (newVal, oldVal) {
      this.utools.getFromconfigObj(this.form.config, "receiverDepartmentName")[
        "btn"
      ] = newVal != "4";
      this.utools.getFromconfigObj(this.form.config, "receiverDepartmentName")[
        "readonly"
      ] = newVal != "4";
      this.utools.getFromconfigObj(this.form.config, "receiverAccount")["btn"] =
        newVal != "4";
      this.utools.getFromconfigObj(this.form.config, "receiverAccount")[
        "readonly"
      ] = newVal != "4";
      this.form.config = [...this.form.config];
      if (this.writeback) return;
      this.form.data["receiverDepartment"] = "";
      this.form.data["receiverDepartmentName"] = "";
    },
    "form.data.receiverDepartment" (newVal, oldVal) {
      if (this.writeback) return;
      this.writePayapplydetail();
      this.form.data["receiverAccount"] = "";
      if (newVal) return;
      this.form.data.receiverCountry = "";
      this.form.data.receiverProvence = "";
      this.form.data.receiverCityCountry = "";
      this.form.data["payerPhone"] = "";
    },
    "form.data.receiverAccount" (newVal, oldVal) {
      if (this.writeback) return;
      if (newVal) return;
      this.form.data["accountName"] = "";
      this.form.data["payBank"] = "";
      this.form.data["backAddress"] = "";
    },
    "form.data.entrustOrderNo" (newVal, oldVal) {
      if (this.writeback) return;
      this.writePayapplydetail();
    },
    "form.data.multipleBill" (newVal, oldVal) {
      if (this.writeback) return;
      this.writePayapplydetail();
    },
    "form.data.payType" (newVal, oldVal) {
      if (this.writeback) return;
      this.writePayapplydetail();
    },
    "form.data.payMoneyType" (newVal, oldVal) {
      if (this.writeback) return;
      if (!newVal)
        this.form.data["exchangeRate"] = "";
      this.utools.getExchange(this.form.data.payMoneyType, this.form.data, 'exchangeRate')
      this.form.data = { ...this.form.data }
    },
  },
  async created () {
    api.initSelect(this.form.config);
    api.initSelect(this.formDialog.formConfig);
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
      this.form.data.bizDate = new Date().toJSON().slice(0, 10) + " 00:00:00";
      try {
        let { data } = await api.getpayapplyCode();
        this.form.data.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.tableOne.data.alllist = this.form.data.payapplydetailList || [];
      this.tableOne.data.count = this.form.data.payapplydetailListcount || 0;
    }
    this.form.data = { ...this.form.data };
    this.$nextTick(function () {
      this.writeback = false;
    });
  },
  beforeRouteLeave (to, form, next) {
    this.form.data.payapplydetailList = this.tableOne.data.alllist;
    this.form.data.payapplydetailListcount = this.tableOne.data.count;
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
