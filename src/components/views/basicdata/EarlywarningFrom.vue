<template>
  <div class="box">
    <div class="btntop">
      <el-button @click.stop="cancelFrom">返回</el-button>
      <el-button type="primary" @click.stop="saveForm">确定</el-button>
    </div>
    <div :key="i" v-for="(item,i) in formConfig">
      <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
      <form-config
        :formModel="formData"
        :inputKey="item.list"
        @handlerFormConfigClickSearch="rousePopover"
        @handlerFormVerify="handlerFormVerify"
      ></form-config>
    </div>
    <!-- <div class="btn-right">
      <el-button @click.stop="cancelFrom">取消</el-button>
      <el-button @click.stop="saveForm">确定</el-button>
    </div>-->
    <div style="margin: 20px;color: #c0c4cc;">
      <p style>说明：</p>
      <span style>预警条件分为状态类、金额类、数量类和日期类四个预警触发条件，使用者依实际的预警栏位来选择符合的预警触发条件；</span>
    </div>
  </div>
</template>

<script>
import formModuleHead from "@/components/common/FormModuleHead.vue";
import Popover from "@/components/common/Popover";
import Pagination from "@/components/common/Pagination";
import FormConfig from "@/components/common/FormConfig";
import api from "@/assets/js/appHelper";
import { mapMutations, mapGetters } from "vuex";
import earlywarning from "@/domain/formconfig/commerce/Earlywarning";
export default {
  components: {
    formModuleHead,
    Popover,
    Pagination,
    FormConfig
  },
  data() {
    return {
      formConfig: earlywarning,
      formData: {},
      status:'',
      writeback:''

    };
  },
  async created () {
    api.getwarningbusiness()
    api.initSelect(this.formConfig);
    this.writeback = true;
    const { formData = {}, status = "" } =
      this.getActivePathData(this.$route.path) || {};
    // 回写数据
    this.status = status;
    if (formData) {
      Object.assign(this.formData, formData);
    }
    // 查询或加载编码
    if (this.status == "update") {
    } else {
      try {
        let { data } = await api.getitemCode();
        this.formData.billNo = data;
      } catch (e) {
        this.$message.error("编码加载失败，请重试！");
      }
    }
    this.formData = { ...this.formData };
    this.$nextTick(function () {
      this.writeback = false;
    });
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: {
        formData: this.formData,
        status: this.status
      },
      path: this.$route.path
    });
    next();
  },
  computed: {},
  methods: {
    ...mapGetters(["getActivePathData"]),
    ...mapMutations(["addbreadCrumbsList"]),
    rousePopover() {},
    handlerFormVerify() {},
    saveForm() {},
    cancelFrom() {
      // f返回
      this.$router.push({
        path: "/M1009"
      });
    }
  },
  watch: {}
};
</script>

<style scoped>
.box {
  height: 100%;
}
.el-container {
  height: calc(100% - 34px);
}
.btn-right {
  text-align: right;
}
.btntop {
  padding: 0 0 10px 0;
}
</style>
