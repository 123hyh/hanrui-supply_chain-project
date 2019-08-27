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
      <el-tabs v-model="active" type="card">
        <el-tab-pane :label="formDialog.itemName" name="onemodel"></el-tab-pane>
      </el-tabs>
      <el-button @click="openItemdetail('add')" >增加</el-button>
      <el-button @click="openItemdetail('update')">修改</el-button>
      <el-button @click="deleteItemdetail()">删除</el-button>
    </div>
    <!-- 表格 -->
    <table-component
      :tableDataKey="table.config"
      :tableData="tableDataList"
      @TableClickRowData="TableClickRowData"
      @handleDbclickTable="handleDbclickTable"
    ></table-component>
    <!-- 分页 -->
    <pagination ref="pagination" :count="table.data.count" @handlePageChange="handleChange"></pagination>
    <!-- 表单弹窗 -->
    <popover-component
	  width='1100px'
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
// 表单表格
import entities from "@/domain/entities/finance/ExpenseOrder";
import formConfig from "@/domain/formconfig/finance/ExpenseOrder";
// 子表
import entitiesOne from "@/domain/entities/finance/ExpenseItem";
import tableConfigOne from "@/domain/tableconfig/finance/ExpenseItem";
import formConfigOne from "@/domain/formconfig/finance/ExpenseItem";
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
import EmployeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo'

