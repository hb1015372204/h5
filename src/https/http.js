import Axios from "axios";
import qs from 'qs';
import {errorCatch} from "./errorDecorate";

Axios.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
// 添加响应拦截器
Axios.interceptors.response.use(
  (response) => {
    console.log(response)
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
      let domain;
      switch(params.domain){
        case 'AMP':
          domain = process.env.VUE_APP_BASE_API_AMP;
          break;
        case 'BT':
          domain = process.env.VUE_APP_BASE_API_BT;
          break;
      }
      let newUrl = domain + url +'?nodeId='+params.nodeId;
      delete params.domain;
      let headers = isHead ? Object.assign({}, isHead, {'serve-name': process.env.VUE_APP_BASE_SERVENAME}) : {};
      return await Axios.get(newUrl, {headers})
    }
    
    @errorCatch
    static async post(url, params, isHead, transType) {
      let domain;
      switch(params.domain){
        case 'AMP':
          domain = process.env.VUE_APP_BASE_API_AMP;
          break;
        case 'BT':
          domain = process.env.VUE_APP_BASE_API_BT;
          break;
      }
      let newUrl = domain + url;
      delete params.domain;
      let headers = isHead ? Object.assign({}, isHead, {'serve-name': process.env.VUE_APP_BASE_SERVENAME},{'Content-Type' : "application/json"}) : {};
      let newParams = transType=='qs_type'?qs.stringify(params):JSON.stringify(params);
      return await Axios.post(newUrl, newParams, {headers})
    }
}
