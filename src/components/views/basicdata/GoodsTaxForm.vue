<template>
  <el-dialog :visible.sync="isShow" @close="closeForm">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}商品税号</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form
      ref="form"
      :model="formEntity"
      label-position="right"
      :inline="true"
      :rules="formRules"
      class="form-layout"
    >
      <el-form-item label="编码" prop="goodsTaxCode">
        <el-input v-model="formEntity.goodsTaxCode"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="formEntity.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="税号" prop="taxNo">
        <el-input v-model="formEntity.taxNo"></el-input>
      </el-form-item>
      <el-form-item label="附号" prop="attachNo">
        <el-input v-model="formEntity.attachNo"></el-input>
      </el-form-item>
      <el-form-item label="提交归类" prop="submission">
        <el-select v-model="formEntity.submission"></el-select>
      </el-form-item>
      <el-form-item label="特殊申报" prop="declaration">
        <el-select v-model="formEntity.declaration"></el-select>
      </el-form-item>
      <el-form-item label="监管条件" prop="supervisionConditions">
        <el-input v-model="formEntity.supervisionConditions"></el-input>
      </el-form-item>
      <el-form-item label="最低关税" prop="minTariff">
        <el-input v-model="formEntity.minTariff"></el-input>
      </el-form-item>
      <el-form-item label="退税率" prop="rebateRate">
        <el-input v-model="formEntity.rebateRate"></el-input>
      </el-form-item>
      <el-form-item label="进口备注" prop="inRemark">
        <el-input v-model="formEntity.inRemark"></el-input>
      </el-form-item>
      <el-form-item label="出口备注" prop="exRemark">
        <el-input v-model="formEntity.exRemark"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="tradeType">
        <el-input v-model="formEntity.tradeType"></el-input>
      </el-form-item>
      <el-form-item label="申报类别" prop="declarationType">
        <el-input v-model="formEntity.declarationType"></el-input>
      </el-form-item>
      <el-form-item label="平均净重" prop="aveNetWeight">
        <el-input v-model="formEntity.aveNetWeight"></el-input>
      </el-form-item>
      <el-form-item label="风险净重" prop="riskNetWeight">
        <el-input v-model="formEntity.riskNetWeight"></el-input>
      </el-form-item>
      <el-form-item label="编码版本号" prop="codeVersion">
        <el-input v-model="formEntity.codeVersion"></el-input>
      </el-form-item>
      <el-form-item label="检验检疫附加编号" prop="inspectionNo">
        <el-input v-model="formEntity.inspectionNo"></el-input>
      </el-form-item>
      <el-form-item label="税收分类编码" prop="taxClassifyNo">
        <el-input v-model="formEntity.taxClassifyNo"></el-input>
      </el-form-item>
      <el-form-item label="税收分类名称" prop="taxClassifyName">
        <el-input v-model="formEntity.taxClassifyName"></el-input>
      </el-form-item>
      <el-form-item label="享受优惠政策" prop="favouredPolicy">
        <el-select v-model="formEntity.favouredPolicy"></el-select>
      </el-form-item>
      <el-form-item label="检验检疫名称" prop="inspectionName">
        <el-input v-model="formEntity.inspectionName"></el-input>
      </el-form-item>
      <el-form-item label="优惠政策内容" prop="policyContent">
        <el-input v-model="formEntity.policyContent"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import GoodsTax from "@/domain/entities/basicdata/GoodsTax";
import appHelper from "@/assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object,
    show: {
      type: Boolean,
      default: false
    }
  },

  inject: ["formEvents"],
  watch: {
    show: {
      handler(newVal) {
        this.isShow = newVal;
      },
      deep: true
    }
  },
  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new GoodsTax(),

      // 控制弹出层显示
      popup: false,

      // 验证规则
      formRules: {
        //deptCode: [appHelper.validateRule.required("所属部门")],
      },
      isShow: false
    };
  },
  methods: {
    // 点击保存
    saveForm() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 表单验证通过后...

        if (!this.isUpdate) {
          // 新增
          appHelper
            .submitCreate("/goodstax/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
          this.formEntity = new GoodsTax();
          this.loadGoodsTaxCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/goodstax/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载编码
    loadGoodsTaxCode() {
      appHelper
        .get("/goodstax/goodsTaxCode")
        .then(result => (this.formEntity.goodsTaxCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.$emit("closeform");
    }
  },

  created() {
    this.loadGoodsTaxCode();
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
  }
};
</script>

<style scoped lang='less'>
.form-layout{
	justify-content: space-around;
	>div{
		flex-basis: 48%;
		display: flex;
    justify-content: flex-end;
    margin-bottom: 5px
	}
	&::after{
		content: '';
		flex-basis: 48%
	}
}
</style>
