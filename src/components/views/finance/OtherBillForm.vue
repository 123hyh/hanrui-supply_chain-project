<template>
  <div>
    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data'
      :isLoading="form.isLoading"
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      @handleSubmit="handleSubmit"
    ></preserve-btn>
    <!-- 表单 -->
    <form-component
      :inputKey="form.config"
      :formModel="form.data"
      @handlerFormConfigClickSearch="handlerSearchClick"
    ></form-component>
    <div style="margin:15vh 0 20px 0">
      <el-tabs
        v-model="active"
        type="card"
      >
        <el-tab-pane
          :label="formDialog.itemName"
          name="onemodelOne">
          <div v-show="+form.data.status<=1">
            <el-button
              @click="openItemdetail('add')"
              v-if="table.data.count == '0'"
            >增加</el-button>
            <el-button @click="openItemdetail('update')">修改</el-button>
            <el-button @click="deleteItemdetail()">删除</el-button>
          </div>
          <!-- 表格 -->
          <table-component
            :isSubTable='true'
            style="margin-top: 20px;"
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
        </el-tab-pane>
        <el-tab-pane
          label="修改记录"
          name="onemodelTwo"
        >
          <!-- 表格 -->
          <table-component
            style="margin-top: 20px;"
            :tableDataKey="tableTwo.config"
            :tableData="tableTwo.data.list"
          ></table-component>
          <!-- 分页 -->
          <pagination
            ref="pagination"
            :count="tableTwo.data.count"
            @handlePageChange="handleChangeTwo"
          ></pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表单弹窗 -->
    <popover-component
      width="1100px"
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
import entities from "@/domain/entities/finance/OtherBill";
import formConfig from "@/domain/formconfig/finance/OtherBill";
// 子表
import entitiesOne from "@/domain/entities/finance/OtherBillBranch";
import tableConfigOne from "@/domain/tableconfig/finance/OtherBillBranch";
import formConfigOne from "@/domain/formconfig/finance/OtherBillBranch";
import entitiesTwo from "@/domain/entities/finance/OtherBillRecord";
import tableConfigTwo from "@/domain/tableconfig/finance/OtherBillRecord";
import formConfigTwo from "@/domain/formconfig/finance/OtherBillRecord";
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
import EmployeeInfo from "@/domain/tableconfig/basicdata/EmployeeInfo";

