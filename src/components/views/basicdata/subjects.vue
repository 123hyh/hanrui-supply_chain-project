<template>
  <el-container>
    <el-aside width="200px">
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
      <div style="width: 900px;" v-if="myFrom.data.subjectCode">
        <!-- 文本model -->
        <my-from :fromConfig="myFrom" class="mycontent"></my-from>
      </div>
      <div v-else style="text-align: center;">暂无数据</div>
    </el-main>
  </el-container>
</template>

<script>
import MyFrom from "@/components/common/class/basics/from";
import myFrom from "@/domain/formconfig/finance/accountsubjectModel";
import api from "@/assets/js/appHelper.js";

export default {
  components: {
    MyFrom
  },
  data: () => ({
    allaccountsubject: [],
    treeaccountsubject: [],
    defaultProps: {
      children: "children",
      label: "subjectTitle"
    },
    defaultexpanded: [],
    myFrom
  }),
  computed: {},
  watch: {},
  methods: {
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
      this.$emit("handlerNodeClick", data);
    }
  },
  created() {
    this.myFrom.data = ''
    // 加载树
    this.queryData();
  }
};
</script>
<style>
</style>

<style scoped>
.box {
  height: 100%;
}
.el-container {
  height: 70vh;
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
