import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import breadCrumbs from '@/store/module/breadCrumbs.js'
import other from '@/store/module/other.js'
import authorityControl from '@/store/module/authorityControl.js'
import RefreshStore from '@/store/module/RefreshStore.js'
import system from '@/store/module/system.js'
import user from '@/store/module/user.js'
export default new Vuex.Store({
  modules: {
    breadCrumbs,
    other,
    authorityControl,
    RefreshStore,
    system,
    user
  }
})
