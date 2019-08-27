<template>
  <div class="CustomerAuthentication">
    <div>
      <el-button @click="handleRollback">返回</el-button>
    </div>
    <p class="title">网上客户认证</p>
    <div :key="i" v-for="(item,i) in customerAuthenticationformcfg">
      <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
      <form-config
        ref="formItem"
        :formModel="customerAuthentication"
        :inputKey="item.list"
        @handlerFormVerify="isVerify"
      ></form-config>
    </div>
    <div class="btndiv">
      <el-button type="primary" class="czbtn" @click.stop="saveBusinessForm">转商机管理</el-button>
      <el-button type="primary" class="czbtn" @click.stop="saveBusinessForm">转委托方</el-button>
    </div>
  </div>
</template>

<script>
// 引入公共的table组件
import FormConfig from "@/components/common/FormConfig.vue";
import formModuleHead from "@/components/common/FormModuleHead.vue";
// import agreementForm from "@/domain/entities/business/agreementForm";
import customerAuthenticationformcfg from "@/domain/formconfig/business/CustomerAuthentication";
import api from "@/assets/js/appHelper";
import { mapGetters, mapActions, mapMutations } from "vuex";
let ColumnData = "";
export default {
  components: {
    FormConfig,
    formModuleHead,
  },
  data: () => ({
    customerAuthentication: {},
    customerAuthenticationformcfg,
    jumpType: "",
  }),
  computed: {
    ...mapGetters(["btnType", "getActivePathData"])
  },
  watch: {},
  methods: {
    ...mapMutations(["addBtnType", "addbreadCrumbsList"]),
    // 返回
    handleRollback() {
      this.$router.push("M0207");
    },
    isVerify() {
      let isVerify = false;
      // this.verify["formModel"].validate(valid => {
      //   isVerify = valid;
      // });
      return isVerify;
    },
    //保存主表单
    async saveBusinessForm() {
      this.handleRollback();
    }
  },
  created() {
    // 切换路由数据保存
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.customerAuthentication = formData);
    this.jumpType = status;
  },
  // 切换路由数据保存
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.customerAuthentication, status: this.jumpType },
      path: this.$route.path
    });
    next();
  }
};
</script>

<style lang="less">
.title{
  text-align: center;
}
.btndiv{
  text-align: center;
  margin-top: 80px;
}
.czbtn{
  margin: 20px 50px;
}
</style>
