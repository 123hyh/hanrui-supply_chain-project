import api from '@/assets/js/appHelper.js'
const state = {
  copyright: '',
  systemName: ''
}
const mutations = {
  setSystem(state, data = {}) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) state[key] = data[key]
    }
    // 设置网页 title
    document.getElementsByTagName('title')[0].textContent = state.systemName
  }
}
const actions = {
  async getSystem({ commit }) {
    const [
      {
        data: { propValue: systemName }
      },
      {
        data: { propValue: copyright }
      }
    ] = await Promise.all([api.getSystemName(), api.getCopyright()])
    commit('setSystem', { systemName, copyright })
  }
}
const getters = {
  systemName: state => state.systemName,
  copyright: state => state.copyright
}
export default { state, mutations, actions, getters }
