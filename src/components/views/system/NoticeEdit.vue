<template>
  <div>
    <!-- 保存按钮 -->
    <div class="mb-10">
      <el-button type="primary" @click="handlePreserve">确认保存</el-button>
      <el-button type="cancel" @click="handleSubmit">返回</el-button>
    </div>
    <!-- 表单 -->
    <el-form
      ref="form"
      :model="formEntity"
      :inline-message="false"
      label-position="right"
      :inline="true"
      :rules="formRules"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="公告标题" prop="title">
            <el-input v-model="formEntity.title" :style="inputStyle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="发布日期" prop="publicTime">
            <el-date-picker
              v-model="formEntity.publicTime"
              placeholder="选择发布日期"
              type="date"
              :style="inputStyle"
              value-format="yyyy-MM-dd HH:mm:ss"
			  :picker-options="pickerOptions">
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="编辑公告" prop="content">
            <tinymce v-model="formEntity.content" :height="300" style="width:1000px"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="附件">
            <el-upload
              action
              :http-request="upload"
              :before-remove="beforeRemove"
        	  :before-upload="beforeUpload"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传单个文件大小不超过20Mb</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/common/Tinymce";
import api from "@/assets/js/appHelper";
import Notifi from "@/domain/entities/system/Notifi";
import {mapMutations, mapGetters} from 'vuex';
export default {
  components: { Tinymce },
  data() {
    return {
	  formEntity: new Notifi(),
	  fileList:[],
      // 设置 label 宽度
      labelWidth: "100px",
      // 设置 input 宽度
      inputStyle: {
        width: "200px"
      },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()-24*60*60*1000
		  }
		},
      // 验证规则
      formRules: {
        title: [{ required: true, message: "必填" }],
        publicTime: [{ required: true, message: "必填" }]
      }
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"])
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    upload(param) {
      //自定义文件上传
      // 不能使用对象，这里定义FormData表单，后台使用更多形参接收
      var form = new FormData(); // FormData 对象
      form.append("file", param.file); // 文件对象
      form.append("fileName", param.file.name); // 文件对象
      form.append("fileType", "notification"); // 文件对象
      var self = this;
      api.uploadSectionFile(form).then(result => {
		  if(result.status == '200'){
			  if(self.formEntity.attachmentsUrl){
				  self.formEntity.attachmentsUrl += ';' + result.data
			  }else{
				  self.formEntity.attachmentsUrl = result.data
			  }
		  }else{
			  beforeRemove(self.file,this.fileList)
		  }
      });
    },
    handleSubmit() {
      this.$router.push("M1008");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
	},
	beforeUpload(file){
      if (file.size > 1024 * 1024 * 20) {
        this.$message.warning("请选择小于20Mb的文件");
        return false;
      }
	},
    // 点击保存
    handlePreserve() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 新增
        api.addData("/notification", self.formEntity).then(function(res) {
          // 提交成功后...
          if (res) {
            self.$alert("保存成功", "保存", {
              confirmButtonText: "确定",
              callback: action => {
                // 刷新列表
                self.popup = false; //弹出层消失
              }
            });
          } else {
            self.$alert("创建失败");
          }
        });
      });
    }
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.formEntity, status: "create" },
      path: this.$route.path
    });
    next();
  },
  created() {
    const { formData = {} } = this.getActivePathData(this.$route.path) || {};
    if (formData) {
      this.formEntity = formData;
    } else {
      this.formEntity.content =
        '<h3 style="text-align: center;">请编辑系统公告!</h3>';
    }
  }
};
</script>

<style>
.input-item {
  width: 180px;
}
.el-upload {
  width: auto;
  height: auto;
  border: 0;
}
</style>
