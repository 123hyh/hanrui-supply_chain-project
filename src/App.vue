<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex';
import { instance as service } from '@/assets/js/initApi.js'
import store from '@/store/index.js'

// 页面刷新 和 初始化时 取 token 和 store数据
service.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
store.commit('setStore');

export default {
  computed: {
    ...mapGetters(['systemName'])
  },

  methods: {
    ...mapMutations(['PreservationStore', 'setStore']),
  },

  created () {
    window.addEventListener('beforeunload', () => {
      // 存取token 和 store数据
      this.PreservationStore();
    });
    // 设置 网页title
    document.getElementsByTagName('title')[0].textContent = this.systemName
  },
  mounted(){
    const loading = document.getElementById('transion-loading');
    loading.style.display = 'none'
  },
}
</script>

<style lang="less">
/* @import "./assets/css/color-dark.css";     深色主题 */
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
// @import "./assets/css/color-blue.css";
.form-layout {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}

// 滚动条轨道
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}

// 定义滑块
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgb(199, 199, 199);
}

.number-input {
  // 数字输入框样式
  height: 28px;
  line-height: 28px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

  &:hover {
    border-color: #c4c4c4;
  }

  &:focus {
    border-color: #409eff;
    outline: 0;
  }
}

.mb10() {
  .el-form-item {
    margin-bottom: 0px !important;
  }

  .el-form-item__label {
    margin-bottom: 10px !important;
  }
}

.handle-box {
  .mb10;
}

.mb-10 {
  margin-bottom: 10px !important;
}

.pd-10 {
  padding: 10px 10px 0 10px !important;
}

// 解决弹窗表格高度问题
.el-table__body-wrapper.is-scrolling-none {
  max-height: 600px !important;
}
</style>
