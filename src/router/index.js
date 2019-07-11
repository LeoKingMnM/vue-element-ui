// 创建路由对象 及 配置路由规则 和 其他路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home'
import Welcome from '@/views/welcome'

import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/',
        name: 'welcome',
        component: Welcome
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router