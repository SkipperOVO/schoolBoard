import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'sale',
            component: (resolve) => require(['@/pages/sale'],resolve)
        }
        //pass
    ]
})