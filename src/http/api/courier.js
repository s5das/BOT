import serviceAxios from "../index";

// 申请入驻
export const courierRegister = (data) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/apply/courier_register',
        data
    });
};


// 查询未抢订单的详情
export const getBasicInfo = (params) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/order/courier/get_basic_info',
        params
    });
};

// 查询自己的接单列表
export const getTakenOrderList = (data) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/order/courier/get_taken_order_list',
        data
    });
};


// 查询抢单列表
export const showOrdersToTake = (data) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/order/courier/show_orders_to_take',
        data
    });
};

// 抢单
export const takeOrder = (params) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/order/courier/take_order',
        params,
    });
};


// 将订单状态变更为已送达
export const turnDelivered = (params) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/order/courier/turn_delivered',
        params
    });
};


export const getCouldWithdraw = (params) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/withdraw_money/get_could_withdraw',
        params
    });
};
