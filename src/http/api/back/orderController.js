import serviceAxios from "@/http";

export const allocate = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/order/allocate',
        params
    });
};

export const cancelOrder = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/order/cancel_order',
        params
    });
};

export const getOrderList = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/order/get_order_list',
        data
    });
};

export const reallocate = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/order/reallocate',
        params
    });
};

