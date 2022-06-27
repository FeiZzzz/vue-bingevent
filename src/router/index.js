import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入注册登录组件
import Login from '../views/Login/Login.vue'
import Reg from '../views/Reg/Reg.vue'
// 导入后台主页组件
import Main from '../views/Main/Main.vue'
// 导入Home 组件
import Home from  '../views/menus/Home/Home.vue'
// 导入基本资料组件
import UserInfo from  '../views/menus/User/UserInfo.vue'
//导入更换头像组件
import UserAvatar from '../views/menus/User/UserAvatar.vue'
// 导入修改密码组件
import UserPwd from '../views/menus/User/UserPwd.vue'


Vue.use(VueRouter)

// 把下面的代码粘贴到路由模块中对应的位置，即可防止路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 声明路由规则
const routes = [
  { path:'/login',component:Login},
  { path:'/reg',component:Reg},
  // 后台主页路由规则
  {
     path:'/',
     component:Main,
    //  开启路由重定向
    redirect: '/home',
    children:[
      // home 作为子路由规则
      { path:'/home',component:Home},
      // 用户信息的路由子规则
      { path:'/user-info',component:UserInfo},
      // 更换头像的路由子规则
      { path:'/user-avatar',component:UserAvatar},
       // 重置密码的路由子规则
      { path:'/user-pwd',component:UserPwd},
    ]

},

]

const router = new VueRouter({
  routes
})

export default router
