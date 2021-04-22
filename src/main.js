import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
import Router from 'vue-router'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(ElementUI) //使用elementUI
Vue.use(MintUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
