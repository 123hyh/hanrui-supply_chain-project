<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 付款申请单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-aside width="350px">
        <el-tree
          :data="treeaccountsubject"
          :props="defaultProps"
          node-key="subjectCode"
          :default-expanded-keys='defaultexpanded'
          @node-click="handleNodeClick"
          empty-text="暂无会计科目"
        ></el-tree>
      </el-aside>
      <el-main v-if="fromData.subjectCode">
        <el-card>
          <div slot="header">
            <span>{{fromData.subjectName}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="onSubmit('add')">添加下级科目</el-button>
          </div>
          <fromComponent :fromData="fromData" :fromConfig="fromConfig"></fromComponent>
          <div class="line">辅助核算</div>
          <fromComponent
            :fromData="fromData"
            :fromConfig="fromConfigTow"
            @handlerPointSelection="pointSelection"
          ></fromComponent>
          <el-button type="primary" @click="onSubmit('update')">修改并保存</el-button>
        </el-card>
      </el-main>
    </el-container>
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
import { mapMutations, mapGetters } from "vuex";
import api from "@/assets/js/appHelper";
import fromComponent from "@/components/common/class/from-component";
import PopoverComponent from "@/components/common/Popover.vue";
// 表单表格
import formConfig from "@/domain/formconfig/finance/accountsubjectmy";
export default {
  components: {
    fromComponent,
    PopoverComponent
  },
  data: () => ({
    allaccountsubject: [],
    treeaccountsubject: [],
    defaultProps: {
      children: "children",
      label: "subjectName"
    },
    defaultexpanded:[],
    fromData: {},
    formConfigOne: formConfig[0],
    formConfigTwo: formConfig[1],
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
  watch: {},
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 查询
    async queryData() {
      try {
        const { data } = await api.getaccountsubject();
        this.allaccountsubject = data || {};
        this.treeaccountsubject = [{ subjectName: "[]", subjectCode: "0" }];
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
          json.push(item);
          item.children = this.getJson(items, item.subjectCode);
        }
      }
      return json;
    },
    handleNodeClick(data) {
      this.fromData = data;
    },
    handlerSearchClick(key) {},
    onSubmit() {}
  },
  created() {
    // 加载树
    this.queryData();
  },
  beforeRouteLeave(to, form, next) {
    // this.addbreadCrumbsList({
    //   data: {
    //     formData: this.form.data,
    //     status: this.status
    //   },
    //   path: this.$route.path
    // });
    next();
  }
};
</script>

<style scoped>
.el-aside,
.el-main {
  padding: 10px;
}
.line {
  background: #eeeeee;
  height: 28px;
  line-height: 28px;
  padding-left: 30px;
  margin-bottom: 18px;
}
</style>
