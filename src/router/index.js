import VueRouter from "vue-router";

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: () => import("@/pages/homepage.vue")
        },
        {
            path: '/order',
            component: () => import("@/pages/order.vue")
        },
        {
            path: '/personalcenter',
            component: () => import("@/pages/personalcenter.vue")
        },

        // 派送员相关
        {
            name: 'grabOrder',
            path: '/courier/grabOrder',
            component: () => import("@/pages/courier/grabOrder.vue")
        }
    ]

})