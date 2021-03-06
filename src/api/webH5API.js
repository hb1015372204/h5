import {fetch} from '@/https/http'

const baseUrl = '/web/h5'
export default {
    // 获取基础素材
    getcontent: (data) => {
        Object.assign(data, {domain: 'AMP'})
        return fetch.post(`${baseUrl}/api-get-content`, data,  null,'qs_type')
    },
    // 查询是否有权限投票和投票列表
    getpickupVoteList: (data) => {
        Object.assign(data, {domain: 'AMP'})
        return fetch.post(`${baseUrl}/api-pickupvote-list`, data,  null,'qs_type')
    },
    // 投票
    votefor: (data) => {
        Object.assign(data, {domain: 'AMP'})
        return fetch.post(`${baseUrl}/api-pickupvote-vote`, data,  null,'qs_type')
    },
    // 上传图片
    uploadPics: (data) => fetch.post(`${baseUrl}/api-pics`, data),
    // 提交会徽报名信息
    emblemInfoSubmit: (data) => fetch.post(`${baseUrl}/api-dog-emblem-submit`, data),
    // 获取参与人数等基本信息
    getDogInfo: () => fetch.post(`${baseUrl}/api-dog-info`),
    // 用户参与情况
    getDogUserDetail: () => fetch.post(`${baseUrl}/api-dog-user-detail`),
    // 会徽报名列表
    getEmblemList: (data) => fetch.post(`${baseUrl}/api-dog-emblem`, data),
    // 点赞
    emblemLike: (data) =>  fetch.post(`${baseUrl}/api-dog-emblem-like`, data),
    // 分享增加抽奖机会
   emblemShare: () => fetch.post(`${baseUrl}/api-dog-emblem-share`),
    // 抽奖
    dogDraw: () => fetch.post(`${baseUrl}/api-dog-draw`),
    // 抽奖记录
    drawHistory: (data) => fetch.post(`${baseUrl}/api-dog-draw-history`, data)
}