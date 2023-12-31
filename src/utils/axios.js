/*
 * @Author: qianhua.xiong
 */

import axios from 'axios';
import { ElMessage } from 'element-plus';
const BaseURL =  '/api/v1/';
const service = axios.create({
    baseURL: BaseURL, 
    headers: {
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": true,
    },
    timeout: 10000,
    withCredentials: true
});

// 请求拦截
service.interceptors.request.use(config => {
    let JWT = sessionStorage.getItem('JWT');
    if(JWT){
        config.headers["token"] =  JWT;
    }
    return config;
});

// 返回拦截
service.interceptors.response.use((res)=> {
    console.log(res)
    return res.data
}, (err)=> {
    const message = err.response.data && err.response.data.errorMsg || 'unknown error';
    return Promise.reject(message);
});
function request (url, method) {
    return function (params) {
      return service[method](url, qs.stringify(params, { arrayFormat: 'brackets' })).then(
        res => {
          const {data} = res
          return data
        }
      ).catch((err) => {
        console.error(err)
        ElMessage.error('请求出错！'+err)
      })
    }
  }
  function requestGet (url, method) {
    return function (params) {
      return service[method](url, {params: params}).then(
        res => {
          if (res.data.code == 405 || res.data.code == 406 || res.data.code == 407 ) {
            ElMessage.error('请求出错！')
            return
          }
          const {data} = res
          return data
        }
      ).catch((err) => {
        console.error(err)
        ElMessage.error('请求出错！'+err)
      })
    }
  }
  function requestJson (url, method) {
    return function (params) {
      return service[method](url, params).then(
        res => {
          const {data} = res
          return data
        }
      ).catch((err) => {
        console.error(err)
        ElMessage.error('请求出错！')
      })
    }
  }
export const postJson = url => requestJson(url, 'post')
export const post = url => request(url, 'post')
export const get = url => requestGet(url, 'get')
export const upload = BaseURL
