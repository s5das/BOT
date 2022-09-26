import serviceAxios from "@/http";

export const getCouriers = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/courier/get_couriers',
        data
    });
};

export const get_primary_info = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/courier/get_primary_info',
        params
    });
};

export const resetPrimaryInfo = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/courier/reset_primary_info',
        data
    });
};
