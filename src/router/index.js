import VueRouter from "vue-router";

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: () => import("@/pages/homepage.vue")
        },
        {
            path: '/placeorder',
            component:() => import('@/pages/getservice/placeorder.vue')
        },
        {
            path: '/order:mode?',
            component: () => import("@/pages/order.vue"),
            props({ query }) {
                console.log(query);
                return {condition:query.condition}
            }
        },
        {
            path: '/personalcenter',
            component: () => import("@/pages/personalcenter/personalcenter.vue")
        },
        {
            path: '/payfinish',
            component: () => import("@/pages/getservice/payfinish.vue"),
            props({querry}) {
                return {orderId:querry.orderId}
            }
        },
        {
            path: '/withdraw',
            component: () => import("@/pages/personalcenter/withdraw.vue")
        }
        ,
        // 派送员相关
        {
            name: 'grabOrder',
            path: '/courier/grabOrder',
            component: () => import("@/pages/courier/grabOrder.vue")
        },
        {
            name: 'orderDetail/courier',
            path: '/courier/orderDetail/:id:status',
            component: () => import("@/pages/courier/orderDetail.vue")
        },
        // 用户
        {
            name: 'orderDetail/user',
            path: '/user/orderDetail/:id:status',
            component: () => import("@/pages/user/orderDetail.vue")
        }
    ]

})