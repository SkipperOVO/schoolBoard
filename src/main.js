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

// Vue.http.options.xhr = { withCredentials: true }
axios.defaults.withCredentials = true;                  // 使得 axios 请求携带 cookies

Vue.prototype.$qiniu = qiniu



Vue.prototype.$context = new Vue({

    data() {
        return {
            serverUrl: "http://localhost:8080",
            qiniuDomain: "qve6sr81v.hn-bkt.clouddn.com",
            currentUser: null,
            lastSaleDetialPage: {
                user: null,
                comments: null,
                saleDetial: null,
                scrollY: 0,
            },
            user: {
                userId: 0,
                userName: "还没有名字哦",
                userAvatarLink: "https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                stuId: 0,
                region: "未知星球",
                realName: "",
            },

            pageRouter: {
                lastPage:null,
                currentPage: null,
                switchStyle: "slide-right",
                pathKeySet:
                    {
                        '/': 0,
                        'sale': 0,
                        'delivery': 1,
                        'study': 2,
                        'user': 3,
                        'saleDetial': 4,
                        'chatList': 4,
                        'myPost' : 4,
                        'post': 4,
                        'chat': 4,
                    },
            },


        }
    },

    methods: {
        setUserAction(user) {
            this.user = user;
        },

        setLastSaleAction(lastState) {
            this.lastSaleDetialPage = lastState
        },

        getLastSaleDetial() {
            return this.lastSaleDetialPage
        },

        switchPageContext(from, to) {
            if (this.pageRouter.pathKeySet[from] > this.pageRouter.pathKeySet[to]) {
                this.pageRouter.switchStyle = "slide-right";
            } else {
                this.pageRouter.switchStyle = "slide-left";
            }
            this.pageRouter.lastPage = from
            this.pageRouter.currentPage = to;
        },

    },


})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
