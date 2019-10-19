<template>
  <el-container class="app-container" v-loading='loading'>
    <el-header>
      <el-button class="logout-btn" type="primary" round @click="logout">登出</el-button>
    </el-header>
    <el-container class="app-mian-container">
      <el-aside width="250px"></el-aside>
      <el-main class="model-container">
        <router-view class="model"></router-view>
        <el-footer>Copyright © 2019 春夏秋冬<el-divider direction="vertical"></el-divider>Yan</el-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import utils from "@/util/config";
export default {
  name: 'Layout',
		data: () => ({
			loading:false,
		}),
  methods: {
      logout(){
        utils.logoutUtil()
				this.$message({ message: '登出成功', type: 'success',center: true });
        this.$router.push('/login')
      }
  }
}
</script>

<style lang="less" scoped>
</style>
