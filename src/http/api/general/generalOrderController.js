import serviceAxios from "@/http";

export const getDetails = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/general/order/get_details',
        params
    });
};