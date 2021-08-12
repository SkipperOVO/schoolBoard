import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'root',
            component: (resolve) => require(['@/pages/Sale'],resolve)
        },
        {
            path: '/sale',
            name: 'sale',
            component: (resolve) => require(['@/pages/Sale'],resolve)
        },
        {
            path: '/delivery',
            name: 'delivery',
            component: (resolve => require(['@/pages/Delivery'],resolve))
        },
        {
            path: '/study',
            name: 'study',
            component: (resolve => require(['@/pages/Study'],resolve))
        },
        {
            path: '/user',
            name: 'user',
            component: (resolve => require(['@/pages/User'],resolve))
        },
        {
            path: '/saleDetial',
            name: 'saleDetial',
            component: (resolve => require(['@/pages/SaleDetial'],resolve))
        },
        {
            path: '/myPost',
            name: 'myPost',
            component: (resolve => require(['@/pages/MyPost'],resolve))
        },
        {
            path: '/post',
            name: 'post',
            component: (resolve => require(['@/pages/Post'],resolve))
        },
        {
            path: '/login',
            name: 'login',
            component: (resolve => require(['@/pages/Login'],resolve))
        },
        {
            path: '/register',
            name: 'register',
            component: (resolve => require(['@/pages/Login'],resolve))
        },
        {
            path: '/chat',
            name: 'chat',
            component: (resolve => require(['@/pages/Chat'],resolve))
        },
        {
            path: '/chatList',
            name: 'chatList',
            component: (resolve => require(['@/pages/ChatList'],resolve))
        },
        {
            path: '/admin',
            name: 'admin',
            component: (resolve => require(['@/pages/Admin'],resolve))
        },

    ],

})