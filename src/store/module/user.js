const state = {
    userInfo: {}
  },
  mutations = {
    setUserInfo(state, data = {}) {
      state.userInfo = data
    }
  },
  getters = {
    userInfo: state => state.userInfo
  }
export default { state, mutations, getters }
