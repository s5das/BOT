import serviceAxios from "@/http";

export const getDetails = (params) => {
    return serviceAxios({
        method: 'GET',
        url: `/fanbook/deliverbot/general/order/get_details/${params.orderId}`,
    });
};

export const getPrivateChannelName = (params) => {
    return serviceAxios({
        method: 'GET',
        url: `/fanbook/deliverbot/general/order/get_private_channel_name/${params.orderId}`
    });
};

export const channelInit = (orderId) => {
    return serviceAxios({
        method: 'GET',
        url: `/fanbook/deliverbot/general/order/create_private_channel/${orderId}`
    });
};
