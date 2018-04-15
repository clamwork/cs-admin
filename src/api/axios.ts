
import axios from 'axios';
import * as config from '../config';
import querystring from 'querystring';
import { loginIn } from '../utils/loginIn';
import app from '../main';

const ax: any = axios.create({
  baseURL: config.API_ROOT,
})

// 拦截器
ax.interceptors.request.use(( iConfig: any) => {
  if (
    iConfig.method === 'post' ||
    iConfig.method === 'put' ||
    iConfig.method === 'delete' ||
    iConfig.method === 'patch'
  ) {
    iConfig.data = querystring.stringify(iConfig.data);
  }
  if (window.localStorage.getItem('TOKEN')) {
    iConfig.headers.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN') || '').token}`;
  }
  return iConfig;
}, (error: any) => {
  return Promise.reject(error);
})

ax.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  if (!loginIn()) {
    app.$alert('用户信息已过期，请点击确定后重新登录。', '提示', {
      confirmButtonText: '确定',
      callback: action => app.$router.push({
        path: '/login',
        query: { redirect: app.$route.fullPath },
      }),
    });
  }
  return Promise.reject(error);
})

export default ax;
