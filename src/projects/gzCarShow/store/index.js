import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
  
import axios from 'axios'

import { Toast } from 'vant';
import API from '@/api/webH5API';

const store = new Vuex.Store({
  state: {
    contentInfo: {}, // 获取素材数据
  },  
  getters: {
    GET_CONTENTINF(s) {
        return s.mpSetParams;
    },
  },
  mutations: {
    SET_CONTENTINF: (state, data) => {
        state.contentInfo = data;
    }
  },
  actions: {
    
    getcontentInfo:({commit,state},params)=>{
        axios.get('/web/h5/api-get-content',params)
        .then(res=>{
            commit('SET_CONTENTINF',res.object)
        }).catch(err=>{
            Toast.fail(err);
        })
    }
  }
})

export default store