import { mapMutations, mapGetters } from "vuex";
export default {
  name: 'ExpensesClaimSheetForm',
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
      config: formConfig,
      data: new entities(),
      isLoading: false
    },
    active: "onemodel",
    table: {
      config: tableConfigOne,
      data: {
        alllist: [],
        count: 0
      },
      ruleForm: {},
      rowData: {}
    },
    formDialog: {
      formConfig: formConfigOne,
      ruleForm: new entitiesOne(),
      itemName: "费用明细",
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
    tableDataList() {
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
    async handlePreserve() {
      this.isLoading = true;
      try {
        if (this.status == "update") {
          const { data, status } = await api.updateexpenseorder(this.form.data);
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          this.form.data.expenseitemList = this.table.data.alllist;
          const { data, status } = await api.addexpenseorder(this.form.data);
          if (status) {
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
    handlebackspacing() {
      this.$router.push("M0812");
    },
   
    // 查询子表
    async getItemdetail() {
      try {
        const { data, status } = await api.queryexpenseitemSearch({
          pageIndex: null,
          pageSize: null
        });
        this.table.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.table.data.count = data.count;
        this.table.data = { ...this.table.data };
      } catch (e) {
        this.$message.error("查询失败");
      }
    },
    // 表格点击行
    TableClickRowData(row) {
      this.table.rowData = row;
    },
    // 表格双击行
    handleDbclickTable(data) {
      this.TableClickRowData(data);
      this.openItemdetail("update");
    },
    // 打开子表操作
    openItemdetail(jap) {
      if (jap == "update" && !this.table.rowData.billNo) {
        this.$message.warning("请选择一条数据");
        return;
	  }
	  if(jap == "update"){
		  this.formDialog.ruleForm = this.table.rowData
		  this.itemstatus = "update"
	  }else{
        this.formDialog.ruleForm = {}
		  this.formDialog.ruleForm.billNo = this.form.data.billNo
		  this.itemstatus = "add";
	  }
      this.formDialog.isshow = true;
    },
    // 关闭子表操作
    closeFormDialog() {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    // 操作子表
    clickItemdetail() {
      if (this.itemstatus == "update") {
        this.updateItemdetail();
      } else {
        this.addItemdetail();
      }
    },
    // 增加子表
    async addItemdetail(data) {
      this.table.data.alllist.splice(0, 0, this.formDialog.ruleForm);
      this.table.data.count++;
      if (this.status == "update") {
        try {
          const { data, status } = await api.addexpenseitem(this.formDialog.ruleForm);
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
    async updateItemdetail() {
      const dataIndex = this.table.data.alllist.findIndex(
        item => item.billNo == this.table.rowData.billNo
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1, this.formDialog.ruleForm);
        if (this.status == "update") {
          try {
            const { data, status } = await api.updateexpenseitem(
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
    async deleteItemdetail() {
      if (!this.table.rowData.billNo) {
        this.$message.warning("请选择一条数据");
        return;
      }
      const dataIndex = this.table.data.alllist.findIndex(
        item => item.billNo == this.table.rowData.billNo
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1);
        this.table.data.count--;
        if (this.status == "update") {
          try {
            const { data, status } = await api.removeexpenseitem(
              this.table.rowData.billNo
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
    handleChange(paper) {
      this.table.ruleForm.pageIndex = paper.pageIndex;
      this.table.ruleForm.pageSize = paper.pageSize;
      this.table.data = { ...this.table.data };
    },
    // 点选
    async handlerSearchClick(key) {
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
        return this.$message.warning("请选择来源单据类型");
      }
      let port = {
		expensePerson: (data = {}) => api.queryemployeeinfoSearch(data),
		paymentBear: (data = {}) => api.queryemployeeinfoSearch(data),
		delegateBillNo: (data = {}) => api.queryentrustorderSearch(data),
        receiverDepartmentName: {
          "1": (data = {}) => api.querysupplierbaseSearch(data), //供应商
          "2": (data = {}) => api.getCustomerList(data), //退款客户
          "3": (data = {}) => api.queryclientSearch(data), //委托方
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerList(data) //客户
        },
        applicationCompany: (data = {}) => api.getCreditCompanyNameData(data),
        paymentCompany: (data = {}) => api.getCreditCompanyNameData(data),
        receiverAccount: {
          "1": (data = {}) => api.querysupplierbankSearch(data), //供应商银行账户
          "2": (data = {}) => api.getCustomerBan(data), //退款客户银行账户
          "3": (data = {}) => api.getClientBlankData(data), //委托方银行账户
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerBan(data) //客户银行账户
        },
        applicationDept: (data = {}) => api.getDepartment(data),
        paymentDept: (data = {}) => api.getDepartment(data),
        chargeItemName: (data = {}) => api.queryfinanceprojectSearch(data),
        sourceBillNo: (data = {}) => api.queryentrustorderSearch(data),
        
      };
      try {
        const {
          data: { list, count }
        } =
          key == "receiverDepartmentName" || key == "receiverAccount"
            ? await port[key][this.form.data.receiverDepartmentType](
                this.tableDialog.ruleForm
              )
            : await port[key](this.tableDialog.ruleForm);
        this.tableDialog.data.list = list;
        this.tableDialog.data.count = count;
      } catch (e) {
        this.$message.error("接口未配置或获取数据失败，请重试！");
        console.log(e);
        return;
      }
      let dialogconfig = {
        expensePerson: {
          config: EmployeeInfo,
          itemKey: key,
          itemName: "员工资料",
          queryConfig: [
            {
              label: "委托订单编码",
              moduleBind: "employeeInfoCode",
              isInput: true
            }
          ],
          isshow: true
		},
        paymentBear: {
          config: EmployeeInfo,
          itemKey: key,
          itemName: "员工资料",
          queryConfig: [
            {
              label: "委托订单编码",
              moduleBind: "employeeInfoCode",
              isInput: true
            }
          ],
          isshow: true
		},
        delegateBillNo: {
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
        applicationCompany: {
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
        paymentCompany: {
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
        applicationDept: {
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
        paymentDept: {
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
    handleTableDialogClick() {
      this.tableDialog.ruleForm.pageIndex = 1;
      this.handlerSearchClick(this.tableDialog.itemKey);
    },
    //  表格弹窗切换页码
    handlePageChange(paper) {
      this.tableDialog.ruleForm.pageIndex = paper.pageIndex;
      this.tableDialog.ruleForm.pageSize = paper.pageSize;
      this.handlerSearchClick(this.tableDialog.itemKey);
    },
    // 点选回调
    tableDialogPreservation(rowData, key) {
      if (key && rowData) {
        switch (key) {
          case "expensePerson":
            this.form.data[key] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "paymentBear":
            this.form.data[key] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "delegateBillNo":
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
          case "applicationCompany":
            this.form.data["companyCode"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
            break;
          case "paymentCompany":
            this.form.data["companyCode"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
            break;
          case "receiverAccount":
            this.form.data[key] = rowData["bankCardNo"] || rowData["bankNo"];
            this.form.data["accountName"] = rowData["userName"];
            this.form.data["payBank"] = rowData["bankName"];
            this.form.data["backAddress"] = rowData["bankAddress"];
            this.form.data["payMoneyType"] = rowData["currency"];
            break;
          case "applicationDept":
            this.form.data["departmentCode"] = rowData["departmentCode"];
            this.form.data[key] = rowData['departmentName'];
            break;
          case "paymentDept":
			if(this.formDialog.isshow){
				this.formDialog.ruleForm["departmentCode"] = rowData["departmentCode"];
				this.formDialog.ruleForm[key] = rowData['departmentName'];
			}else{
				this.form.data["departmentCode"] = rowData["departmentCode"];
				this.form.data[key] = rowData['departmentName'];
			}
            break;
          case "chargeItemName":
            this.form.data["chargeItem"] = rowData["financeProjectCode"];
            this.form.data[key] = rowData['financeProjectName'];
            break;
          default:
            this.form.data.key = rowData[key];
            break;
        }
        this.form.data = { ...this.form.data };
      }
    },
    // 关闭表格弹窗回调
    closeTableDialog() {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.tableDialog.ruleForm = {};
    }
  },
  watch: {
    "form.data.payMoneyType"(newVal, oldVal) {
      if (this.writeback) return;
      if (!newVal)
      this.form.data["exchangeRate"] = "";
    },
  },
  async created() {
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
      try {
        let { data } = await api.getexpenseorderCode();
        this.form.data.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.table.data.alllist = this.form.data.expenseitemList || [];
      this.table.data.count = this.form.data.expenseitemListcount || 0;
    }
    this.form.data = { ...this.form.data };
    this.$nextTick(function() {
      this.writeback = false;
    });
  },
  beforeRouteLeave(to, form, next) {
    this.form.data.expenseitemList = this.table.data.alllist;
    this.form.data.expenseitemListcount = this.table.data.count;
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
