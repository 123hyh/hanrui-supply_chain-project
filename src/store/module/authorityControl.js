/**
 *
 */
import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'
/**
 * @property IndexMenuList 首页菜单及二级菜单
 * @property listBtn list页面的 btn按钮
 * @property levelThreeMenuList 三级菜单
 */
const state = {
  IndexMenuList: [],
  listBtn: {},

  levelThreeMenuList: {}
}
const mutations = {
  setAuthorityControlState(
    state,
    { IndexMenuList, listBtn, levelThreeMenuList }
  ) {
    state.IndexMenuList = IndexMenuList
    state.listBtn = listBtn
    state.levelThreeMenuList = levelThreeMenuList
  },
  setMenuList(state, { data }) {
    state.IndexMenuList = data
  },
  // 设置三级菜单和按钮
  setListBtnAndThreeMenu(state, { listBtn, levelThreeMenuList }) {
    state.listBtn = listBtn
    state.levelThreeMenuList = levelThreeMenuList
  },

  // 清空菜单和按钮
  resetAuthority(state) {
    for (let key in state) {
      if (state.hasOwnProperty(key)) {
        const TYPE = Object.prototype.toString.call(state[key]).slice(8, -1)
        switch (TYPE) {
          case 'Object':
            state[key] = {}
            break
          case 'Array':
            state[key] = []
        }
      }
    }
  }
}
const actions = {
  // 获取 菜单 后 触发 intListBtnAndThreeMenu 处理 btn
  async getMenuList({ dispatch, commit }, callback) {
    commit('setMenuList', await api.getIndexMenu())
    await dispatch('intListBtnAndThreeMenu')
    callback()
  },

  // 处理 list页面的btn按钮
  async intListBtnAndThreeMenu({ commit, state: { IndexMenuList } }) {
    /**
     * @variation listBtn list btn 按钮
     * @variation levelThreeMenuList 三级菜单
     */
    let listBtn = {}
    let levelThreeMenuList = {}
    for (let item of IndexMenuList) {
      if (item.subs.length) {
        for (let elem of item.subs) {
          //  处理页面对应的按钮
          elem.functionCode &&
            (listBtn[elem.menuCode] = elem.functionCode.split(';'))
          // 处理 三级菜单列表
          if (elem.subs.length) {
            levelThreeMenuList[elem.menuCode] = elem.subs
            // 三级 菜单 按钮
            for (let { menuCode, functionCode = '' } of elem.subs) {
              menuCode &&
                (listBtn[menuCode] = functionCode
                  ? functionCode.split(';')
                  : [])
            }
          }
        }
      }
    }
    commit('setListBtnAndThreeMenu', { listBtn, levelThreeMenuList })
    console.log(`菜单及按钮已就绪...`)
    return true
  }
}
const getters = {
  IndexMenuList: state => state.IndexMenuList,
  getListBtn: state => state.listBtn,
  levelThreeMenuList: state => state.levelThreeMenuList
}
export default {
  state,
  mutations,
  actions,
  getters
}
