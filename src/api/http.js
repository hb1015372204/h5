import Axios from "axios";
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
      return response;
    },
    (error) => {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );

export class fetch {
    @errorCatch
    static async get(url, params, isHead) {
      return await Axios.get(url, params, isHead)
    }
    @errorCatch
    static async post(url, params, isHead) {
      return await Axios.post(url, params, isHead)
    }
}