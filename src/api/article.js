import request from '@/utils/request'
import qs from 'qs';

export default {
    
    getArticleList () {
      return request({
        url: '/api/list',
        method: 'post'
      })
    },
        
    getArticleTag () {
      return request({
        url: '/api/classify',
        method: 'post'
      })
    },

    getDetails (data) {
      return request({
        url: '/api/detail',
        method: 'post',
        data:qs.stringify(data)
      })
    },

    getVisitInfo () {
      return request({
        url: '/api/visitInfo',
        method: 'post',
      })
    },

    getUserInfo () {
      return request({
        url: '/api/userInfo',
        method: 'post',
      })
    },

  }