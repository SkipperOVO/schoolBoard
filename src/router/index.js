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
            component: (resolve => require(['@/pages/Delivery'],resolve))
        },
        {
            path: '/study',
            component: (resolve => require(['@/pages/Study'],resolve))
        },
        {
            path: '/user',
            component: (resolve => require(['@/pages/User'],resolve))
        },
        {
            path: '/saleDetial',
            component: (resolve => require(['@/pages/SaleDetial'],resolve))
        },
        {
            path: '/myPost',
            component: (resolve => require(['@/pages/MyPost'],resolve))
        }
    ],

})