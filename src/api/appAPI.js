import {fetch} from '@/https/http'

const baseUrl = '/app-api/api'
export default {
    // 资讯列表
    getHotContentList: (data, headers) =>{
        Object.assign(data, {domain: 'BT'})
        return fetch.get(`${baseUrl}/v1.0/content/route/getContentInfo`, data, headers)
    },
    // 根据 getHotContentList 返回 thematic.id 获取信息列表
    queryPostsList: (data, headers) =>{
        Object.assign(data, {domain: 'BT'})
        return fetch.post(`${baseUrl}/v1.0/community/route/queryPostsList`, data, headers, 'json_type')
    }
}