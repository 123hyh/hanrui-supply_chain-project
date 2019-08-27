import router from '@/router/index.js'
const state = {
  breadCrumbsList: []
}
/**
 * @method initbreadCrumbsList 页面刷新是初始化面包屑导航
 * @method addbreadCrumbsList 保存当前路由对象
 * @method removebreadCrumbData 面包屑点击删除 当前对象
 */
const mutations = {

  initbreadCrumbsList(state, params) {
    state.breadCrumbsList = params || []
  },

  addbreadCrumbsList({ breadCrumbsList }, params) {
    Array.isArray(params) && (breadCrumbsList = params)
    let isExist = breadCrumbsList.some(item => item.path == params.path)
    if (isExist) {
      breadCrumbsList.forEach(function(item, i) {
        item.path === params.path && (this[i] = { ...this[i], ...params })
      }, breadCrumbsList)
    } else {
      params.title && breadCrumbsList.push(params)
    }
    // 首页排列第一的处理
    {
      let index = breadCrumbsList.findIndex(item => item.path === '/M00')
      index &&
        (breadCrumbsList.unshift(breadCrumbsList[index]),
        breadCrumbsList.splice(++index, 1))
    }
  },

  removebreadCrumbData(state, { index, type, active, isActive, path }) {
    /**
     * @param index 删除的下标
     * @param type 点击关闭时 的点击对象
     * @param active 点击删除其他时  当前高亮路由
     * @param isActive 点击删除单个页签时 判断是否点击当前高亮
     * @param path  删除的路由 path
     */
    if (type) {
      switch (type) {
        // 点击关闭按钮中的两个选项处理
        case 'all':
          state.breadCrumbsList = [{ path: '/M00', title: '首页' }]
          router.push({ path: '/M00' })
          break
        case 'other':
          state.breadCrumbsList = [
            { path: '/M00', title: '首页' },
            ...state.breadCrumbsList.filter(item => item.path === active)
          ]
          break
      }
    }
    // 删除当个路由
    index !== undefined && state.breadCrumbsList.splice(index, 1)
    // 点击删除单个页签  是否关闭的是当前高亮的页签
    if (isActive) {
      state.breadCrumbsList.length
        ? router.push({ path: state.breadCrumbsList[--index].path })
        : router.push({ path: '/M00' })
    }
    // 删除对应的路由 编辑页面的返回按钮 删除对应的路由
    path &&
      state.breadCrumbsList.splice(
        function() {
          return this.findIndex(item => item.path === path)
        }.call(state.breadCrumbsList),
        1
      )
  }
}
const actions = {}

const getters = {
  getbreadCrumbsList: ({ breadCrumbsList }) => breadCrumbsList,
  
  getActivePathData({ breadCrumbsList }) {
    return path => {
      let data = {}
      for (let item of breadCrumbsList) {
        item.path === path && item.data && (data = item.data)
      }
      return data
    }
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
