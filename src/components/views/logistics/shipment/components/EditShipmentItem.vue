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
          <el-form-item :label-width="labelWidth" required label="发运单基础信息编码" prop="shipmentBaseCode">
            <el-input v-model="formEntity.shipmentBaseCode" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" required label="计量单位" prop="unit">
            <el-input v-model="formEntity.unit" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" required label="发货方库存组织" prop="stockGroup">
            <el-input v-model="formEntity.stockGroup" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="发货仓库" prop="shipWarehouse">
            <el-input v-model="formEntity.shipWarehouse" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="委托单号" prop="delegeteBillNo">
            <el-input v-model="formEntity.delegeteBillNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
          <el-form-item :label-width="labelWidth" label="批次" prop="batchNo">
            <el-input v-model="formEntity.batchNo" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="单价" prop="price">
            <el-input v-model="formEntity.price" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="数量" prop="quantity">
            <el-input v-model="formEntity.quantity" :class="inputClass"></el-input>
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
          <el-form-item :label-width="labelWidth" label="发货方" prop="shipper">
            <el-input v-model="formEntity.shipper" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="备注" prop="remark">
            <el-input v-model="formEntity.remark" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="库位" prop="storehouse">
            <el-input v-model="formEntity.storehouse" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="起始箱号" prop="boxNoStart">
            <el-input v-model="formEntity.boxNoStart" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="结束箱号" prop="boxNoEnd">
            <el-input v-model="formEntity.boxNoEnd" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="唛头" prop="shippingMarks">
            <el-input v-model="formEntity.shippingMarks" :class="inputClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth" label="来货发票号" prop="incomeInvoiceNo">
            <el-input v-model="formEntity.incomeInvoiceNo" :class="inputClass"></el-input>
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
import ShipmentMaterielItem from "@/domain/entities/logistics/ShipmentMateriel.js";
import appHelper from "@/assets/js/appHelper";
export default {
  props: {
      billNo:String,
      itemCode:String,
  },
  data() {
    return {
      formEntity: new ShipmentMaterielItem(),
      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",

      // 验证规则 // 必填验证
      formRules: {
        shipmentBaseCode: [appHelper.validateRule.required("发运单基础信息编码")],
        unit: [appHelper.validateRule.required("计量单位")],
        stockGroup: [appHelper.validateRule.required("发货方库存组织")],
      }
    };
  },
  watch: {
    itemCode(n, o){
      this.getShipmentmateriel()
    }
  },
  mounted(){
    this.getShipmentmateriel()
  },
  methods: {
    getShipmentmateriel(){
      if(this.itemCode){
        appHelper.getShipmentmateriel(this.itemCode).then(data=>{
          this.formEntity = data.data
        })
      }else{
        this.$refs["form"].resetFields()
        this.formEntity = new ShipmentMaterielItem()
      }
    },
    saveForm() {
      this.$refs.form.validate().then(() => {
        this.formEntity.billNo = this.billNo
        this.saveSzreceivingitem().then(data => {
          if (data && data.status == 200) {
            this.$refs["form"].resetFields()
            this.formEntity = new ShipmentMaterielItem()
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
    saveSzreceivingitem(){
      if(this.itemCode){
        //修改
        return appHelper.updateShipmentmateriel(this.formEntity)
      }else {
        //添加
        return appHelper.saveShipmentmateriel(this.formEntity)
      }
    },
    closeForm() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-form-item__error{
	position: static;
}
</style>
