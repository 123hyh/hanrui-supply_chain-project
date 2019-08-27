<template>
  <div>
    <form-template :entity="formEntity" :formConfig="formConfig">
     </form-template>
    <div class="el-dialog__footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import FormTemplate from "@/components/common/form/index";
import SzreceivingItemEntity from "@/domain/entities/logistics/Szreceivingitem";
import SzreceivingItemForm from "@/domain/formconfig/logistics/Szreceivingitem";
import appHelper from "@/assets/js/appHelper";
export default {
  props: {
      billNo:String,
      itemCode:String,
  },
  components:{
    FormTemplate,
  },
  data() {
    return {
      formEntity: new SzreceivingItemEntity(),
      formConfig:this.blacklist(SzreceivingItemForm,["billNo","itemCode"]),
      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",

      // 验证规则 // 必填验证
      formRules: {
        materialCode: [appHelper.validateRule.required("物料编号")],
        batchNo: [appHelper.validateRule.required("批次")],
        quantity: [appHelper.validateRule.required("数量")],
        unit: [appHelper.validateRule.required("计量单位")]
      }
    };
  },
  watch: {
    itemCode(n, o){
      this.getSzreceivingItem()
    }
  },
  mounted(){
    this.getSzreceivingItem()
  },
  methods: {
    /**
     * 黑名单
     */
    blacklist(obj, blacks){
      return obj.filter(item =>{
        return !blacks.includes(item.key)
      })
    },
    getSzreceivingItem(){
      if(this.itemCode){
        appHelper.getSzreceivingItem(this.itemCode).then(data=>{
          this.formEntity = data.data
        })
      }else{
        this.formEntity = new SzreceivingItemEntity()
      }
    },
    saveForm() {
      this.formEntity.billNo = this.billNo
      this.saveSzreceivingitem().then(data => {
        if (data && data.status == 200) {
          this.formEntity = new SzreceivingItemEntity()
          this.$emit("succsess")
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          })
        }
      })
      // this.$refs.form.validate().then(() => {
      // });
    },
    saveSzreceivingitem(){
      if(this.itemCode){
        //修改
        return appHelper.updateSzreceivingitem(this.formEntity)
      }else {
        //添加
        return appHelper.saveSzreceivingitem(this.formEntity)
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
