// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入rem布局
import './assets/js/remScale'
// 引入reset布局
import './assets/css/reset.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/font_3kp746gldbv/iconfont.css'
Vue.use(Vant)
// 引入axios
import axios from 'axios'
Vue.prototype.$http=axios
//引入过滤器
import filter from './assets/filter/timer'
// console.log(filter,'filter')
//创建全局过滤器
Vue.filter('myFilter',filter)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
