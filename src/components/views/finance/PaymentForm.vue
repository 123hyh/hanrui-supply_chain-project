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
      :formConfig="form.config"
      :formModel="form.data"
      :calculate='calculate'
      @handlerSearchClick="handlerSearchClick"
    ></form-component>
    <!-- 页签 -->
    <div style="margin:20px 0 20px 0">
      <el-tabs
        v-model="active"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="formDialogOne.itemName"
          name="onemodel"
        ></el-tab-pane>
      </el-tabs>
      <div v-show="(+form.data.status || 0) <= 1">
        <el-button @click="openItemdetail('add')">新增</el-button>
        <el-button @click="openItemdetail('update')">修改</el-button>
        <el-button @click="deleteItemdetail()">删除</el-button>
      </div>

    </div>
    <!-- 表格 -->
    <table-component
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
    <!-- 表单弹窗 -->
    <popover-component
      :popoverType="'form'"
      :isShowPopover="formDialog.isshow"
      :itemName="formDialog.itemName"
      :formData="formDialog"
      @handlerFormConfigClickSearch="handlerSearchClick"
      @formClickPreservation="operation"
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
    <el-dialog
      :close-on-click-modal="false"
      title="会计科目"
      :visible.sync="subjectsVisible"
      width="1160px"
    >
      <subjects @handlerNodeClick='nodeClick'></subjects>
      <div class="btn-right">
        <el-button @click.stop="subjectsVisible = false">取消</el-button>
        <el-button @click.stop="subjectssave">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 组件
