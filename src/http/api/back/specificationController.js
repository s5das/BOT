import serviceAxios from "@/http";

export const add = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/specs/add',
        data
    });
};

export const resetSpecList = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/specs/reset_spec_list',
        data
    });
};