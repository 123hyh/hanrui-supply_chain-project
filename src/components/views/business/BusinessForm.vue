<template>
  <div class="Box BusinessForm">
    <!-- 操作按钮  -->
    <preserve-btn
      :billsStatus="businessForm.status"
      :form='businessForm'
      :isLoading="isLoading"
      @handleRollback="handleRollback"
      @handlePreserve="handlePreserve"
      @handleVerify="handleVerify"
    ></preserve-btn>

    <!-- 输入框 -->

    <div>
      <form-config
        :inputKey="businessKey"
        :formModel="businessForm"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch="rousePopover"
      ></form-config>
    </div>

    <!-- tab页签 -->

    <div>
      <el-tabs
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
        class="tabs-defined"
      >
        <el-tab-pane
          label="商机推进记录"
          name="follow"
          :disabled="tabIsDisabled"
        ></el-tab-pane>
        <el-tab-pane
          label="联系人"
          name="contact"
          :disabled="tabIsDisabled"
        ></el-tab-pane>
        <el-tab-pane
          label="业务员列表"
          name="salesman"
          :disabled="tabIsDisabled"
        ></el-tab-pane>

        <!-- 表格 -->

        <div class="handleTableHeight">
          <div
            class="mb-10"
            v-if="!tabIsDisabled"
          >
            <div>
              <el-button
                v-for="(val,key) of itemList"
                @click.stop='openTabForm(key)'
                :key="key"
              >{{val.label}}</el-button>
            </div>
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
          
        </div>
      </el-tabs>
    </div>

    <!--弹出层： 业务员列表form -->

    <el-dialog
     v-dialogDrag
      :visible.sync="popFormTab"
      :close-on-click-modal="false"
      width="1100px"
      :title="tabActiveName == 'follow' ? '商机推进记录' : tabActiveName == 'contact' ? '联系人' :'业务员列表' "
    >
      <form-config
        :inputKey="columnDataKey"
        :formModel="columnData"
        ref="columnData"
        @handlerFormConfigClickSearch="rousePopover"
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
    <popover-component
      :isShowPopover="popover.isShowPopover"
      :popoverType="popover.popoverType"
      :currencySelectInputKey="popover.currencySelectInputKey"
      :formConfig="popover.queryBarObj"
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
    ></popover-component>
  </div>
</template>
<script>
// 引入公共的table组件
import FormConfig from "@/components/common/FormConfig";
import Pagination from "@/components/common/Pagination";
import Business from "@/domain/entities/business/Business";
import BusinessFormConfig from "@/domain/formconfig/business/Business";
import api from "@/assets/js/appHelper.js";

import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

