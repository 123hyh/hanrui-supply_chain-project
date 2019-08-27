import api from '@/assets/js/appHelper.js'
import router from '@/router/router.js'
import utools from '@/domain/common/utools.js'
import store from '@/store/index.js'

router.beforeEach((to, from, next) => {
	(async () => {
    const WhiteList = ['/403', '/404', '/login', '/tanstion'];
    // to.path !== '/403' && to.path !== '/404' && to.path !== '/login' && to.path !== '/tanstion' // 判断条件
		if (!WhiteList.includes(to.path)) {
			if ((!utools.judgeNullObj(store.state.authorityControl.IndexMenuList)) && !utools.getSession('state')) {
        // 获取菜单
				const {data} = await api.getIndexMenu();
				store.commit('setAuthorityControlState', {IndexMenuList: data, ...utools.setlevelThreeMenuListAndBtn(data)})
			} else {
				utools.getSession('state') && store.replaceState(utools.getSession('state'));
				utools.removeSession('state')
			}
			// 判断菜单列表中是否有这个菜单
			let isJurisdiction = store.state.authorityControl.IndexMenuList.some(item => {
				if (item.subs.length) {
					return item.subs.some(elem => elem.menuCode === to.path.slice(1))
				} else {
					return item.menuCode === to.path.slice(1)
				}
			})
			// 判断是否有权限，没有的话跳 403
			if (isJurisdiction) {
				next()
			} else {
				// 编辑页面暂时不搞
				next()
				// next({path: '/403'})
			}
		} else {
			utools.getSession('state') && store.replaceState(utools.getSession('state'))
			next()
		}
	})()
})
export default router