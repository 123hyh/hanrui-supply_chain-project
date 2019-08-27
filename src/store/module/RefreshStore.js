/* 页面刷新时保存 state 的数据 */
import utools from "@/domain/common/utools.js";

export default{
  mutations: {
    setStore(state, data){
      // 替换 state
      utools.getSession('state') && this.replaceState(data)
    },
    PreservationStore(){
      utools.setSession('state', this.state)
    },
  }
}