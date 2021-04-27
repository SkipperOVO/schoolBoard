import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import router from '@/router/index'

Vue.config.productionTip = false

Vue.use(ElementUI) //使用elementUI
Vue.use(MintUI)

window.addEventListener('popstate',function (){
  router.isBack = true;
},false)

// 视图切换动画逻辑
// let history = window.sessionStorage
// let historyCount = history.getItem('count') * 1 || 0
// function routerTransition (to, from) {
//   const toIndex = history.getItem(to.name)
//   const fromIndex = history.getItem(from.name)
//   let direction = 'forward'
//   if (toIndex) {
//     if (toIndex >= fromIndex || !fromIndex) {
//       // store.commit('UPDATE_DIRECTION', {direction})
//     } else {
//       direction = 'reverse'
//       // store.commit('UPDATE_DIRECTION', {direction})
//     }
//   } else {
//     ++historyCount
//     history.setItem('count', historyCount)
//     to.path !== '/' && history.setItem(to.name, historyCount)
//     direction = 'forward'
//     // store.commit('UPDATE_DIRECTION', {direction})
//   }
// }
//
// router.beforeEach(function (to, from, next) {
//   routerTransition(to, from)
//   next()
// })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
