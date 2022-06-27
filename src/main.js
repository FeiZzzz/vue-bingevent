import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// 导入全局样式表
import '@/assets/global.less'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 为请求头挂载 Authorization 字段
 //  console.log(config);
 // 如果请求路径包含有 my 就为它设置请求头为 token
 if(config.url.startsWith('/my')) {
   config.headers.Authorization = store.state.token

 }
 // 在发送请求之前做些什么
 return config;
}, function (error) {
 // 对请求错误做些什么
 return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
 // 2xx 范围内的状态码都会触发该函数。
 // 对响应数据做点什么
 return response;
}, function (error) {
//  console.log(error);
if(error.response.status === 401) {
  //清除无效的 token
  store.commit('updateToken','')
  // 并跳转到首页
  router.push('/login')
}
 // 超出 2xx 范围的状态码都会触发该函数。
 // 对响应错误做点什么
 return Promise.reject(error);
});



Vue.config.productionTip = false
// 设置全局基地址
axios.defaults.baseURL = 'http://big-event-vue-api-t.itheima.net'
// 把axios 挂载到 Vue原型对象上
Vue.prototype.$http = axios
// 挂载elme
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


