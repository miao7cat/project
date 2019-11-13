import Vue from 'vue'
import Router from 'vue-router'
// 引入一级路由
import Index from '@/components/index'
import Detail from '@/components/detail'
import Login from '@/components/login'
import Regist from '@/components/regist'
// 引入二级路由
import Home from '@/components/pages/home'
import Sort from '@/components/pages/sort'
import ShopCar from '@/components/pages/shopCar'
import Mine from '@/components/pages/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/sort',
          component: Sort
        }, {
          path: '/shopCar',
          component: ShopCar
        }, {
          path: '/mine',
          component: Mine
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    , {
      path: '/regist',
      component: Regist
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
