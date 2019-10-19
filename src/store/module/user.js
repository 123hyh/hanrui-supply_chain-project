const state = {
    userInfo: {}
  },
  mutations = {
    setUserInfo(state, data = {}) {
      state.userInfo = data
    }
  },
  getters = {
    userInfo: state => state.userInfo,
    userName: state =>
      state.userInfo.userName || localStorage.getItem('ms_username')
  }
export default { state, mutations, getters }
