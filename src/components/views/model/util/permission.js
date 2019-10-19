import router from "../router";
import { getToken } from "./session";

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1 || getToken()) {
    next();
  } else {
    next(`/login?redirect=${to.path}`); // 重新登录
  }
});

router.afterEach(() => {});

export default router
