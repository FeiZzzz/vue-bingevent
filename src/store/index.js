import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入Vuex持久化插件
import persistedstate from 'vuex-persistedstate'

// 导入 axios
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // 2. 配置为Vuex的插件
  plugins: [persistedstate()],
  state: {
    //1. 用来储存登陆成功后得到的token
    token: '',
    //  定义用户信息镀锡
    userInfo: {}

  },

  mutations: {
    // 2. 更新token 的 mutations 函数
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 更新用户的信息
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    //  3. 定义初始化用户基本信息的 action 函数
    async initUserInfo(context) {
      const { data: res } = await axios({
        method: 'get',
        url: '/my/userinfo',
        headers: {
          Authorization: context.state.token
        }
      })
      // console.log(res);
      if (res.code !== 0) return
      context.commit('updateUserInfo', res.data)
    }
  }
})
