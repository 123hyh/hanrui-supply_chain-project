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
    <div style="margin:15vh 0 20px 0">
      <el-tabs
        v-model="active"
        type="card"
      >
        <el-tab-pane
          :label="formDialog.itemName"
          name="onemodel"
        >
          <el-button @click="openItemdetail('add')">增加</el-button>
          <el-button @click="openItemdetail('update')">修改</el-button>
          <el-button @click="deleteItemdetail()">删除</el-button>
          <!-- 表格 -->
          <table-component
            style="margin-top: 20px;"
            :tableDataKey="table.config"
            :tableData="tableDataList"
            @TableClickRowData="TableClickRowData"
            @handleDbclickTable="handleDbclickTable"
          ></table-component>
          <!-- 分页 -->
          <pagination
            ref="pagination"
            :count="table.data.count"
            @handlePageChange="handleChange"
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
import entities from "@/domain/entities/finance/InvoiceReceipt";
import formConfig from "@/domain/formconfig/finance/InvoiceReceipt";
// 子表
import entitiesOne from "@/domain/entities/finance/InvoiceReceiptItem";
import tableConfigOne from "@/domain/tableconfig/finance/InvoiceReceiptItem";
import formConfigOne from "@/domain/formconfig/finance/InvoiceReceiptItem";
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
import ShipmentBase from "@/domain/tableconfig/logistics/ShipmentBase.js";

import { mapMutations, mapGetters } from "vuex";
export default {
  name: 'InvoiceReceiptForm',
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
      itemName: "展示",
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
          const { data, status } = await api.updateinvoicereceipt(this.form.data);
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          this.form.data.invoiceReceiptItemList = this.table.data.alllist;
          const { data, status } = await api.addinvoicereceipt(this.form.data);
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
    handlebackspacing () {
      this.$router.push("M0816");
    },

    // 覆盖（带出）子表
    async writeItemdetail (rowData) {
      let one = { ...rowData, ...this.form.data }
      delete one['status']
      delete one['statusName']
      try {
        let { data } = await api.getitemCode();
        one.itemCode = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.table.data.alllist.push(JSON.parse(JSON.stringify(one)))
      // 批量替换
      if (this.status == "update") {
        try {
          const { data, status } = await api.batchinvoicereceiptitem(
            this.table.data.alllist
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
        const { data, status } = await api.queryinvoicereceiptitemSearch({
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
        this.formDialog.ruleForm.itemCode = data;
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
        this.itemstatus = "update";
      } else {
        this.formDialog.ruleForm = {};
        this.formDialog.ruleForm.billNo = this.form.data.billNo;
        this.getitemCode();
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
          const { data, status } = await api.addinvoicereceiptitem(
            this.formDialog.ruleForm
          );
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
        item => item.billNo == this.table.rowData.billNo
      );
      if (dataIndex != -1) {
        this.table.data.alllist.splice(dataIndex, 1, this.formDialog.ruleForm);
        if (this.status == "update") {
          try {
            const { data, status } = await api.updateinvoicereceiptitem(
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
            const { data, status } = await api.removeinvoicereceiptitem(
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
    handleChange (paper) {
      this.table.ruleForm.pageIndex = paper.pageIndex;
      this.table.ruleForm.pageSize = paper.pageSize;
      this.table.data = { ...this.table.data };
    },
    // 点选
    async handlerSearchClick (key) {
      if (key == "sourceBillNo" && !this.form.data.sourceBillType) {
        return this.$message.warning("请选择来源单据类型");
      }
      let port = {
        outOrderCode: (data = {}) => api.queryShipmentbase(data), //发运单据
        customerName: (data = {}) => api.getCustomerList(data), //客户
        receiverName: (data = {}) => api.queryemployeeinfoSearch(data), //员工
        delegeteBillNo: (data = {}) => api.queryentrustorderSearch(data), //委托单号
        delegeteName: (data = {}) => api.queryclientSearch(data), //委托方
        businessManName: (data = {}) => api.queryemployeeinfoSearch(data), //员工
        chargeItem: (data = {}) => api.queryfinanceprojectSearch(data) //计费项目
      };
      try {
        const {
          data: { list, count }
        } =
          key == "sourceBillNo"
            ? await port[key][this.form.data.sourceBillType](
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
        outOrderCode: {
          config: ShipmentBase,
          itemKey: key,
          itemName: "发运单",
          queryConfig: [
            {
              label: "发运单编码",
              moduleBind: "shipmentBaseCode",
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
        receiverName: {
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
        delegeteName: {
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
        businessManName: {
          config: EmployeeInfo,
          itemKey: key,
          itemName: "员工资料",
          queryConfig: [
            {
              label: "员工编码",
              moduleBind: "employeeInfoCode",
              isInput: true
            }
          ],
          isshow: true
        },
        chargeItem: {
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
      if (key == "sourceBillNo") {
        this.tableDialog = {
          ...this.tableDialog,
          ...dialogconfig[key][this.form.data.sourceBillType]
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
          case "outOrderCode":
            this.form.data[key] = rowData["shipmentBaseCode"];
            // this.writeItemdetail(rowData);
            break;
          case "customerName":
            this.form.data["customer"] = rowData["customerNo"];
            this.form.data[key] = rowData["customerName"];
            break;
          case "receiverName":
            if (this.formDialog.isshow) {
              this.formDialog.ruleForm["receiver"] = rowData["employeeInfoCode"];
              this.formDialog.ruleForm[key] = rowData["employeeInfoName"];
            } else {
              this.form.data["receiver"] = rowData["employeeInfoCode"];
              this.form.data[key] = rowData["employeeInfoName"];
            }
            break;
          case "delegeteBillNo":
            this.form.data[key] = rowData["entrustOrderNo"];
            this.form.data["delegete"] = rowData["clientCode"];
            this.form.data["delegeteName"] = rowData["clientName"];
            this.form.data["serviceCharge"] = rowData["serviceFee"];
            break;
          case "delegeteName":
            this.form.data["delegete"] = rowData["clientNo"];
            this.form.data[key] = rowData["clientName"];
            break;
          case "businessManName":
            this.form.data["businessMan"] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "chargeItem":
            this.form.data["chargeItem"] = rowData["financeProjectCode"];
            break;
          default:
            this.form.data.key = rowData[key];
            break;
        }
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
      try {
        let { data } = await api.getinvoicereceiptCode();
        this.form.data.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.table.data.alllist = this.form.data.invoiceReceiptItemList || [];
      this.table.data.count = this.form.data.invoiceReceiptItemListcount || 0;
    }
    this.form.data = { ...this.form.data };
    this.$nextTick(function () {
      this.writeback = false;
    });
  },
  beforeRouteLeave (to, form, next) {
    this.form.data.invoiceReceiptItemList = this.table.data.alllist;
    this.form.data.invoiceReceiptItemListcount = this.table.data.count;
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
