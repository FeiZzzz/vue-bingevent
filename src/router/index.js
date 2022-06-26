import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入注册登录组件
import Login from '../views/Login/Login.vue'
import Reg from '../views/Reg/Reg.vue'

Vue.use(VueRouter)

// 声明路由规则
const routes = [
  { path:'/login',component:Login},
  { path:'/reg',component:Reg}
]

const router = new VueRouter({
  routes
})

export default router
