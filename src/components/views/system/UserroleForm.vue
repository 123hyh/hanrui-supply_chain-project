<template>
  <div class="twoColumnt">
    <el-dialog :visible.sync="popup">
      <!-- 标题 -->
      <div slot="title">修改用户角色</div>

      <!-- 按钮行 -->
      <div slot="footer">
        <el-button type="primary" @click="saveForm">确定</el-button>
        <el-button type="cancel" @click="closeForm">取消</el-button>
      </div>

      <!-- 表单 -->
      <el-form
        ref="form"
        :model="formEntity"
        label-position="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-checkbox-group v-model="roleCode">
          <el-checkbox style="width: 20%;margin-bottom: 10px;"
            v-for="(item,index) in allRole"
            :key="index"
            :label="item.roleCode"
          >{{item.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Userrole from '../../../domain/entities/system/Userrole'
import api from '@/assets/js/appHelper.js'

export default {
  inject: ['formEvents'], // formEvents == bus
  data() {
    return {
      formEntity: '',
      roleCode: [],
      // 控制弹出层显示
      popup: false,
      // 设置 label 宽度
      labelWidth: '150px',
      // el-input 类名
      inputClass: 'input-item',
      inputStyle: {
        width: '200px'
      }
    }
  },
  props: {
    // ---所有部门列表
    allRole: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    // 点击保存
    saveForm() {
      var self = this
      var jsonArr = []
      for (var item of this.roleCode) {
        var jsonObj = {}
        jsonObj.userCode = this.formEntity.userCode
        jsonObj.roleCode = item
        jsonArr.push(jsonObj)
      }
      this.$refs.form.validate().then(() => {
        api.upuserrole('/userrole/'+self.formEntity.userCode, jsonArr).then(function(res) {
          if (res.data == 'success') {
            self.$alert('保存成功', '修改', {
              confirmButtonText: '确定',
              callback: action => {
                // 刷新列表
                self.popup = false //弹出层消失
                self.$emit('newTableData', res.data)
              }
            })
          } else {
            self.$alert('保存失败')
          }
        })
      })
    },
    // 点击取消
    closeForm() {
      this.popup = false
    }
  },
  watch: {
    popup: {
      handler(n, o) {
        if (n) {
          this.formEntity = this.$store.state.other.curRowData
          if (this.formEntity.roleCode) {
            this.roleCode = this.formEntity.roleCode.split('&')
          } else {
            this.roleCode = []
          }
        }
      }
    }
  },
  created() {
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
  }
}
</script>

<style scoped>
.input-item {
  width: 180px;
}
</style>
