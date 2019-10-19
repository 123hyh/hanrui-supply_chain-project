<template>
  <div class="login" v-loading='loading'>
    <el-button class="login-btn" type="primary" round @click="login">登录</el-button>
  </div>
</template>

<script>
import utils from "@/util/config";
export default {
		data: () => ({
			loading:false,
		}),
    methods: {
      async login(){
		  	try {
			  	this.loading = true
				await utils.loginUtil()
				this.$message({ message: '登录成功', type: 'success',center: true });
				this.$router.replace(this.$route.query.redirect || '/')
			} catch (error) {
				this.$message({ message: '登录失败', type: 'warning',center: true });
				return Promise.reject(error)
			} finally {
				this.loading = false
			}
      }
    }
}
</script>

<style lang="less" scoped>
</style>
