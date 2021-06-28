import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
import axios from 'axios'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import router from '@/router/index'

import * as qiniu from 'qiniu-js'

Vue.config.productionTip = false

Vue.use(ElementUI) //使用elementUI
Vue.use(MintUI)

Vue.prototype.$axios = axios
Vue.prototype.$qiniu = qiniu

Vue.prototype.$context = new Vue({

  data()  {
    return {
      serverUrl: "http://localhost:8080",
      qiniuDomain: "qve6sr81v.hn-bkt.clouddn.com",
      currentUser: null,
      currentPage: null,
      lastSaleDetialPage: {
        user:null,
        comments: null,
        saleDetial: null,
        scrollY: 0,
      },
      user: {
        userId:null,
        userName:null,
        userAvatarLink:null,
        stuId:null,
        region:null,
        realName:null,
      }
    }
  },

  methods: {
    setUserAction(user) {
      //pass
      console.log(user)
    },

    setLastSaleAction(lastState) {
      this.lastSaleDetialPage = lastState
    },
    getLastSaleDetial() {
      return this.lastSaleDetialPage
    }
  },


})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
