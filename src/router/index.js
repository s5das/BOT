import VueRouter from "vue-router";

export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/homepage',
            component: () => import("@/pages/front/frontIndex.vue"),
            children: [
                {
                    path: 'homepage',
                    component: () => import("@/pages/front/homepage.vue")
                },
                {
                    path: 'placeorder',
                    component:() => import('@/pages/front/getservice/placeorder.vue')
                },
                {
                    path: 'order:mode?',
                    component: () => import("@/pages/front/order.vue"),
                    props({ query }) {
                        console.log(query);
                        return {condition:query.condition}
                    }
                },
                {
                    path: 'personalcenter',
                    component: () => import("@/pages/front/personalcenter/personalcenter.vue")
                },
                {
                    path: 'payfinish',
                    component: () => import("@/pages/front/getservice/payfinish.vue"),
                    props({querry}) {
                        return {orderId:querry.orderId}
                    }
                },
                {
                    path: 'withdraw',
                    component: () => import("@/pages/front/personalcenter/withdraw.vue")
                }
                ,
                // 派送员相关
                {
                    name: 'grabOrder',
                    path: 'courier/grabOrder',
                    component: () => import("@/pages/front/courier/grabOrder.vue")
                },
                {
                    name: 'orderDetail/courier',
                    path: 'courier/orderDetail/:id:status',
                    component: () => import("@/pages/front/courier/orderDetail.vue")
                },
                // 用户
                {
                    name: 'orderDetail/user',
                    path: 'user/orderDetail/:id:status',
                    component: () => import("@/pages/front/user/orderDetail.vue")
                }
            ]
        },
        // 后台
        {
            path: '/back',
            redirect: '/back/homepage',
            component: () => import("@/pages/back/backIndex.vue"),
            children: [
                {
                    path: 'homepage',
                    component: () => import("@/pages/back/back_homepage.vue"),
                }
            ]
        }
    ]

})