import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    FormComponent,
    TableComponent,
    Pagination,
    PopoverComponent
  },
  data: () => ({
    searchTarget: '',
    status: "",
    itemstatus: "",
    writeback: "",
    isreceiveUnitType: '',
    ispayableUnitType: '',
    form: {
      config: formConfig,
      data: new entities(),
      isLoading: false
    },
    active: "onemodelOne",
    table: {
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
        list: [],
        count: 0
      },
      ruleForm: {}
    },
    formDialog: {
      formConfig: formConfigOne,
      ruleForm: new entitiesOne(),
      itemName: "分录",
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
          const { data, status } = await api.updateotherbill(this.form.data);
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          this.form.data.otherBillBranchList = this.table.data.alllist;
          const { data, status } = await api.addotherbill(this.form.data);
          if (status) {
            this.status = "update";
            this.$message.success("操作成功");
            this.getItemdetail();
            this.getOtherBillRecord()
          }
        }
        this.$set(this.form.data, 'status', '1')
      } catch (e) {
        this.$message.error("操作失败，请重试！");
      } finally {
        this.isLoading = false;
      }
    },
    // 返回
    handlebackspacing () {
      this.$router.push("M0802");
    },
    // 单据提交
    handleSubmit () {
      this.utools.submitBill({ param: this.form.data, ctx: this });
    },
    // 查询子表
    async getItemdetail () {
      try {
        const { data, status } = await api.queryotherbillbranchSearch({
          billNo: this.form.data.billNo,
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
    TableClickRowData (row) {
      this.table.rowData = row;
    },
    // 表格双击行
    handleDbclickTable (data) {
      this.TableClickRowData(data);
      this.openItemdetail("update");
    },
    // 添加子表时操作编码
    async getitemCode () {
      try {
        let { data } = await api.getitemCode();
        this.formDialog.ruleForm.itemCode = data
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
    },
    // 打开子表操作
    openItemdetail (jap) {
      if (jap == "update" && !this.table.rowData.billNo) {
        this.$message.warning("请选择一条数据");
        return;
      }
      if (jap == "update") {
        this.formDialog.ruleForm = this.table.rowData;
        this.formDialog.ruleForm = {...this.formDialog.ruleForm}
        this.itemstatus = "update";
      } else {
        this.formDialog.ruleForm = {}
        this.formDialog.ruleForm.billNo = this.form.data.billNo;
        this.getitemCode()
        this.itemstatus = "add";
      }
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
      this.table.data.alllist.splice(0, 0, this.formDialog.ruleForm);
      this.table.data.count++;
      if (this.status == "update") {
        try {
          const { data, status } = await api.addotherbillbranch(
            this.formDialog.ruleForm
          );
        } catch (e) {
          this.$message.error("增加失败，请重试");
          return;
        }
        this.getItemdetail();
        this.getOtherBillRecord()
      }
      this.table.rowData = {};
      this.formDialog.isshow = false;
      this.$message.success("增加成功");
    },
    // 操作子表
    async updateItemdetail () {
      const dataIndex = this.table.data.alllist.findIndex(
        item => item.billNo == this.table.rowData.billNo
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1, this.formDialog.ruleForm);
        if (this.status == "update") {
          try {
            const { data, status } = await api.updateotherbillbranch(
              this.formDialog.ruleForm
            );
          } catch (e) {
            this.$message.error("修改失败，请重试");
            return;
          }
          this.getItemdetail();
          this.getOtherBillRecord()
        }
        this.formDialog.isshow = false;
        this.$message.success("修改成功");
      }
    },
    // 删除子表
    async deleteItemdetail () {
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
            const { data, status } = await api.removeotherbillbranch(
              this.table.rowData.itemCode
            );
          } catch (e) {
            this.$message.error("删除失败，请重试");
            return;
          }
          this.getItemdetail();
          this.getOtherBillRecord()
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
    // 表格切换页码
    handleChangeTwo (paper) {
      this.tableTwo.ruleForm.pageIndex = paper.pageIndex;
      this.tableTwo.ruleForm.pageSize = paper.pageSize;
      this.getOtherBillRecord()
    },
    // 点选
    async handlerSearchClick (key) {
      this.searchTarget = key;
      if (key == "receiveUnitName" && !this.formDialog.ruleForm.receiveUnitType) {
        return this.$message.warning("请选择应收结算单位类型");
      }
      if (key == "payableUnitName" && !this.formDialog.ruleForm.payableUnitType) {
        return this.$message.warning("请选择应付结算单位类型");
      }
      let port = {
        expensePerson: (data = {}) => api.queryemployeeinfoSearch(data),
        handlerName: (data = {}) => api.queryemployeeinfoSearch(data),
        entrustOrderNo: (data = {}) => api.queryentrustorderSearch(data),
        receiveUnitName: {
          "1": (data = {}) => api.querysupplierbaseSearch(data), //供应商
          "2": (data = {}) => api.getCustomerList(data), //退款客户
          "3": (data = {}) => api.queryclientSearch(data), //委托方
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerList(data) //客户
        },
        clientName: (data = {}) => api.queryclientSearch(data),
        companyName: (data = {}) => api.getCreditCompanyNameData(data),
        paymentCompany: (data = {}) => api.getCreditCompanyNameData(data),
        payableUnitName: {
          "1": (data = {}) => api.querysupplierbaseSearch(data), //供应商
          "2": (data = {}) => api.getCustomerList(data), //退款客户
          "3": (data = {}) => api.queryclientSearch(data), //委托方
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerList(data) //客户
        },
        departmentName: (data = {}) => api.getDepartment(data),
        paymentDept: (data = {}) => api.getDepartment(data),
        feeProjectName: (data = {}) => api.queryfinanceprojectSearch(data),
        sourceBillNo: (data = {}) => api.queryentrustorderSearch(data),
      };
      console.log(key);
      const WHITE_LIST = ['companyName', 'departmentName', 'handlerName', 'receiveUnitName', 'payableUnitName'];
      const REQ_DATA = { ...this.tableDialog.ruleForm };
      if (WHITE_LIST.includes(this.searchTarget)) {
        REQ_DATA.status = '2';
        this.searchTarget === 'receiveUnitName' && this.formDialog.ruleForm.receiveUnitType === '3' && (REQ_DATA.status = '');
        this.searchTarget === 'payableUnitName' && this.formDialog.ruleForm.payableUnitType === '3' && (REQ_DATA.status = '')
      }
      try {
        const {
          data: { list, count }
        } =
          key == "receiveUnitName"
            ? await port[key][this.formDialog.ruleForm.receiveUnitType](
              REQ_DATA
            )
            : key == "payableUnitName"
              ? await port[key][this.formDialog.ruleForm.payableUnitType](
                REQ_DATA
              ) : await port[key](REQ_DATA);
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
        handlerName: {
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
        receiveUnitName: {
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
        payableUnitName: {
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
        }
      };
      if (key == "receiveUnitName" || key == "payableUnitName") {
        this.tableDialog = {
          ...this.tableDialog,
          ...dialogconfig[key][key == "receiveUnitName" ? this.formDialog.ruleForm.receiveUnitType : this.formDialog.ruleForm.payableUnitType]
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
    // 查询记录
    async getOtherBillRecord () {
      try {
        const { data, status } = await api.queryotherbillrecordSearch({ billNo: this.form.data.billNo });
        this.tableTwo.data.list = JSON.parse(JSON.stringify(data.list));
        this.tableTwo.data.count = data.count;
        this.tableTwo.data = { ...this.tableTwo.data };
      } catch (e) {
        this.$message.error("查询失败");
      }
    },
    // 点选回调
    tableDialogPreservation (rowData, key) {
      if (key && rowData) {
        switch (key) {
          case "companyName":
            this.form.data["company"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
            break;
          case "departmentName":
            this.form.data["department"] = rowData["departmentCode"];
            this.form.data[key] = rowData["departmentName"];
            break;
          case "handlerName":
            this.form.data['handler'] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "entrustOrderNo":
            this.formDialog.ruleForm[key] = rowData["entrustOrderNo"];
            this.formDialog.ruleForm["entrustOrderType"] = rowData["entrustOrderType"];
            this.formDialog.ruleForm["clientCode"] = rowData["clientCode"];
            this.formDialog.ruleForm["clientName"] = rowData["clientName"];
            this.formDialog.ruleForm["receiveUnitType"] = "5"; // 默认 应收结算单位类型
            this.isreceiveUnitType = true
            this.formDialog.ruleForm["receiveUnit"] = rowData["customerCode"];
            this.formDialog.ruleForm["receiveUnitName"] = rowData["customerName"];
            this.formDialog.ruleForm["payableUnitType"] = "1"; // 默认 应付结算单位类型
            this.ispayableUnitType = true
            this.formDialog.ruleForm["payableUnit"] = rowData["supplierCode"];
            this.formDialog.ruleForm["payableUnitName"] = rowData["supplierName"];
            this.formDialog.ruleForm["occurrenceDate"] = rowData["signDate"];
            break;
          case "clientName":
            this.formDialog.ruleForm["client"] = rowData["clientNo"]
            this.formDialog.ruleForm[key] = rowData["clientName"]
            break;
          case "receiveUnitName":
            this.formDialog.ruleForm.receiveUnitType == "1" &&
              ((this.formDialog.ruleForm["receiveUnit"] = rowData["supplierCode"]),
                (this.formDialog.ruleForm[key] = rowData["supplierName"])),
              (this.formDialog.ruleForm.receiveUnitType == "2" ||
                this.formDialog.ruleForm.receiveUnitType == "5") &&
              ((this.formDialog.ruleForm["receiveUnit"] = rowData["customerNo"]),
                (this.formDialog.ruleForm[key] = rowData["customerName"])),
              this.formDialog.ruleForm.receiveUnitType == "3" &&
              ((this.formDialog.ruleForm["receiveUnit"] = rowData["clientNo"]),
                (this.formDialog.ruleForm[key] = rowData["clientName"]));
            break;
          case "payableUnitName":
            this.formDialog.ruleForm.payableUnitType == "1" &&
              ((this.formDialog.ruleForm["payableUnit"] = rowData["supplierCode"]),
                (this.formDialog.ruleForm[key] = rowData["supplierName"])),
              (this.formDialog.ruleForm.payableUnitType == "2" ||
                this.formDialog.ruleForm.payableUnitType == "5") &&
              ((this.formDialog.ruleForm["payableUnit"] = rowData["customerNo"]),
                (this.formDialog.ruleForm[key] = rowData["customerName"])),
              this.formDialog.ruleForm.payableUnitType == "3" &&
              ((this.formDialog.ruleForm["payableUnit"] = rowData["clientNo"]),
                (this.formDialog.ruleForm[key] = rowData["clientName"]));
            break;
          case "feeProjectName":
            this.formDialog.ruleForm["feeProject"] = rowData["financeProjectCode"];
            this.formDialog.ruleForm[key] = rowData["financeProjectName"];
            break;
          case "expensePerson":
            this.form.data[key] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "sourceBillNo":
            this.form.data[key] = rowData["entrustOrderNo"];
            break;
          case "paymentCompany":
            this.form.data["companyCode"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
            break;
          case "paymentDept":
            if (this.formDialog.isshow) {
              this.formDialog.ruleForm["departmentCode"] =
                rowData["departmentCode"];
              this.formDialog.ruleForm[key] = rowData["departmentName"];
            } else {
              this.form.data["departmentCode"] = rowData["departmentCode"];
              this.form.data[key] = rowData["departmentName"];
            }
            break;
          default:
            this.form.data.key = rowData[key];
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
    "formDialog.ruleForm.receiveUnitType" (newVal, oldVal) {
      if (!newVal) return
      this.utools.getFromconfigObj(this.formDialog.formConfig, "receiveUnitName")[
        "btn"
      ] = newVal != "4";
      this.utools.getFromconfigObj(this.formDialog.formConfig, "receiveUnitName")[
        "readonly"
      ] = newVal != "4";
      this.formDialog.formConfig = [...this.formDialog.formConfig];
      console.log(this.formDialog.formConfig[4])
      if (this.writeback) return;
      if(this.isreceiveUnitType){
        this.isreceiveUnitType = false
      }else{
        this.formDialog.ruleForm["receiveUnitName"] = "";
      }
    },
    "formDialog.ruleForm.payableUnitType" (newVal, oldVal) {
      if (!newVal) return
      this.utools.getFromconfigObj(this.formDialog.formConfig, "payableUnitName")[
        "btn"
      ] = newVal != "4";
      this.utools.getFromconfigObj(this.formDialog.formConfig, "payableUnitName")[
        "readonly"
      ] = newVal != "4";
      this.formDialog.formConfig = [...this.formDialog.formConfig];
      if (this.writeback) return;
      if(this.ispayableUnitType){
        this.ispayableUnitType = false
      }else{
        this.formDialog.ruleForm["payableUnitName"] = "";
      }
    },
    "formDialog.ruleForm.paymentType" (newVal, oldVal) {
      if (!newVal) return
      if(newVal == 1){
        this.utools.getFromconfigObj(this.formDialog.formConfig, "receiveAmount")[
          "disabled"
        ] = false;
        this.utools.getFromconfigObj(this.formDialog.formConfig, "payableAmount")[
          "disabled"
        ] = true;
        if(this.formDialog.ruleForm["payableAmount"]){
          this.formDialog.ruleForm["payableAmount"] = '';
        }
      }
      if(newVal == 2){
        this.utools.getFromconfigObj(this.formDialog.formConfig, "receiveAmount")[
          "disabled"
        ] = true;
        this.utools.getFromconfigObj(this.formDialog.formConfig, "payableAmount")[
          "disabled"
        ] = false;
        if(this.formDialog.ruleForm["receiveAmount"]){
          this.formDialog.ruleForm["receiveAmount"] = '';
        }
      }
      this.formDialog.formConfig = [...this.formDialog.formConfig];
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
      this.getOtherBillRecord();
    } else {
      try {
        let { data } = await api.getotherbillCode();
        this.form.data.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.table.data.alllist = this.form.data.otherBillBranchList || [];
      this.table.data.count = this.form.data.otherBillBranchListcount || 0;
    }
    this.form.data = { ...this.form.data };
    this.$nextTick(function () {
      this.writeback = false;
    });
  },
  beforeRouteLeave (to, form, next) {
    this.form.data.otherBillBranchList = this.table.data.alllist;
    this.form.data.otherBillBranchListcount = this.table.data.count;
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
