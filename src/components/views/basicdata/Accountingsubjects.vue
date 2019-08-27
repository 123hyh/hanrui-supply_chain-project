<template>
  <div class="box">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 会计科目
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-aside width="300px">
        <el-tree
          :data="treeaccountsubject"
          :props="defaultProps"
          node-key="subjectCode"
          :default-expanded-keys="defaultexpanded"
          @node-click="handleNodeClick"
          empty-text="暂无会计科目"
        ></el-tree>
      </el-aside>
      <el-main>
        <div style="width: 1100px;" v-if="myFrom.data.subjectCode">
          <query-bar @handleBtnClickType="handleBtnClick"></query-bar>
          <!-- 文本model -->
          <my-from :fromConfig="myFrom" class="mycontent"></my-from>
        </div>
        <div v-else style="text-align: center;">暂无数据</div>
      </el-main>
    </el-container>
    <!-- 弹窗model -->
    <from-dialog
      :model="fromDialog"
      @handlerPointSelection="pointSelection"
      @handlerClickEvent="clickEvent"
    ></from-dialog>
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
import MyFrom from "@/components/common/class/basics/from";
import myFrom from "@/domain/formconfig/finance/accountsubjectModel";
import FromDialog from "@/components/common/class/from-dialog";
import fromDialog from "@/domain/formconfig/finance/accountsubjectDialog";
import utils from "@/components/common/class/utils";
// 组件
import QueryBar from "@/components/common/QueryBar";
import FormComponent from "@/components/common/FormConfig.vue";
import PopoverComponent from "@/components/common/Popover.vue";
import api from "@/assets/js/appHelper.js";
// 表单表格
import formConfig from "@/domain/formconfig/finance/accountsubject";
// 弹窗
import Measurement from "@/domain/tableconfig/basicdata/Measurement.js";
import FinanceProject from "@/domain/tableconfig/basicdata/FinanceProject";