// 引入vuex
import { mapGetters, mapActions, mapMutations } from "vuex";
let ColumnData = "";
export default {
  name: 'BusinessForm',
  components: {
    PopoverComponent: () => import("@/components/common/Popover.vue"),
    FormConfig,
    Pagination,
    TableComponent
  },
  data () {
    return {
      popover: {
        //弹出框组件参数
        isShowPopover: false, // 弹窗显示
        queryBarObj: [], // 弹出框查询栏
        queryCode: "", // 查询字段
        configUrl: "", // 文件路径
        popoverType: "table", // 弹出框
        currencySelectInputKey: "", //弹出框选中对应的key值
        popoverListKey: [], // 弹出框表头绑定的 key
        popoverList: [], // 表格数据
        count: 0, // 分页数据总条数
        ruleForm: {}, // 查询栏的model绑定
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        itemName: "", // 弹窗标题
        apiKey: "", //弹窗内部的接口
        busiUnit: "busiUnit" //改变的经营单位弹出列表
      },
      tabIsDisabled: true, // 禁用tab
      tabActiveName: "", // 激活tab菜单
      // 主form
      verify: {}, // 表单验证
      jumpType: "",
      curRowData: "",
      isLoading: false,
      businessForm: new Business(),
      businessKey: BusinessFormConfig,
      /*********** 业务员列表data start***********/
      // table
      dataTab: [],
      // table - 列
      columnDataTable: "",
      // 查询条件 form
      queryTableData: {},
      // 新增form
      columnData: "",
      columnDataKey: "",
      //form弹出框
      popFormTab: false
      /*********** 业务员列表data end***********/
    };
  },
  computed: {
    ...mapGetters(["btnType", "getActivePathData"]),
    itemList () {
      if (+this.businessForm.status <= 1) {
        return {
          create: { label: '新增' },
          update: { label: '修改' },
          delete: { label: '删除' }
        }
      }
      return {}
    }
  },
  methods: {
    
    /************************** 弹窗methods start *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     * @method ...mapMutations vuex提交事件 ：addBtnType
     *
     */
    ...mapMutations(["addBtnType", "addbreadCrumbsList"]),
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
      if (this.businessForm[key] !== undefined || this.columnData[key] !== undefined) {
        if (key.includes("customerName")) {
          this.businessForm = {
            ...this.businessForm,
            [key]: rowData["clientName"],
            customerCode: rowData["clientNo"],
            customerShortName: rowData["clientShortName"]
          };
        } else if (key.includes("salesmanName")) {
          if (this.popover.isShowPopover) {
            this.columnData = {
              ...this.columnData,
              [key]: rowData["employeeInfoName"],
              salesmanId: rowData["employeeInfoCode"]
            };
            return;
          }
          this.businessForm = {
            ...this.businessForm,
            [key]: rowData["employeeInfoName"],
            salesmanId: rowData["employeeInfoCode"]
          };
        } else if (key.includes("deptName")) {
          this.columnData = {
            ...this.columnData,
            [key]: rowData["departmentName"],
            deptId: rowData["departmentCode"]
          };
        } else if (key.includes("deliveryNo")) {
          this.businessForm[key] = rowData["scheduleBaseCode"];
        }
      }
    },
    popoverParamsFn (pop) {
      this.popover = { ...this.popover, ...pop };
    },
    rousePopover (key) {
      if (this.businessForm[key] !== undefined || this.columnData[key] !== undefined) {
        let popover = {
          customerName: {
            queryCode: "clientNo",
            apiKey: "/client",
            itemName: "委托方列表",
            configUrl: "business/Client"
          },
          salesmanName: {
            queryCode: "employeeInfoCode",
            apiKey: "/employeeinfo",
            itemName: "员工资料",
            configUrl: "basicdata/EmployeeInfo"
          },
          deptName: {
            queryCode: "departmentCode",
            apiKey: "/department",
            itemName: "部门资料",
            configUrl: "system/Department"
          },
          deliveryNo: {
            queryCode: "busEntrustNo",
            apiKey: "/hkschedulebase",
            itemName: "上货计划",
            configUrl: "logistics/HkscheduleBase"
          }
        };
        let allKey = ["customerName", "salesmanName", "deptName"];
        let thisKey = allKey.includes(key) ? key : "deliveryNo";
        this.popoverParamsFn(popover[thisKey]);
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(
              this.popover.apiKey,
              { ...this.popover.ruleForm, status: '2' }
            );
            this.popover.count = count;
            this.popover.queryBarObj = [
              {
                label: "编码",
                moduleBind: this.popover.queryCode,
                isInput: true
              }
            ];
            this.popover.popoverListKey = require("@/domain/tableconfig/" +
              this.popover.configUrl).default;
            this.popover.popoverList = list;
          } catch (error) {
            console.log(error);
          }
          this.popover.ruleForm = {};
        }
      };
      this.popover.currencySelectInputKey = key;
      key && currencyObj[key]();
      this.popover.isShowPopover = !this.popover.isShowPopover;
    },
    //分页
    handlePageChange (paper) {
      this.popover.ruleForm = { ...this.popover.ruleForm, ...paper };
      this.handleBtnClick("search"); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    isVerify () {
      let isVerify = false;
      this.verify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    //保存主表单
    handlePreserve () {
      if (this.jumpType == "update") {
        this.verify["formModel"].validate(async valid => {
          if (valid) {
            this.isLoading = true;
            try {
              const { data } = await api.editData(
                "/business",
                this.businessForm
              );
              if (data) {
                // 提交成功后...
                this.$message.success("修改成功");
                this.tabIsDisabled = false; //激活tab
                this.tabActiveName = "follow";
                this.handlerTabClick({ name: "follow" }); //初始化tab
              }
            } catch (e) {
              console.log(e);
            } finally {
              this.isLoading = false;
            }
          }
        });
      } else {
        this.verify["formModel"].validate(async valid => {
          if (valid) {
            this.isLoading = true;
            try {
              const { data } = await api.addData(
                "/business",
                this.businessForm
              );
              this.businessForm.status = data.status || "1";
              if (data) {
                // 提交成功后...
                this.$message.success("保存成功");
                this.tabIsDisabled = false; //激活tab
                this.tabActiveName = "follow";
                this.handlerTabClick({ name: "follow" }); //初始化tab
              }
            } catch (e) {
              console.log(e);
            } finally {
              this.isLoading = false;
            }
          }
        });
      }
    },
    handleVerify () {
      console.log("handleVerify");
    },
    //分页
    async handleTabPageChange (paper) {
      const {
        data: { list, count }
      } = await api.querySearch(
        "/business" + this.tabActiveName.toLowerCase(),
        paper
      );
      this.dataTab = list;
      this.utools.turnCodeBoolean(this.dataTab);
      this.queryTableData.count = count;
    },
    handleRollback () {
      this.$router.push("M0202");
    },
    // 第一个字母转大写
    capitalize ([first, ...rest]) {
      return first.toUpperCase() + rest.join("");
    },
    async handlerTabClick ({ name } = tab, event) {
      ColumnData = require("@/domain/entities/business/Business" +
        this.capitalize(name)).default;
      this.columnData = new ColumnData();
      this.columnDataTable = require("@/domain/tableconfig/business/Business" +
        this.capitalize(name)).default;
      this.columnDataKey = require("@/domain/formconfig/business/Business" +
        this.capitalize(name)).default;
      api.initSelect(this.columnDataKey);
      this.handleTabPageChange({
        pageIndex: 1,
        businessNo: sessionStorage.businessNo
      });
      this.curRowData = {}; // 清空当前行数据
    },
    /*************** 业务员列表methods start******************/
    // 新增修改
    async saveTab () {
      if (this.isVerify()) {
        console.log(this.btnType);
        // 验证成功
        if (this.btnType == "create") {
          const { data: addData } = await api.addData(
            "/business" + this.tabActiveName,
            this.columnData
          );
          if (addData) {
            // 提交成功后...
            this.$message.success("保存成功");
            this.popFormTab = false; //关闭弹窗
            this.handlerTabClick({ name: this.tabActiveName });
          }
        } else {
          const { data: editData } = await api.editData(
            "/business" + this.tabActiveName,
            this.columnData
          );
          if (editData) {
            // 提交成功后...
            this.$message.success("修改成功");
            this.popFormTab = false; //关闭弹窗
            this.handlerTabClick({ name: this.tabActiveName });
          }
        }
      }
    },
    // 是否新增修改
    async openTabForm (btnType) {
      let curRowData = this.curRowData;
      if (btnType == "update" && curRowData.itemCode) {
        const { data: searchOneData } = await api.searchOneData(
          "/business" + this.tabActiveName,
          {
            itemCode: curRowData.itemCode
          }
        );
        curRowData = searchOneData;
      }
      // 拿数据
      this.columnData = btnType == "create" ? new ColumnData() : curRowData;
      //显示空选提示语
      if (btnType != "create" && JSON.stringify(curRowData) == "{}") {
        this.$message.error("请选择数据");
      } else if (btnType != "delete") {
        this.columnData.businessNo = sessionStorage.businessNo;
        this.addBtnType(btnType); //vuex提交
        this.popFormTab = true;
      }
      // 确认删除
      if (btnType == "delete" && JSON.stringify(curRowData) != "{}") {
        this.utools.deleteMessage.bind(this)(async () => {
          try {
            const { data, status } = await api.deleteData(
              "/business" + this.tabActiveName,
              curRowData.itemCode
            );
            this.utools.alertMessage.bind(this)(status, null, "删除");
            this.handlerTabClick({ name: this.tabActiveName }); //数据刷
          } catch (e) {
            console.log(e);
          }
        });
      }
    },
    async loadBusinessNo () {
      //加载编号
      let { data } = await api.getbusinessCode();
      sessionStorage.businessNo = this.businessForm.businessNo = data;
    },
    // 取消弹窗
    closeTabForm () {
      this.popFormTab = false;
    },
    // 选中当前行
    clickTabRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
    }
    /*************************** 业务员列表methods end ****************** */
  },
  created () {
    api.initSelect(this.businessKey);
    // 切换路由数据保存
    let { formData = {}, status } = this.getActivePathData(this.$route.path);
    formData && (this.businessForm = formData);
    this.jumpType = status;
    if (this.jumpType == "update") {
      this.tabIsDisabled = false;
      this.businessForm = JSON.parse(sessionStorage.curRowData);
      sessionStorage.businessNo = this.businessForm.businessNo;
      this.tabActiveName = "follow";
      this.handlerTabClick({ name: this.tabActiveName });
    } else {
      this.loadBusinessNo(); //加载编号
    }
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.businessForm, status: this.jumpType },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less">
.Box,
.BusinessForm {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .handleTableHeight {
    height: 48vh;
  }
  .tabs-defined {
    > :first-child {
      > div > div > div {
        > :first-child::before {
          content: "*";
          color: red;
        }
      }
    }
  }
}
</style>
