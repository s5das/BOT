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
        url: `/fanbook/deliverbot/front/order/courier/get_basic_info/${params.orderId}`,
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
        url: `/fanbook/deliverbot/front/order/courier/take_order/${params.orderId}`,
    });
};


// 将订单状态变更为已送达
export const turnDelivered = (params) => {
    return serviceAxios({
        method: 'get',
        url: `/fanbook/deliverbot/front/order/courier/turn_delivered/${params.orderId}`,
    });
};


export const getCouldWithdraw = () => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/money/get_could_withdraw'
    })
};


export const sendrequest = (withdraw_money) => {
    return serviceAxios({
        method: 'post',
        url: '/fanbook/deliverbot/front/money/apply_to_withdraw',
        data: { withdraw_money }
    })
}

export const getwithdrawinfo = (serialNumber) => {
    return serviceAxios({
        method: 'get',
        url: `/fanbook/deliverbot/front/money/get_withdraw_history/${serialNumber}`
    })
}