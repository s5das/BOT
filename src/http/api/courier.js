import serviceAxios from "../index";

// 申请入驻
export const courierRegister = (params) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/apply/courier_register',
        params: params
    });
};

// 模糊搜索订单
export const blueSearch= (params) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/order/courier/blur_search_orders',
        params: params
    });
};

// 查询未抢订单的详情
export const getBasicInfo = (data) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/order/courier/get_basic_info',
        data: data
    });
};

// 查询自己的接单列表
export const getTakenOrderList = (params) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/order/courier/get_taken_order_list',
        params: params
    });
};


// 查询抢单列表
export const showOrdersToTake = (params) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/order/courier/show_orders_to_take',
        params: params,
    });
};

// 抢单
export const takeOrder = (data) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/order/courier/take_order',
        data: data,
    });
};


// 将订单状态变更为已送达
export const turnDelivered = (data) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/order/courier/turn_delivered',
        data: data,
    });
};


export const getCouldWithdraw = (data) => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/withdraw_money/get_could_withdraw',
        data: data,
    });
};
