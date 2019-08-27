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
          <el-form-item :label-width="labelWidth" label="物料编码" prop="materialCode">
            <el-input v-model="formEntity.materialCode" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="物料名称" prop="materialName">
            <el-input v-model="formEntity.materialName" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="规格型号" prop="specificationType">
            <el-input v-model="formEntity.specificationType" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="报关商品名称" prop="reportGoodsName">
            <el-input v-model="formEntity.reportGoodsName" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="批次" prop="batchNo">
            <el-input v-model="formEntity.batchNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="结算币别" prop="moneyType">
            <el-input v-model="formEntity.moneyType" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="计量单位" prop="unit">
            <el-input v-model="formEntity.unit" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="计划数量" prop="planQuantity">
            <el-input v-model="formEntity.planQuantity" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="可排数量" prop="availableQuantity">
            <el-input v-model="formEntity.availableQuantity" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="数量" prop="quantity">
            <el-input v-model="formEntity.quantity" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="单价" prop="price">
            <el-input v-model="formEntity.price" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="金额" prop="amount">
            <el-input v-model="formEntity.amount" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="原币单价" prop="originalCoinPrice">
            <el-input v-model="formEntity.originalCoinPrice" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="含税总金额" prop="amountContainTax">
            <el-input v-model="formEntity.amountContainTax" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="累计签收数量" prop="signedCountAll">
            <el-input v-model="formEntity.signedCountAll" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="累计已发运数量" prop="sendedCountAll">
            <el-input v-model="formEntity.sendedCountAll" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="里程" prop="mileage">
            <el-input v-model="formEntity.mileage" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="重量" prop="weight">
            <el-input v-model="formEntity.weight" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="毛重" prop="grossWeight">
            <el-input v-model="formEntity.grossWeight" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="累计途损数量" prop="lossCountAll">
            <el-input v-model="formEntity.lossCountAll" :class="inputClass"></el-input>
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
import Szimportinvoiceitem from "@/domain/entities/logistics/Importinvoiceitem.js";
import appHelper from "@/assets/js/appHelper";
export default {
  props: {
      billNo:String,
      itemCode:String,
  },
  data() {
    return {
      formEntity: new Szimportinvoiceitem(),
      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",

      // 验证规则 // 必填验证
      formRules: {
      }
    };
  },
  watch: {
    itemCode(n, o){
      this.getImportinvoiceitem()
    }
  },
  mounted(){
    this.getImportinvoiceitem()
  },
  methods: {
    getImportinvoiceitem(){
      if(this.itemCode){
        appHelper.getImportinvoiceitem(this.itemCode).then(data=>{
          this.formEntity = data.data
        })
      }else{
        this.formEntity = new Szimportinvoiceitem()
      }
    },
    saveForm() {
      this.$refs.form.validate().then(() => {
        this.formEntity.billNo = this.billNo
        this.saveImportinvoiceitem().then(data => {
          if (data && data.status == 200) {
            this.formEntity = new Szimportinvoiceitem()
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
    saveImportinvoiceitem(){
      if(this.itemCode){
        //修改
        return appHelper.updateImportinvoiceitem(this.formEntity)
      }else {
        //添加
        return appHelper.saveImportinvoiceitem(this.formEntity)
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
