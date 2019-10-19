import api from '@/assets/js/appHelper.js';
import router from '@/router/router.js';
import utools from '@/domain/common/utools.js';
import store from '@/store/index.js';
import Vue from 'vue';

router.beforeEach((to, from, next) => {
	(async () => {
		const WhiteList = [
			'/403',
			'/404',
			'/login',
			'/tanstion',
			'/NoticeDetails'
		];
		// to.path !== '/403' && to.path !== '/404' && to.path !== '/login' && to.path !== '/tanstion' // 判断条件
		if (!WhiteList.includes(to.path)) {
			console.log(`router.beforeEach--> ${to.path}`);
			/*  if (
        !utools.judgeNullObj(store.state.authorityControl.IndexMenuList) &&
        !utools.getSession('state')
      ) {
        // 获取菜单
        const { data } = await api.getIndexMenu()
        store.commit('setAuthorityControlState', {
          IndexMenuList: data,
          ...utools.setlevelThreeMenuListAndBtn(data)
        })
      } else {
        utools.getSession('state') &&
          store.replaceState(utools.getSession('state'))
        utools.removeSession('state')
      } */

			// 校验是否具有权限
			function someRoutePath(list = []) {
				let current = list;
				const hash = to.meta.parentRoute || to.path.slice(1);
				if (!hash && !list.length) return;

				// 如果当前是编辑页面 判断 是否具有 (新增 和 修改) 按钮
				if (
					to.meta.parentRoute &&
					store.state.authorityControl.listBtn[to.meta.parentRoute]
				) {
					const btnSet =
						store.state.authorityControl.listBtn[to.meta.parentRoute];
					return btnSet.some(item => item === 'operate' || item === 'insert');
				}
				while (current) {
					for (let item of current) {
						if (hash.includes(item.menuCode)) {
							if (hash === item.menuCode) {
								// 三级菜单暂且处理 通过
								return true;
							}
							if (item.subs.length) {
								return someRoutePath(item.subs);
							} else {
								if (hash === item.menuCode) {
									return true;
								}
								return false;
							}
						}
					}
					break;
				}
			}
			// 判断菜单是否为空,避免新打开页面菜单为空
			let data = store.state.authorityControl.IndexMenuList
			if(!data.length){
				try {
					const res = await api.getIndexMenu();
					store.commit('setMenuList',res);
					store.dispatch('intListBtnAndThreeMenu'); // 处理按钮和多级菜单
				} catch (error) {
					console.log(error)
					return error.status === 403 && router.push('/login')
					alert('获取菜单失败，请刷新重试！')
				}
				
			}
			// 校验
			const isJurisdiction = someRoutePath(
				store.state.authorityControl.IndexMenuList
			);

			/*  // 原有
      let isJurisdiction = store.state.authorityControl.IndexMenuList.some(
        item => {
          if (item.subs.length) {
            return item.subs.some(elem => elem.menuCode === to.path.slice(1))
          } else {
            return item.menuCode === to.path.slice(1)
          }
        }
      ) */
			if (isJurisdiction) {
				next();
			} else {
				next({ path: '/403' });
			}

			// 判断是否有权限，没有的话跳 403
			/* if (isJurisdiction) {
        next()
      } else {
        next({ path: '/403' })
      } */
		} else {
			/*  utools.getSession('state') &&
        store.replaceState(utools.getSession('state')) */
			next();
		}
	})();
});
export default router;
