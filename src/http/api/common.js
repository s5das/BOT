import serviceAxios from "..";

// /general/user/get_user_type，返回一个整数 user_type （0未取得派送员资格的用户、1正在申请成为派送员的用户、2取得派送员资格的用户、3管理员）
export const getUserType = () => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/front/apply/courier/get_user_type',
    });
};

// 返回所有快递点
export const getAllSite = () => {
    return serviceAxios({
        method: 'get',
        url: '/fanbook/deliverbot/general/pickup_station/get_all'
    });
};

