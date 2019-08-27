<template>
  <div class="AddCreditBox delivery-schedule-base-form">
    <!-- 保存 返回 按钮 -->
    <div class="btnBottom">
      <preserve-btn
      :form='domainMap.SzscheduleBaseEntity'
        @handlePreserve="handlePreserve"
        @handleRollback="handleRollback"
        @handleExport='handleExport'
        :isLoading="isLoading"
      ></preserve-btn>
    </div>
    <!-- tab -->
    <div>
      <el-tabs
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
      >
        <el-tab-pane
          label="基本信息"
          name="SzscheduleBase"
        ></el-tab-pane>
        <el-tab-pane
          label="相关信息"
          name="SzscheduleRele"
          :disabled="tabIsDisable"
        ></el-tab-pane>
        <el-tab-pane
          label="核对信息"
          name="SchedulCheckingInfo"
          :disabled="tabIsDisable"
        ></el-tab-pane>
        <!-- 输入框 -->
        <div class="handleTableHeight">
          <form-template
            :entity="columnData"
            :formConfig="columnDataKey"
          ></form-template>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import api from "@/assets/js/appHelper.js";
import utools from "@/domain/common/utools.js";
// 引入公共的table组件
import TabTable from "@/components/common/TabTable.vue";
import FormTemplate from "@/components/common/form/index";
//基本信息
import SzscheduleBaseEntity from "@/domain/entities/logistics/HkscheduleBase";
import SzscheduleBaseForm from "@/domain/formconfig/logistics/HkscheduleBase";
//相关信息
import SzscheduleReleEntity from "@/domain/entities/logistics/HkscheduleRele";
import SzscheduleReleForm from "@/domain/formconfig/logistics/HkscheduleRele";
//核对信息
import SchedulCheckingInfoEntity from "@/domain/entities/logistics/HkschedulCheckingInfo";
import SchedulCheckingInfoForm from "@/domain/formconfig/logistics/HkschedulCheckingInfo";

import { mapMutations, mapGetters } from "vuex";

