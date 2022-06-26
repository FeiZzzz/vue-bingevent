import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// 导入全局样式表
import '@/assets/global.less'
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
