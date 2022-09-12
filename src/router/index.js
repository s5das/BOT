import VueRouter from "vue-router";

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: () => import("@/pages/homepage.vue")
        },
        {
            path: '/placeorder',
            component:() => import('@/pages/placeorder.vue')
        },
        {
            path: '/order',
            component: () => import("@/pages/order.vue"),
        },
        {
            path: '/personalcenter',
            component: () => import("@/pages/personalcenter.vue")
        },
        {
            path: '/payfinish',
            component: () => import("@/pages/payfinish.vue")
        },
        {
            path: '/withdraw',
            component: () => import("@/pages/withdraw.vue")
        }
        ,
        // 派送员相关
        {
            name: 'grabOrder',
            path: '/courier/grabOrder',
            component: () => import("@/pages/courier/grabOrder.vue")
        },
        {
            name: 'orderDetail',
            path: '/courier/orderDetail/:id',
            component: () => import("@/pages/courier/orderDetail.vue")
        }
    ]

})