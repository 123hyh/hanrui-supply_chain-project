<template>
  <div>
    <!-- 保存按钮 -->
    <div class="mb-10">
      <el-button type="cancel" @click="handleSubmit">返回</el-button>
    </div>
    <el-container>
      <el-header v-html="formEntity.title" class="elhead"></el-header>
      <div class="time">[{{formEntity.publicTime.slice(0,10)}}]</div>
      <el-main v-html="formEntity.content" class="elmain"></el-main>
    </el-container>
    <el-button style="margin-right: 100px;float: right;" size="small" type="success">下载公告附件</el-button>
  </div>
</template>

<script>
import Tinymce from "@/components/common/Tinymce";
import api from "@/assets/js/appHelper";
import Notifi from "@/domain/entities/system/Notifi";
import {mapMutations, mapGetters} from 'vuex'
export default {
  components: { Tinymce },
  data() {
    return {
      formEntity: new Notifi()
    }
  },
  computed: {
  },
  methods: {
    handleSubmit() {
      this.$router.push("M00");
    },
	},
  created() {
    var self = this
    api.upapiKey('/notification/'+this.$route.query.itemCode,'').then(res=>{
      if(res.status == '200'){
        self.formEntity = res.data
      }
    })
  }
};
</script>

<style>
.elhead{
  line-height: 60px;
  text-align: center;    
  color: rgb(64, 158, 255);
    font-size: 20px;
    font-weight: bold;
}
.time{
  float: right;text-align: center;
}
.elmain{
  min-height: 200px;
}
</style>
