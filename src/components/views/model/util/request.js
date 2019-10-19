import axios from "axios";
import { getToken, setToken, removeToken } from "./session";
// import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: "/scp",
  timeout: 5000
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers["x-auth-token"] = getToken();
    }
    if(config.url == '/auth/logout'){
      removeToken()
    }
    return config;
  },
  error => {
    // Message({ message: '请求数据失败', type: 'error',center: true });
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    if (response.status == 403) {
      this.$router.push('/login')
    } else if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      if (response.config.headers['x-auth-token'] || response.headers['x-auth-token']) {
        // 如果后台返回的token即表示是登录接口并成功
        setToken(response.config.headers['x-auth-token'] || response.headers['x-auth-token'])
      }
      return response.data;
    }
  },
  error => {
    // Message({ message: '获取数据失败', type: 'error',center: true });
    return Promise.reject(error);
  }
);

export default service;
