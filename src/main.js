import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from '@/store/index.js'

// element 默认主题
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/icon.css'
import '@/assets/css/main.less'

// 添加全局基础组件
import baseComponent from '@/components/common/baseComponent.js'

Vue.use(baseComponent)

// 添加 echarts 图形
import echarts from 'echarts'

Vue.prototype.$echarts = echarts


// 使用 Event Bus
import bus from './components/common/bus'

// 添加自定义指令
import directive from './domain/directive'

Vue.use(directive)

Vue.config.productionTip = false

// 添加 element ui 组件
import ELEMENT from 'element-ui'

Vue.use(ELEMENT, {size: 'mini'});

// 引入utools的全局函数
import utools from '@/domain/common/utools'

Vue.prototype.utools = utools

Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    bus,
    render: h => h(App)
})