import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    FormComponent,
    PopoverComponent,
    QueryBar,
    MyFrom,
    FromDialog
  },
  data: () => ({
    allaccountsubject: [],
    treeaccountsubject: [],
    defaultProps: {
      children: "children",
      label: "subjectTitle"
    },
    defaultexpanded: [],
    myFrom,
    fromDialog,
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
    // data(){
    //   return this.fromDialog.content.fromConfig.data
    // },
    // config(){
    //   return this.fromDialog.content.fromConfig.config
    // },
  },
  watch: {},
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 查询
    async queryData() {
      try {
        const { data } = await api.getaccountsubject();
        this.allaccountsubject = data || {};
        this.treeaccountsubject = [
          { subjectName: "[]", subjectTitle: "[]", subjectCode: "0" }
        ];
        this.treeaccountsubject[0].children = this.getJson(
          this.allaccountsubject,
          this.treeaccountsubject[0].subjectCode
        );
        if (this.treeaccountsubject.length > 0) {
          this.defaultexpanded = [this.treeaccountsubject[0].subjectCode];
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 递归数据格式
    getJson(items, str) {
      var json = [];
      for (var item of items) {
        if (item.parentSubjectCode == str) {
          item.subjectTitle = "[" + item.subjectCode + "]" + item.subjectName;
          json.push(item);
          item.children = this.getJson(items, item.subjectCode);
        }
      }
      return json;
    },
    // 选中
    handleNodeClick(data) {
      this.myFrom.data = data;
    },
    // 操作
    handleBtnClick(clickType, page) {
      if (clickType == "delete") {
        this.ondelete();
      }
      if (clickType == "add") {
        this.onopen("add");
      }
      if (clickType == "update") {
        this.onopen("update");
      }
    },
    // 删除
    async ondelete() {
      try {
        const { data, status } = await api.deleteaccountsubject(
          this.myFrom.data.subjectCode
        );
        if (status == "200") {
          this.$message.success("删除成功");
          this.queryData();
          this.myFrom.data = {};
        }
      } catch (e) {
        this.$message.error("删除失败，请重试");
        return;
      }
    },
    // 打开增加
    onopen(flag) {
      this.flag = flag;
      if (flag == "add") {
        utils.setConfigItemConfig(this.fromDialog,'subjectCode',{disabled:false});
        this.fromDialog.title = "添加下级科目";
        this.fromDialog.content.fromConfig.data = {}
        this.$set(this.fromDialog.content.fromConfig.data,"parentSubjectCode",this.myFrom.data.subjectCode);
        this.$set(this.fromDialog.content.fromConfig.data,"subjectCode",this.myFrom.data.subjectCode);
        this.$set(this.fromDialog.content.fromConfig.data,"level",this.myFrom.data.level);
        this.fromDialog.visible = true
      } else {
        utils.setConfigItemConfig(this.fromDialog,'subjectCode',{disabled:true});
        this.fromDialog.title = "修改科目";
        // this.fromDialog.content.fromConfig.data = JSON.parse(JSON.stringify(this.myFrom.data))
        this.fromDialog.content.fromConfig.data = Object.assign({}, this.myFrom.data)
        this.fromDialog.visible = true
      }
    },
    clickEvent(item) {
      if(item.name == 'call'){
        this.onadd()
      }else{
        this.fromDialog.visible = false
      }
    },
    // 增加
    async onadd() {
      if (this.flag == "add") {
        if (
          this.fromDialog.content.fromConfig.data.parentSubjectCode.length ==
            this.fromDialog.content.fromConfig.data.subjectCode.length ||
          this.fromDialog.content.fromConfig.data.subjectCode.substring(
            0,
            this.fromDialog.content.fromConfig.data.parentSubjectCode.length
          ) != this.fromDialog.content.fromConfig.data.parentSubjectCode
        ) {
          return this.$message.success(
            "科目编号必须以" +
              this.fromDialog.content.fromConfig.data.parentSubjectCode +
              "为开头且长度大于" +
              this.fromDialog.content.fromConfig.data.parentSubjectCode.length +
              "位"
          );
        }
        try {
          const { data, status } = await api.addaccountsubject(
            this.fromDialog.content.fromConfig.data
          );
          if (status == "200") {
            this.$message.success("增加成功");
            this.fromDialog.visible = false;
            this.queryData();
          }
        } catch (e) {
          this.$message.error("增加失败，请重试");
          return;
        }
      } else {
        this.onupdate();
      }
    },
    // 修改
    async onupdate() {
      try {
        const { data, status } = await api.updateaccountsubject(this.fromDialog.content.fromConfig.data);
        if (status == "200") {
          this.$message.success("修改成功");
          this.fromDialog.visible = false;
          this.queryData();
          this.myFrom.data = {};
        }
      } catch (e) {
        this.$message.error("修改失败，请重试");
        return;
      }
    },
    //点选
    pointSelection(obj, item) {
      this.handlerSearchClick(item.name);
    },
    // 点选
    async handlerSearchClick(key) {
      let port = {
        unitName: (data = {}) => api.getMeasurement(data),
        accountingItemName: (data = {}) => api.queryfinanceprojectSearch(data)
      };
      try {
        const {
          data: { list, count }
        } = await port[key](this.tableDialog.ruleForm);
        this.tableDialog.data.list = list;
        this.tableDialog.data.count = count;
      } catch (e) {
        this.$message.error("接口未配置或获取数据失败，请重试！");
        console.log(e);
        return;
      }
      let dialogconfig = {
        unitName: {
          config: Measurement,
          itemKey: key,
          itemName: "计量单位",
          queryConfig: [
            {
              label: "计量单位编码",
              moduleBind: "measurementCode",
              isInput: true
            }
          ],
          isshow: true
        },
        accountingItemName: {
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
      };
      this.tableDialog = { ...this.tableDialog, ...dialogconfig[key] };
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
    // 关闭表格弹窗回调
    closeTableDialog() {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.tableDialog.ruleForm = {};
    },
    // 点选回调
    tableDialogPreservation(rowData, key) {
      if (key && rowData) {
        switch (key) {
          case "unitName":
              this.fromDialog.content.fromConfig.data["unit"] = rowData["measurementCode"];
              this.fromDialog.content.fromConfig.data[key] = rowData["measurementUnit"];
            break;
          case "accountingItemName":
              this.fromDialog.content.fromConfig.data["accountingItem"] = rowData["financeProjectCode"];
              this.fromDialog.content.fromConfig.data[key] = rowData["financeProjectName"];
            break;
          default:
            this.fromDialog.content.fromConfig.data[key] = rowData[key];
            break;
        }
        this.fromDialog.content.fromConfig.data = { ...this.fromDialog.content.fromConfig.data };
      }
    }
  },
  watch: {
    'fromDialog.content.fromConfig.data':{
      handler(val, oldVal){
        this.fromDialog.content.fromConfig.data = val
      }
    },
  },
  created() {
    // 加载树
    this.queryData();
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: {
        formData: this.fromDialog.content.fromConfig.data,
        status: this.status
      },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style>
.mycontent {
  width: 1200px;
}
.diamycontent {
  width: 1240px;
}
</style>


<style scoped>
.box {
  height: 100%;
}
.el-container {
  height: calc(100% - 34px);
}
.el-aside,
.el-main {
  padding: 0;
}
.line {
  background: #eeeeee;
  height: 28px;
  line-height: 28px;
  padding-left: 30px;
  margin-bottom: 18px;
}
.sub {
  margin-top: 30px;
  text-align: center;
}
</style>
