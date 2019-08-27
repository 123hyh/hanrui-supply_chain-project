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
import entities from "@/domain/entities/finance/Accountingwriteoff";
import formConfig from "@/domain/formconfig/finance/Accountingwriteoff";
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
import Receivesettlement from '@/domain/tableconfig/finance/Receivesettlement'
import Beoverdue from "@/domain/tableconfig/basicdata/Beoverdue";

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
    writeback: "",
    form: {
      config: formConfig,
      data: new entities(),
      isLoading: false
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
    ...mapGetters(["getActivePathData"])
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 保存主表
    async handlePreserve () {
      this.isLoading = true;
      try {
        if (this.status == "update") {
          const { data, status } = await api.updateaccountingwriteoff(this.form.data);
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          const { data, status } = await api.addaccountingwriteoff(this.form.data);
          if (status) {
            this.status = "update";
            this.$message.success("操作成功");
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
      this.$router.push("M0808");
    },

    // 点选
    async handlerSearchClick (key) {
      if (key == "sourceBillNo" && !this.form.data.sourceBillType) {
        return this.$message.warning("请选择来源单据类型");
      }
      let port = {
        sourceBillNo: {
          "1": (data = {}) => api.queryreceivesettlementSearch(data), //应收结算单
          "2": (data = {}) => api.queryoverdueinterestSearch(data) //逾期利息单
        },
        salesmanName: (data = {}) => api.queryemployeeinfoSearch(data), //员工
        delegeteBillNo: (data = {}) => api.queryentrustorderSearch(data), //委托单号
        clientName: (data = {}) => api.queryclientSearch(data), //委托方
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
        sourceBillNo: {
          "1": {
            config: Receivesettlement,
            itemKey: key,
            itemName: "应收结算单",
            queryConfig: [
              {
                label: "应收结算单编码",
                moduleBind: "billNo",
                isInput: true
              }
            ],
            isshow: true
          },
          "2": {
            config: Beoverdue,
            itemKey: key,
            itemName: "逾期利息单",
            queryConfig: [
              {
                label: "认款单号",
                moduleBind: "billNo",
                isInput: true
              }
            ],
            isshow: true
          },
        },
        salesmanName: {
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
          case "sourceBillNo":
            this.form.data.sourceBillType == "1" &&
              (this.form.data["sourceBillNo"] =
                rowData["billNo"]),
              this.form.data.sourceBillType == "2" &&
              (this.form.data["sourceBillNo"] =
                rowData["billNo"])
            break;
          case "salesmanName":
            this.form.data['salesman'] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "delegeteBillNo":
            this.form.data[key] = rowData["entrustOrderNo"];
            this.form.data["clientNo"] = rowData["clientCode"];
            this.form.data["clientName"] = rowData["clientName"];
            this.form.data["serviceCharge"] = rowData["serviceFee"];
            break;
          case "clientName":
            this.form.data["clientNo"] = rowData["clientNo"];
            this.form.data[key] = rowData["clientName"];
            break;
          case "businessManName":
            this.form.data['businessMan'] = rowData["employeeInfoCode"];
            this.form.data[key] = rowData["employeeInfoName"];
            break;
          case "chargeItem":
            this.form.data["chargeItemCode"] = rowData["financeProjectCode"];
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
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.tableDialog.ruleForm = {};
    }
  },
  watch: {
    "form.data.sourceBillType" (newVal, oldVal) {
      if (this.writeback) return;
      this.form.data["sourceBillNo"] = "";
      this.form.data = { ...this.form.data };
    }
  },
  async created () {
    api.initSelect(this.form.config);
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
    } else {
      try {
        let { data } = await api.getaccountingwriteoffCode();
        this.form.data.billNo = data;
        this.form.data.bizDate = new Date().toJSON().slice(0, 10) + " 00:00:00";
        this.form.data.billState = "1";
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
    }
    this.form.data = { ...this.form.data };
    this.$nextTick(function () {
      this.writeback = false;
    });
  },
  beforeRouteLeave (to, form, next) {
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
.el-form-item.formitem.el-form-item--mini.textarea {
  flex-basis: 80%;
}
</style>
