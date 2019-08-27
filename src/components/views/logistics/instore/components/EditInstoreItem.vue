<template>
  <div>
    <!-- 表单 -->
    <el-form
      ref="form"
      :model="formEntity"
      label-position="right"
      :inline="true"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" required label="委托单号" prop="delegeteBillNo">
            <el-input v-model="formEntity.delegeteBillNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" required label="存货编码" prop="inventoryCode">
            <el-input v-model="formEntity.inventoryCode" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="存货名称" prop="inventoryName">
            <el-input v-model="formEntity.inventoryName" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="规格型号" prop="specificationType">
            <el-input v-model="formEntity.specificationType" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="商品名称" prop="goodsName">
            <el-input v-model="formEntity.goodsName" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="税号" prop="taxNo">
            <el-input v-model="formEntity.taxNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="附号" prop="attachNo">
            <el-input v-model="formEntity.attachNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="参数" prop="param">
            <el-input v-model="formEntity.param" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="计划车序" prop="plannedVehicleOrder">
            <el-input v-model="formEntity.plannedVehicleOrder" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="批次" prop="batchNo">
            <el-input v-model="formEntity.batchNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="供应商批次号" prop="supplierBatchNo">
            <el-input v-model="formEntity.supplierBatchNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="品牌" prop="brand">
            <el-input v-model="formEntity.brand" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="毛重" prop="grossWeight">
            <el-input v-model="formEntity.grossWeight" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="el-dialog__footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import SzinstoreItem from "@/domain/entities/logistics/Szinstore.js";
import appHelper from "@/assets/js/appHelper";
export default {
  props: {
      billNo:String,
      itemCode:String,
  },
  data() {
    return {
      formEntity: new SzinstoreItem(),
      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",

      // 验证规则 // 必填验证
      formRules: {
        delegeteBillNo: [appHelper.validateRule.required("委托单号")],
        inventoryCode: [appHelper.validateRule.required("存货编码")],
      }
    };
  },
  watch: {
    itemCode(n, o){
      this.getSzinstoreItem()
    }
  },
  mounted(){
    this.getSzinstoreItem()
  },
  methods: {
    getSzinstoreItem(){
      if(this.itemCode){
        appHelper.getSzinstoreItem(this.itemCode).then(data=>{
          this.formEntity = data.data
        })
      }else{
        this.formEntity = new SzinstoreItem()
      }
    },
    saveForm() {
      this.$refs.form.validate().then(() => {
        this.formEntity.billNo = this.billNo
        this.saveSzinstoreItem().then(data => {
          if (data && data.status == 200) {
            this.formEntity = new SzinstoreItem()
            this.$emit("succsess")
            this.$message({
              message: "保存成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "保存失败",
              type: "warning"
            });
          }
        });
      });
    },
    saveSzinstoreItem(){
      if(this.itemCode){
        //修改
        return appHelper.updateSzinstoreItem(this.formEntity)
      }else {
        //添加
        return appHelper.saveSzinstoreItem(this.formEntity)
      }
    },
    closeForm() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