import FormComponent from "@/components/common/form-template/FormComponent.vue";
import TableComponent from "@/components/common/TabTable.vue";
import Pagination from "@/components/common/Pagination";
import PopoverComponent from "@/components/common/Popover.vue";
import api from "@/assets/js/appHelper.js";
// 表单表格
import entities from "@/domain/entities/finance/Payment";
import formConfig from "@/domain/formconfig/finance/Payment";
// 子表
import entitiesOne from "@/domain/entities/finance/Paymentdetail";
import tableConfigOne from "@/domain/tableconfig/finance/Paymentdetail";
import formConfigOne from "@/domain/formconfig/finance/Paymentdetail";
import entitiesTwo from "@/domain/entities/finance/Paymentsettlement";
import tableConfigTwo from "@/domain/tableconfig/finance/Paymentsettlement";
import formConfigTwo from "@/domain/formconfig/finance/Paymentsettlement";
// 弹窗
import entrustOrder from "@/domain/tableconfig/commerce/EntrustOrder.js";
import SupplierBase from "@/domain/tableconfig/basicdata/SupplierBase.js";
import Client from "@/domain/tableconfig/business/Client.js";
import ClientBank from "@/domain/tableconfig/business/ClientBank.js";
import Customer from "@/domain/tableconfig/basicdata/Customer.js";
import CustomerBank from "@/domain/tableconfig/basicdata/CustomerBank.js";
import CompanyInfo from "@/domain/tableconfig/basicdata/CompanyInfo.js";
import Department from "@/domain/tableconfig/system/Department.js";
import taxTypeName from "@/domain/tableconfig/basicdata/TaxCategory.js";
import FinanceProject from "@/domain/tableconfig/basicdata/FinanceProject";
import Payapply from "@/domain/tableconfig/finance/Payapply";
import SupplierBank from "@/domain/tableconfig/basicdata/SupplierBank.js";
import CompanyInfoBank from '@/domain/tableconfig/basicdata/CompanyInfoBank.js'
import Receivesettlement from '@/domain/tableconfig/finance/Receivesettlement'
// 会计科目
import Subjects from "@/components/views/basicdata/subjects.vue";
import utools from '@/domain/common/utools.js'
import { mapMutations, mapGetters } from "vuex";
import { async } from "q";
import { truncate } from 'fs';
export default {
  components: {
    FormComponent,
    TableComponent,
    Pagination,
    PopoverComponent,
    Subjects
  },
  data: () => ({
    status: "",
    statusitem: '',
    writeback: "",
    form: {
      config: utools.cloneObj(formConfig),
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
      itemName: "付款信息",
      isshow: false
    },
    formDialogTwo: {
      formConfig: formConfigTwo,
      ruleForm: new entitiesTwo(),
      itemName: "对方的科目核算项目",
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
    },
    subjectsVisible: false,
    subjectsData: '',
  }),
  computed: {
    ...mapGetters(["getActivePathData", 'exchangeRate']),
    exchangeRateList () {
      return this.utools.pullDownCurrency(this.exchangeRate)
    },
    calculate () {
      return {
        baseCurrency: (this.form.data.payAmount || 0) * (this.exchangeRateList[this.form.data.payMoneyType] || 0),
        exchangeRate: this.exchangeRateList[this.form.data.payMoneyType] || 0
      }
    },
    table () {
      if (this.active == "onemodel") {
        return this.tableOne;
      } else {
        return this.tableTwo;
      }
    },
    formDialog () {
      if (this.active == "onemodel") {
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
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 保存主表
    async handlePreserve () {
      this.isLoading = true;
      try {
        if (this.status == "update") {
          const { data, status } = await api.editpaymentData(this.form.data);
          if (status) {
            this.$message.success("操作成功");
          }
        } else {
          this.form.data.paymentdetailList = this.tableOne.data.alllist;
          const { data, status } = await api.addpaymentData(this.form.data);
          this.$set(this.form.data, 'status', '1')
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
      this.$router.push("M0810");
    },

    // 覆盖（带出）子表
    async writeItemdetail () {
      try {
        const { data, status } = await api.querypayapplydetailSearch({
          billNo: this.form.data.delegeteBillNo,
          pageIndex: null,
          pageSize: null
        });
        var alllist = data.list.filter((item) => { return !(item.actualPayAmount >= item.recordedAmount) })
        // 付款申请的受托方付款列表
        alllist.map(item => {
          item.billNo = this.form.data.billNo;
          item.delegeteBillNo = this.form.data.delegeteBillNo;
          item.entrustPayAmount = item.applyPayAmount;
        });
        this.tableOne.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.tableOne.data.count = data.count;
      } catch (e) {
        this.$message.error("查询失败，请重试");
        return;
      }
      // 批量替换
      if (this.status == "update") {
        try {
          const { data, status } =
            this.active == "onemodel"
              ? await api.batchpaymentdetailData(
                this.tableOne.data.alllist
              )
              : await api.batchpaymentdetailData(
                this.tableTwo.data.alllist
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
      let rule = {
        billNo: this.form.data.billNo,
        pageIndex: null,
        pageSize: null
      };
      let getListOne = async _ => {
        const { data, status } = await api.querypaymentdetailSearch(
          rule
        );
        this.tableOne.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.tableOne.data.count = data.count;
      };
      let getListTow = async _ => {
        const { data, status } = await api.querypaymentdetailSearch(
          rule
        );
        this.tableTwo.data.alllist = JSON.parse(JSON.stringify(data.list));
        this.tableTwo.data.count = data.count;
      };
      try {
        await Promise.all([getListOne()]);
        this.table.data = { ...this.table.data };
      } catch (e) {
        this.$message.error("查询失败");
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
      this.openItemdetail("update");
    },
    // 打开子表操作
    openItemdetail (jap) {
      this.statusitem = jap
      if (jap == "update" && !this.table.rowData.itemCode) {
        this.$message.warning("请选择一条数据");
        return;
      }
      jap == "update" && (this.formDialog.ruleForm = this.table.rowData);
      jap == "add" && (this.formDialog.ruleForm = {}, this.formDialog.ruleForm.billNo = this.form.data.billNo, this.getitemCode());
      this.formDialog.isshow = true;
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
    // 关闭子表操作
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    //弹窗操作
    operation () {
      if (this.statusitem == 'update') {
        this.updateItemdetail()
      } else {
        this.addItemdetail()
      }
    },
    // 增加子表
    async addItemdetail () {
      this.table.data.alllist.splice(0, 0, this.formDialog.ruleForm);
      this.table.data.count++;
      if (this.status == "update") {
        try {
          const { data, status } =
            this.active == "onemodel"
              ? await api.addpaymentdetail(this.formDialog.ruleForm)
              : await api.addpaymentdetail(this.formDialog.ruleForm);
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
              this.active == "onemodel"
                ? await api.updatepaymentdetail(
                  this.formDialog.ruleForm
                )
                : await api.updatepaymentdetail(
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
              this.active == "onemodel"
                ? await api.removepaymentdetail(
                  this.table.rowData.itemCode
                )
                : await api.removepaymentdetail(
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
      if (key == "receiverName" && !this.form.data.receiverType) {
        return this.$message.warning("请虚选择收款人类型");
      }
      if (key == "receiverAccount" && !this.form.data.receiverName) {
        return this.$message.warning("请虚选择收款人名称");
      }
      if ((key == "paymentAccount" || key == "paymentBank") && !this.form.data.companyName) {
        return this.$message.warning("请选择公司");
      }
      if (key == "paymentSubject") {
        // 会计科目
        return this.subjectsVisible = true
      }
      let port = {
        delegeteBillNo: (data = {}) => api.querypayapplySearch(data),
        clientName: (data = {}) => api.queryclientSearch(data),
        paymentAccount: (data = {}) => api.getCompanybankPageData(data),
        paymentBank: (data = {}) => api.getCompanybankPageData(data),
        customerName: (data = {}) => api.getCustomerList(data),
        companyName: (data = {}) => api.getCreditCompanyNameData(data),
        costCenterName: (data = {}) => api.getCreditCompanyNameData(data),
        settlementNo: (data = {}) => api.queryreceivesettlementSearch(data),
        agentPaymentCompanyName: (data = {}) =>
          api.getCreditCompanyNameData(data),
        salesGroup: (data = {}) => api.getCreditCompanyNameData(data),
        taxCategoryName: (data = {}) => api.getTaxCategoryList(data),
        departmentName: (data = {}) => api.getDepartment(data),
        feeProjectName: (data = {}) => api.getFinanceProject(data),
        receiverName: {
          "1": (data = {}) => api.querysupplierbaseSearch(data), //供应商
          "2": (data = {}) => api.getCustomerList(data), //退款客户
          "3": (data = {}) => api.queryclientSearch(data), //委托方
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerList(data) //客户
        },
        receiverAccount: {
          "1": (data = {}) => api.querysupplierbankSearch(data), //供应商银行账户
          "2": (data = {}) => api.getCustomerBan(data), //退款客户银行账户
          "3": (data = {}) => api.getClientBlankData(data), //委托方银行账户
          "4": (data = {}) => "", //其它
          "5": (data = {}) => api.getCustomerBan(data) //客户银行账户
        },
        supplierName: (data = {}) => api.querysupplierbaseSearch(data),
        paymentSubject: (data = {}) => api.querysupplierbaseSearch(data),// 会计科目
      };
      console.log(key)
      const WHITE_LIST = [
        'companyName', 'agentPaymentCompanyName', 'departmentName', 'flowedOutPlannedItem', 'flowedInPlannedItem', 'costCenter', 'project', 'supplierName', 'costCenterName'
        /*  'receiverName' */
      ],
        REQ_DATA = { ...this.tableDialog.ruleForm };
      WHITE_LIST.includes(key) && (REQ_DATA.status = '2')
      key === 'receiverName' && this.form.data.receiverType !== '3' && (REQ_DATA.status = '2');
      (key === 'paymentAccount' || key === 'paymentBank') && (REQ_DATA.companyCode = this.form.data["companyCode"]);
      try {
        const {
          data: { list, count }
        } =
          key == "receiverName" || key == "receiverAccount"
            ? await port[key][this.form.data.receiverType](
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
        delegeteBillNo: {
          config: Payapply,
          itemKey: key,
          itemName: "付款申请单",
          queryConfig: [
            {
              label: "付款申请单编码",
              moduleBind: "billNo",
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
        paymentAccount: {
          config: CompanyInfoBank,
          itemKey: key,
          itemName: "银行信息",
          queryConfig: [
            {
              label: "银行账号",
              moduleBind: "bankNo",
              isInput: true
            }
          ],
          isshow: true
        },
        paymentBank: {
          config: CompanyInfoBank,
          itemKey: key,
          itemName: "银行信息",
          queryConfig: [
            {
              label: "银行账号",
              moduleBind: "bankNo",
              isInput: true
            }
          ],
          isshow: true
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
        costCenterName: {
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
        settlementNo: {
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
        supplierName: {
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
        paymentSubject: {
          config: SupplierBase,
          itemKey: key,
          itemName: "会计科目",
          queryConfig: [
            {
              label: "供应商编码",
              moduleBind: "supplierCode",
              isInput: true
            }
          ],
          isshow: true
        },
        receiverName: {
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
        agentPaymentCompanyName: {
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
      if (key == "receiverName" || key == "receiverAccount") {
        this.tableDialog = {
          ...this.tableDialog,
          ...dialogconfig[key][this.form.data.receiverType]
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
    async tableDialogPreservation (rowData, key) {
      console.log(this.exchangeRateList)
      if (key && rowData) {
        switch (key) {
          case "delegeteBillNo":
            delete rowData["status"];
            delete rowData["statusName"];
            this.form.data = { ...this.form.data, ...rowData };
            this.form.data[key] = rowData["billNo"];
            this.form.data["receiverType"] = rowData["receiverDepartmentType"]; //收款人类型
            this.form.data["receiver"] = rowData["receiverDepartment"]; //收款单位
            this.form.data["receiverName"] = rowData["receiverDepartmentName"];
            this.form.data["receiverBank"] = rowData["payBank"]; //收款银行
            this.form.data["receiverProvince"] = rowData["receiverProvence"]; //收款方省
            this.form.data['baseCurrency'] = (rowData['exchangeRate'] || 0) * (rowData['payAmount'] || 0)
            break;
          case "receiverName":
            this.form.data.receiverType == "1" &&
              ((this.form.data["receiver"] = rowData["supplierCode"]),
                (this.form.data[key] = rowData["supplierName"])),
              (this.form.data.receiverType == "2" ||
                this.form.data.receiverType == "5") &&
              ((this.form.data["receiver"] = rowData["customerNo"]),
                (this.form.data[key] = rowData["customerName"])),
              this.form.data.receiverType == "3" &&
              ((this.form.data["receiver"] = rowData["clientNo"]),
                (this.form.data[key] = rowData["clientName"]));
            this.form.data.receiverCountry =
              rowData["national"] || rowData["country"];
            this.form.data.receiverProvence = rowData["provinceName"];
            this.form.data.receiverCityCountry =
              rowData["districtName"] || rowData["countyName"];
            this.form.data["payerPhone"] = rowData["tel"];
            break;
          case "clientName":
            this.form.data["client"] = rowData["clientNo"];
            this.form.data[key] = rowData[key];
            break;
          case "receiverAccount":
            this.form.data[key] = rowData["bankCardNo"] || rowData["bankNo"];
            this.form.data["accountName"] = rowData["userName"];
            this.form.data["receiverBank"] = rowData["bankName"];
            this.form.data["backAddress"] = rowData["bankAddress"];
            this.form.data["payMoneyType"] = rowData["currency"];
            break;
          case "paymentAccount":
            this.form.data["paymentAccount"] = rowData["bankNo"];
            this.form.data["paymentBank"] = rowData["bankName"];
            break;
          case "paymentBank":
            this.form.data["paymentAccount"] = rowData["bankNo"];
            this.form.data["paymentBank"] = rowData["bankName"];
            break;
          case "departmentName":
            this.form.data["departmentCode"] = rowData["departmentCode"];
            this.form.data[key] = rowData[key];
            break;
          case "customerName":
            this.form.data["customer"] = rowData["customerNo"];
            this.form.data[key] = rowData[key];
            break;
          case "companyName":
            this.form.data["companyCode"] = rowData["companyCode"];
            this.form.data[key] = rowData[key];
            break;
          case "costCenterName":
            this.form.data["costCenter"] = rowData["companyCode"];
            this.form.data[key] = rowData['companyName'];
            break;
          case "settlementNo":
            this.form.data[key] = rowData['billNo'];
            break;
          case "agentPaymentCompanyName":
            this.form.data["agentPaymentCompany"] = rowData["companyCode"];
            this.form.data[key] = rowData["companyName"];
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
          case "supplierName":
            this.formDialog.ruleForm["supplierCode"] =
              rowData["supplierCode"];
            this.formDialog.ruleForm[key] = rowData[key];
            break;
          case "paymentSubject":
            this.formDialog.ruleForm["supplierCode"] =
              rowData["supplierCode"];
            this.formDialog.ruleForm[key] = rowData[key];
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
    },
    nodeClick (data) {
      this.subjectsData = data
    },
    subjectssave () {
      if (this.subjectsData.subjectCode == '0') {
        return this.$message.error("不能选择根节点");
      }
      this.form.data.paymentSubject = this.subjectsData.subjectCode || ''
      this.subjectsVisible = false
    }
  },
  watch: {
    "form.data.receiverType" (newVal, oldVal) {
      this.utools.getFromconfigObj(this.form.config, "receiverName")["btn"] =
        newVal != "4";
      this.utools.getFromconfigObj(this.form.config, "receiverName")[
        "readonly"
      ] = newVal != "4";
      this.utools.getFromconfigObj(this.form.config, "receiverAccount")["btn"] =
        newVal != "4";
      this.utools.getFromconfigObj(this.form.config, "receiverAccount")[
        "readonly"
      ] = newVal != "4";
      this.form.config = [...this.form.config];
      if (this.writeback) return;
      this.form.data["receiver"] = "";
      this.form.data["receiverName"] = "";
    },
    "form.data.receiver" (newVal, oldVal) {
      if (this.writeback) return;
      this.form.data["receiverAccount"] = "";
      if (newVal) return;
      this.form.data.receiverCountry = "";
      this.form.data.receiverProvence = "";
      this.form.data.receiverCityCountry = "";
      this.form.data.payerPhone = "";
    },
    "form.data.receiverAccount" (newVal, oldVal) {
      if (this.writeback) return;
      if (newVal) return;
      this.form.data["accountName"] = "";
      this.form.data["receiverBank"] = "";
      this.form.data["backAddress"] = "";
    },
    "form.data.delegeteBillNo" (newVal, oldVal) {
      if (this.writeback || newVal == oldVal) return;
      this.writeItemdetail();
    }
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
        let { data } = await api.getpaymentCode();
        this.form.data.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
      this.tableOne.data.alllist =
        this.form.data.paymentdetailList || [];
      this.tableOne.data.count =
        this.form.data.paymentdetailListcount || 0;
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
      this.form.data.paymentdetailList = this.tableOne.data.alllist;
      this.form.data.paymentdetailListcount = this.tableOne.data.count;
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
.btn-right {
  text-align: right;
  margin: 25px 0 0 0;
  & > button {
    margin-left: 30px !important;
  }
}
</style>
