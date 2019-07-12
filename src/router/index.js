// 创建路由对象 及 配置路由规则 和 其他路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home'
import Welcome from '@/views/welcome'


import Compontes from '@/compontes/text'
import Neirong from '@/compontes/neirong'
import Fensi from '@/compontes/fensi'
import Sucai from '@/compontes/sucai'
import Pinglun from '@/compontes/pinglun'
import NotFound from '@/not'

import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/index',
      name: 'home',
      component: Home,
      children: [
        {
        path: '/index',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/compontes/text',
        name: 'text',
        component: Compontes
      },
      {
        path: '/compontes/neirong',
        name: 'neirong',
        component: Neirong
      },
      {
        path: '/compontes/fensi',
        name: 'fensi',
        component: Fensi
      },
      {
        path: '/compontes/sucai',
        name: 'sucai',
        component: Sucai
      },
      {
        path: '/compontes/pinglun',
        name: 'pinglun',
        component: Pinglun
      },
    ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
//注册一个全聚德前置导航守卫
router.beforeEach((to, from, next) => {
  //如果不去主动触发resolve（next 下一步） 会一直等待
  //如果登陆页放行

  // if (to.path === '/') return next()
  // //判断登陆状态
  const user = window.sessionStorage.getItem('hm-73toutiao')
  // if (user) {
  //   next()
  // }else {
  //   next('/')
  // }
  

  //简化版
  if (to.path !== '/' && !user ) return next('/') 
  next()
})
export default router