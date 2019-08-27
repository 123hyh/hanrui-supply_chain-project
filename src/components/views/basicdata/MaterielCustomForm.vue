<template>
  <el-dialog :visible.sync="showPopover" width="43%" @close="closeForm">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}物料海关信息</div>

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
      <el-form-item label="物料基础信息ID" prop="materielId">
        <el-input v-model="formEntity.materielId"></el-input>
      </el-form-item>
      <el-form-item label="物料海关信息" prop="materielCustomCode">
        <el-input v-model="formEntity.materielCustomCode"></el-input>
      </el-form-item>
      <el-form-item label="海关简称" prop="customsAbbreviation">
        <el-input v-model="formEntity.customsAbbreviation"></el-input>
      </el-form-item>
      <el-form-item label="海关别名" prop="customsAlias">
        <el-input v-model="formEntity.customsAlias"></el-input>
      </el-form-item>
      <el-form-item label="外文名称" prop="foreignName">
        <el-input v-model="formEntity.foreignName"></el-input>
      </el-form-item>
      <el-form-item label="最高税率" prop="maxRate">
        <el-input v-model="formEntity.maxRate"></el-input>
      </el-form-item>
      <el-form-item label="退税率" prop="rebateRate">
        <el-input v-model="formEntity.rebateRate"></el-input>
      </el-form-item>
      <el-form-item label="平均价" prop="averagePrice">
        <el-input v-model="formEntity.averagePrice"></el-input>
      </el-form-item>
      <el-form-item label="最高单价" prop="maxPrice">
        <el-input v-model="formEntity.maxPrice"></el-input>
      </el-form-item>
      <el-form-item label="最低单价" prop="minPrice">
        <el-input v-model="formEntity.minPrice"></el-input>
      </el-form-item>
      <el-form-item label="总数量值" prop="totalNo">
        <el-input v-model="formEntity.totalNo"></el-input>
      </el-form-item>
      <el-form-item label="税号" prop="taxNo">
        <el-input v-model="formEntity.taxNo"></el-input>
      </el-form-item>
      <el-form-item label="附号" prop="attachNo">
        <el-input v-model="formEntity.attachNo"></el-input>
      </el-form-item>
      <el-form-item label="监管条件" prop="condition">
        <el-input v-model="formEntity.condition"></el-input>
      </el-form-item>
      <el-form-item label="申报型号" prop="declaredModel">
        <el-input v-model="formEntity.declaredModel"></el-input>
      </el-form-item>
      <el-form-item label="审核备注" prop="remarks">
        <el-input v-model="formEntity.remarks"></el-input>
      </el-form-item>
      <el-form-item label="申报型号审核" prop="verify">
        <el-select v-model="formEntity.verify"></el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import MaterielCustom from "@/domain/entities/basicdata/MaterielCustom";
import appHelper from "@/assets/js/appHelper";

export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new MaterielCustom(),

      // 控制弹出层显示
      popup: false,

      // 设置 label 宽度
      // el-input 类名

      // 验证规则
      formRules: {
        //deptCode: [appHelper.validateRule.required("所属部门")],
      },
      showPopover: false
    };
  },
  watch: {
    isShow: {
      handler(newVal) {
        this.showPopover = newVal;
      },
      deep: true
    }
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
            .submitCreate("/materielcustom/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
          this.formEntity = new MaterielCustom();
          this.loadAttachmentTypeCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/materielcustom/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载附件类型编码
    loadAttachmentTypeCode() {
      appHelper
        .get("/attachmenttype/attachmentTypeCode")
        .then(result => (this.formEntity.attachmentTypeCode = result.data));
    },
    // 点击取消
    closeForm(e) {
      let time;
      this.$emit("closeform");
    }
    /* closeForm:(()=>{
			let time;
			return function(clear){
				console.log(1)
				time && clearTimeout(time),(time=null);
				(clear === undefined) && (time = setTimeout(()=>{
					this.$emit('closeform')
				},50));
			}
		})(), */
  },
  beforeDestroy() {
    this.closeForm(1);
  },

  created() {
    this.loadAttachmentTypeCode();
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
  }
};
</script>

<style scoped lang='less'>
/* .input-item {
  width: 180px;
} */
.form-layout {
  > div {
    flex-basis: 48%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }
}
</style>
