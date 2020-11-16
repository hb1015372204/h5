import Axios from "axios";
import qs from 'qs';
import {errorCatch} from "./errorDecorate";

var instance = Axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout:5000,
  headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},
  transformRequest: [function (data) {
    if (Object.prototype.toString.call(data) == '[object FormData]') {
      return data
    }else{
      //对需要做身份确认的请求（除登录/注册/获取数据字典等请求以外的所有请求），添加shopCode
      if(!data || !data.noAuth) {
        const suserId = {suserId:'U519177394947358720'}//JSON.parse(localStorage.getItem('suserId'))
        data = Object.assign({}, data, suserId)
      }
      return qs.stringify(data, {allowDots: true})
    }
  }]
});
instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export class fetch {
    @errorCatch
    static async get(url, params, isHead) {
      return await instance.get(url, params, isHead)
    }
    @errorCatch
    static async post(url, params, isHead) {
      console.log('===11==',params)
      return await instance.post(url, params, isHead)
    }
}