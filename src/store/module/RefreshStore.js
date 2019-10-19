/* 页面刷新时保存 state 的数据 */
import utools from '@/domain/common/utools.js'

export default {
  mutations: {
    setStore(state) {
      // 替换 state
      const data = utools.getSession('state')
      if (data) {
        this.replaceState(data)
      } else {
        // 初始化 查询条件下拉,  和 版权信息 //// 权限菜单放在 路由鉴权时获取
        Promise.all(
          ['getOrderStatus', 'getSystem'].map(item =>
            this.dispatch(item)
          )
        )
      }
    },
    PreservationStore() {
      utools.setSession('state', this.state)
    }
  }
}
