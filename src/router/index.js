import VueRouter from "vue-router";

export default new VueRouter({
    mode:'history',
    routes: [
        
        {   //登录
            path: '/',
            component: () => import("@/pages/login2.vue"),
            props({query}){
              return{state:query.state,code:query.code}
            }
        },
        {
            path: '/login',
            component: () => import("@/pages/login.vue"),
            props({ query }) {
                return {code:query.code}
            }
        },
        {
            path: '/front',
            redirect:'/front/homepage',
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
                    props({query}) {
                        return {orderId:query.orderId}
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
                    name: 'orderDetail',
                    path: 'courier/orderDetail/:id',
                    component: () => import("@/pages/front/courier/orderDetail.vue")
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
                },

                {
                    path: 'locationsettings',
                    component: () => import("@/pages/back/locationsettings.vue"),
                },
                {
                    path: 'gennewsize',
                    component: () => import("@/pages/back/gennewsize.vue"),                    
                },
                {
                    path: 'sizesettings',
                    component:() => import("@/pages/back/sizesettings.vue") 
                },
                {
                    path: 'customermanage',
                    component:() => import("@/pages/back/customermanage.vue")
                },
                {
                    path: 'setdown',
                    component:() => import("@/pages/back/setdown.vue")
                },
                {
                    path: 'moneymanage',
                    component:() => import("@/pages/back/moneymanage.vue")
                },
                {
                    path: 'courierManage',
                    component: () => import("@/pages/back/courierManage.vue")
                },
                {
                    path: 'orderManage',
                    component: () => import("@/pages/back/orderManage.vue")
                }
            ]
        },

    ]
     
})