const selectKey = [
  {
    label: "itemValue",
    value: "itemKey"
  }
];
let ColumnData = "";
export default {
  name: "SzscheduleBaseForm",
  components: {
    Popover: () => import("@/components/common/Popover.vue"),
    TabTable,
    FormTemplate
  },
  data () {
    return {
      tabIsDisable: true,
      status: "",
      isLoading: false,
      routeCode: "",
      domainMap: {
        SzscheduleBaseEntity: {},
        SzscheduleReleEntity: {},
        SchedulCheckingInfoEntity: {}
      },
      // tab菜单切换控制
      tabActiveName: "SzscheduleBase",
      // 新增form
      columnData: {},
      columnDataKey: [],
      /*************弹窗data 组件参数 *****************/
      isShowPopover: false, // 弹出框
      itemName: "香港上货计划单",
      // querybar
      apiKey: "",
      queryPopForm: {
        pageIndex: 1,
        pageSize: 10
      },
      searchFormConfig: [],
      // table
      popoverList: [], // 弹出框需要的数据
      popoverListKey: [], // 弹出框表头显示列的key值
      currencySelectInputKey: "" // 当前选中数据对应的输入框
      /************* 弹窗data end *****************/
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"])
  },
  created () {
    this.routeCode = this.$route.query.scheduleBaseCode;
    this.getSzschedulebase().then(_ => {
      this.handlerTabClick({ name: "SzscheduleBase" });
      api.initSelect(this.columnDataKey);
    });
    {
      this.status === "update" &&
        !utools.judgeNullObj(this.domainMap.SzscheduleReleEntity) &&
        !utools.judgeNullObj(this.domainMap.SchedulCheckingInfoEntity) &&
        (this.getSzschedulerele(), this.getSchedulcheckinginfo());
    }
  },
  watch: {
    tabActiveName (cur, pre) { }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 导出单据
    async handleExport () {
      try {
        this.utools.downFile(`/szschedulebase/export/${this.domainMap.SzscheduleBaseEntity.scheduleBaseCode}`)
      } catch (error) {
        this.$message({
          type: 'error',
          message: '导出失败, 请重试！'
        })
        console.log(error)
      }
    },

    async getSzschedulebase () {
      const {
        formData: {
          SzscheduleBaseEntity: SzscheduleBaseEntitys,
          SzscheduleReleEntity,
          SchedulCheckingInfoEntity
        },
        status
      } = this.getActivePathData(this.$route.path);
      this.status = status;
      status === "update" && (this.tabIsDisable = false);
      if (SzscheduleBaseEntitys) {
        this.domainMap = {
          SzscheduleBaseEntity: SzscheduleBaseEntitys,
          SzscheduleReleEntity,
          SchedulCheckingInfoEntity
        };
        this.routeCode = SzscheduleBaseEntitys.scheduleBaseCode;
      } else {
        this.domainMap.SzscheduleBaseEntity = new SzscheduleBaseEntity();
      }
      return;
    },
    async getSzschedulerele () {
      if (this.routeCode) {
        let { data } = await api.getSzschedulerele(this.routeCode);
        this.domainMap.SzscheduleReleEntity =
          data || new SzscheduleReleEntity();
      } else {
        this.domainMap.SzscheduleReleEntity = new SzscheduleReleEntity();
      }
    },
    async getSchedulcheckinginfo () {
      if (this.routeCode) {
        let { data } = await api.getSchedulcheckinginfo(this.routeCode);
        this.domainMap.SchedulCheckingInfoEntity =
          data || new SchedulCheckingInfoEntity();
      } else {
        this.domainMap.SchedulCheckingInfoEntity = new SchedulCheckingInfoEntity();
      }
    },
    //保存-基本信息
    async saveSzschedulebase () {
      if (this.columnData.scheduleBaseCode) {
        return api.updateSzschedulebase(this.columnData);
      } else {
        let { data } = await api.getCommonCodeNo("SZJH");
        this.columnData.scheduleBaseCode = data;
        return api.addSzschedulebase(this.columnData);
      }
    },
    //保存-相关信息
    saveSzschedulerele () {
      if (this.columnData.scheduleBaseCode) {
        return api.updateSzschedulerele(this.columnData);
      } else {
        this.columnData.scheduleBaseCode = this.domainMap.SzscheduleBaseEntity.scheduleBaseCode;
        return api.addSzschedulerele(this.columnData);
      }
    },
    //保存-核对信息
    saveSchedulcheckinginfo () {
      if (this.columnData.scheduleBaseCode) {
        return api.updateSchedulcheckinginfo(this.columnData);
      } else {
        this.columnData.scheduleBaseCode = this.domainMap.SzscheduleBaseEntity.scheduleBaseCode;
        return api.addSchedulcheckinginfo(this.columnData);
      }
    },
    //保存主表单
    handlePreserve () {
      this.isLoading = true;
      let promis;
      switch (this.tabActiveName) {
        case "SzscheduleBase":
          promis = this.saveSzschedulebase();
          break;
        case "SzscheduleRele":
          promis = this.saveSzschedulerele();
          break;
        case "SchedulCheckingInfo":
          promis = this.saveSchedulcheckinginfo();
          break;
      }
      promis.then(data => {
        this.domainMap.SzscheduleBaseEntity = {
          ...this.domainMap.SzscheduleBaseEntity,
          status: "1"
        };
        this.isLoading = false;
        if (data) {
          this.tabActiveName === "SzscheduleBase" &&
            this.status === "add" &&
            (this.tabIsDisable = false);
          this.$message({ type: "success", message: "保存成功!" });
        } else {
          this.$message.error("保存失败!");
        }
      });
    },
  
    //tab切换
    handlerTabClick ({ name }) {
      switch (this.tabActiveName) {
        case "SzscheduleBase":
          this.columnData = this.domainMap.SzscheduleBaseEntity;
          this.columnDataKey = SzscheduleBaseForm;
          break;
        case "SzscheduleRele":
          this.columnData = this.domainMap.SzscheduleReleEntity;
          this.columnDataKey = SzscheduleReleForm;
          break;
        case "SchedulCheckingInfo":
          this.columnData = this.domainMap.SchedulCheckingInfoEntity;
          this.columnDataKey = SchedulCheckingInfoForm;
          break;
      }
    },
    handleRollback () {
      this.$router.push("M0709");
    },
    /************************** 弹窗methods start *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
      var obj = null;
      return function (type, clear) {
        console.log(type, clear);
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
            } = await api.querySearch(this.apiKey, this.queryPopForm);
            this.queryPopForm.total = count;
            this.popoverList = list;
          } catch (e) {
            console.log(e);
          }
          // 清空查询数据
          this.searchFormConfig.map((e, i) => {
            if (this.queryPopForm[e.moduleBind])
              this.queryPopForm[e.moduleBind] = "";
          });
        }
      };
    },
    //选中数据
    handlerSubPreservation (rowData, key) {
      if (this.columnData[key] != undefined) {
        this.columnData[key] = rowData[key];
      }
    },
    rousePopover (type, is, currencySelectInputKey) {
      this.searchFormConfig = [];
      if (this.columnData[type] != undefined) {
        if (type == "trips") {
          this.searchFormConfig.push({
            label: "车次编号",
            moduleBind: "trainNo",
            isInput: true
          });
          this.apiKey = "/trainnumber";
          this.itemName = "车次";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "trainNumberCode", name: "单据编码" },
            { key: "trainNumberName", name: "车次名称" },
            { key: "trainNo", name: "车次编号" }
          ];
        } else if (type == "startWarehouse") {
          this.searchFormConfig.push({
            label: "仓库编码",
            moduleBind: "warehouseCode",
            isInput: true
          });
          this.apiKey = "/warehouse";
          this.itemName = "起运地";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "warehouseCode", name: "仓库编码" },
            { key: "warehouseName", name: "仓库名称" },
            { key: "warehouseGroup", name: "仓库组织" },
            { key: "warehouseStatus", name: "状态" },
            { key: "address", name: "仓库地址" }
          ];
        } else if (type == "carrier") {
          this.searchFormConfig.push({
            label: "编码",
            moduleBind: "customerNo",
            isInput: true
          });
          this.apiKey = "/carrierbase";
          this.itemName = "承运商";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "carrierCode", name: "承运商编码" },
            { key: "carrierName", name: "承运商中文名称" },
            { key: "carrierForeignName", name: "承运商外文名称" },
            { key: "carrierAddress", name: "详细地址" },
            { key: "representative", name: "法人代表" }
          ];
        } else if (type == "endWarehouse") {
          this.searchFormConfig.push({
            label: "仓库编码",
            moduleBind: "warehouseCode",
            isInput: true
          });
          this.apiKey = "/warehouse";
          this.itemName = "目的地";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "warehouseCode", name: "仓库编码" },
            { key: "warehouseName", name: "仓库名称" },
            { key: "warehouseGroup", name: "仓库组织" },
            { key: "warehouseStatus", name: "状态" },
            { key: "address", name: "仓库地址" }
          ];
        } else if (type == "platesNo") {
          this.searchFormConfig.push({
            label: "车辆信息编码",
            moduleBind: "vehicleInfoCode",
            isInput: true
          });
          this.apiKey = "/vehicleinfo";
          this.itemName = "车牌号";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "vehicleInfoCode", name: "车辆信息编码" },
            { key: "vehicleNo", name: "车牌号" },
            { key: "carType", name: "车型" },
            { key: "load", name: "载重" },
            { key: "pachageNo", name: "可载件数" }
          ];
        } else if (type == "containerCode") {
          this.searchFormConfig.push({
            label: "编码",
            moduleBind: "containerCode",
            isInput: true
          });
          this.apiKey = "/container";
          this.itemName = "集装箱代码";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "containerCode", name: "集装箱编码" },
            { key: "containerName", name: "名称" },
            { key: "containerAbb", name: "简称" },
            { key: "containerSpecification", name: "集装箱规格" },
            { key: "description", name: "描述" }
          ];
        } else if (type == "regulateType") {
          this.searchFormConfig.push({
            label: "监管方式名称",
            moduleBind: "supervisionModeName",
            isInput: true
          });
          this.apiKey = "/supervisionmode";
          this.itemName = "监管方式列表";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "supervisionModeCode", name: "编码" },
            { key: "supervisionModeCode", name: "名称" },
            { key: "supervisionModeAbb", name: "简称" },
            { key: "customsCode", name: "对应海关编码" },
            { key: "description", name: "描述" }
          ];
        }
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [type]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(this.apiKey, this.queryPopForm);
            this.queryPopForm.total = count;
            this.popoverList = list;
          } catch (error) {
            console.log(error);
          }
        }
      };
      this.currencySelectInputKey = type; // 设置当前点击输入框key
      type && currencyObj[type]();
      this.isShowPopover = !this.isShowPopover;
    },
    //分页
    handlePageChange (paper) {
      this.queryPopForm.pageIndex = paper.pageIndex;
      this.queryPopForm.pageSize = paper.pageSize;
      this.handleBtnClick("search"); //翻页查询
    }
    /************************** 弹窗methods end *******************/
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.domainMap, status: this.status },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less" >
.delivery-schedule-base-form,
.AddCreditBox {
  .btnBottom {
    margin-bottom: 10px;
  }
}
</style>
