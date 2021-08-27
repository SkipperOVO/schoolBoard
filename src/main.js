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
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI) //使用elementUI
Vue.use(MintUI)
Vue.use(Vant)


axios.defaults.withCredentials = true;                  // 使得 axios 请求携带 cookies

Vue.prototype.$axios = axios

Vue.prototype.$qiniu = qiniu


Vue.prototype.$context = new Vue({

    data() {
        return {
            // 移动端开发测试环境
            // serverUrl: "http://192.168.1.103:8080",

            // 本地开发生产环境
            serverUrl: "/api",

            qiniuDomain: "qxttu0q3j.hn-bkt.clouddn.com",
            currentUser: null,
            lastSaleDetialPage: {
                user: null,
                comments: null,
                saleDetial: null,
                scrollY: 0,
            },
            user: {
                userId: 0,
                userName: "还没有登录哦",
                userAvatarLink: "https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                stuId: 0,
                region: "未知星球",
                realName: "",
            },

            pageRouter: {
                lastPage: null,
                currentPage: null,
                switchStyle: "slide-right",
                pathKeySet:
                    {
                        '/': 0,
                        'sale': 0,
                        'delivery': 1,
                        'study': 2,
                        'user': 3,
                        'saleDetial': 1000,
                        'chatList': 1000,
                        'myPost': 1000,
                        'post': 1000,
                        'login': 1000,
                        'chat': 1000,
                        'admin': 1000,
                    },
            },

            offset: {
                high: 60,
                medium: 80,
                low: 100
            }

        }
    },

    methods: {
        setUserAction(user) {
            this.user = user;
        },

        isLogin() {
            return this.user.userId != 0;
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

        getClientHeight() {
            return window.screen.availHeight;
        },

        initBodyHeight() {
            let body = document.getElementsByTagName("body")[0]
            // 遮罩层 将 body 高度设置为当前窗口高度的 79%
            body.style.height = String(this.getClientHeight() - this.getClientHeight() * 0.31 + "px");
        },

        // 使用本地 cookie 发送到服务器端进行验证
        async mountUser() {
            await this.$axios.get(this.$context.serverUrl + "/mountUser")
                .then(response => {
                    console.log(response)
                    if (response.data.data.code === 200) {
                        this.$context.user = response.data.data.data;

                    }
                }).catch(error => {
                    console.log(error);
                })
        },

        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return null;
        }

    },


})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
