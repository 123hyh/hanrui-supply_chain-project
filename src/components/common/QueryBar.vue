<template>
  <div class="queryBar-margin">
    <div
      class="query-search-form"
      :style="{'height': formHeigth}"
    >
      <el-form :inline="true">
        <!-- 表单 -->
        <el-form-item
          v-for="item in formConfig"
          :key="item.label"
          :label="item.label"
        >
          <!-- 文本输入 -->
          <el-input
            v-if="item.isInput"
            v-model="ruleForm[item['moduleBind']]"
            style="width:9rem"
          >
            <el-button
              v-if="item.btn"
              slot="append"
              icon="el-icon-search"
              @click.stop="rousePopover(item.key)"
            ></el-button>
          </el-input>
          <!-- 时间选择 -->
          <el-date-picker
            v-if="item.isDate"
            v-model="ruleForm[item['moduleBind']]"
            style="width:7.7rem"
            size="mini"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- 多选框 -->
          <el-checkbox
            v-if="item.checkbox"
            v-model="ruleForm[item['moduleBind']]"
            :disabled="item.readonly"
          ></el-checkbox>
          <!-- 下拉框 -->
          <el-select
            v-if="item.isSelect"
            style="width:150px"
            v-model="ruleForm[item['moduleBind']]"
            placeholder="请选择"
          >
            <el-option
              v-for="option in item.selectOption"
              :key="option['itemValue']"
              :label="option['itemValue']"
              :value="option['itemKey']"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="transform-inline-block">
      <template v-for="item in btnList">
        <el-button
        style="width: 56px"
          :key="item.type"
          :type="item.type === 'delete' ? 'danger' : 'primary'"
          :class="{[ item.type !=='delete' && setThemeClass]: true}"
          :disabled="item.readonly"
          @click="handlerClick(item.type)"
        >{{item.label}}</el-button>
      </template>
      <!-- 展开输入框按钮 -->
      <!-- <i
        :class="{
          'el-icon-caret-bottom': formHeigth === '47px', 
          'el-icon-caret-top': formHeigth !== '47px', 
          'icon-hover': true
          }"
        @click.stop="unfoldForm"
      ></i> -->
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from '@/assets/js/appHelper.js'
export default {
  // 三级菜单点击下传的 path 用于获取 queryBar 的按钮组
  inject: {
    path: {
      default: () => ({})
    }
  },
  data: () => ({
    btnset: {
      query: { type: "search", label: "查询", index: 0 },
      insert: { type: "add", label: "新增", index: 1 },
      operate: { type: "update", label: "操作", index: 2 },
      delete: { type: "delete", label: "删除", index: 3 },
      setting: { type: "setting", label: "设置", index: 4 }
    },
    formHeigth: '47px'
  }),
  created(){
    this.getSelectOption()
  },
  props: {
    formConfig: {
      type: Array,
      default: () => []
      /* default: () => [
				  { label: "编码", moduleBind: "creditNo" },
				  { label: "名称", moduleBind: "name" },
				  { label: "制单人", moduleBind: "creator" },
				  { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
				  { label: "至", moduleBind: "createTimeTo", isDate: true }
				] */
    },
    ruleForm: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(["getTheme", "getListBtn"]),
    setThemeClass () {
      let obj = {
        "#409EFF": "theme-color-blur",
        "#FF8C02": "theme-color-warning",
        "#242F42": "theme-color-info"
      };
      return obj[this.getTheme];
    },
    btnList () {
      let arr = [];
      (
        this.getListBtn[this.path.location] ||
        this.getListBtn[this.$route.path.slice(1)] ||
        []
      ).reduce((pre, cur) => {
        this.btnset[cur] && (pre[this.btnset[cur]["index"]] = this.btnset[cur]);
        arr = pre;
        return pre;
      }, []);
      return arr.filter(item => item);
    }
  },
  methods: {
    // 请求下拉字典
    async getSelectOption(){
      try {
       await api.initSelect(this.formConfig);
       this.$forceUpdate();
      } catch (error) {
        console.log(error)
      }
    },
    // 设置form的高度
    unfoldForm () {
      this.formHeigth = this.formHeigth ? '' : '47px'
    },
    async handlerClick (params) {
      // 如果点击删除 需要用户点击确认
      if (params === "delete" && !(await this.deleteAffirm())) return;
      this.$emit("handleBtnClickType", params);
    },
    rousePopover (key) {
      this.$emit("queryBarPopSearch", key);
    },
    deleteAffirm () {
      return this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return true;
        })
        .catch(() => { });
    }
  }
};
</script>
<style lang="less">
.queryBar-margin {
  display: flex;
  .query-search-form {
    // flex: auto;
    > form {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .transform-inline-block {
    min-width: 275px;
    max-width: 275px;
    display: inline-block;
  }
  .icon-hover {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  .transform-inline-block {
    min-width: 275px;
    max-width: 275px;
    display: inline-block;
  }
  .icon-hover {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
