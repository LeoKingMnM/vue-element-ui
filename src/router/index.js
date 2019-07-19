// 创建路由对象 及 配置路由规则 和 其他路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home'
import Welcome from '@/views/welcome'

import Mystyle from '@/views/mystyle'
import Issue from '@/views/issue'
import Material from '@/views/material'
import Pinglun from '@/views/pinglun'
import Fensi from '@/views/fensi'


import Article from '@/views/article'
import NotFound from '@/not'

import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/index',
      name: 'home',
      component: Home,
      children: [
        //首页二级路由
        {
          path: '/index',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        },
        {
          path: '/mystyle',
          name: 'mystyle',
          component: Mystyle
        },
        {
          path: '/issue',
          name: 'issue',
          component: Issue
        },
        {
          path: '/material',
          name: 'material',
          component: Material
        },
        {
          path: '/pinglun',
          name: 'pinglun',
          component: Pinglun
        },
        {
          path: '/fensi',
          name: 'fensi',
          component: Fensi
        },
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
//注册一个全局前置导航守卫
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
  if (to.path !== '/' && !user) return next('/')
  next()
})
export default router