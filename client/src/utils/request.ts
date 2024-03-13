import Axios from 'axios';
import axios from 'axios';
import { getLoginInfo, getToken, removeToken, setToken } from '@/auth';
import { login } from '@/api/user';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

// create an axios instance
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// 跨域请求，允许保存cookie
Axios.defaults.withCredentials = true;

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authentication'] = 'Bearer ' + getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log(res.code);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      console.log('error');
      return res;
    } else {
      return res;
    }
  },
  error => {
    if (error.response == undefined) {
      message.error('网络错误');
      return Promise.reject(error);
    }
    if (401 === error.response.status) {
      message.error('登录过期，请重新登录');
      removeToken();
      window.location.href = '/login?redirect=' + window.location.pathname;
    }
    console.log('' + error); // for debug
    return Promise.reject(error);
  },
);
export default service;