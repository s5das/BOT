import serviceAxios from "@/http";

export const allocate = (params) => {
    return serviceAxios({
        method: 'GET',
        url: `/fanbook/deliverbot/back/admin/order/allocate/${params.orderId}/${params.courierId}`,
    });
};

export const cancelOrder = (params) => {
    return serviceAxios({
        method: 'GET',
        url: `/fanbook/deliverbot/back/admin/order/cancel_order/${params.orderId}`,
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
        url: `/fanbook/deliverbot/back/admin/order/reallocate/${params.orderId}/${params.formerCourierId}/${params.latterCourierId}`,
    });
};

export const getGuildStatistics = () => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/order/get_guild_statistics',
    })
}