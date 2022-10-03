import serviceAxios from "@/http/api/back/httpForBack";

export const getRegisterApplications = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/audit/get_register_applications',
        params
    });
};

export const getWithdrawMoneyApplications = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/audit/get_withdraw_money_applications',
        params
    });
};

export const passRegisterApplication = (params) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/audit/pass_register_application',
        params
    });
};

export const passWithdrawMoneyApplication = (parmas) => {
    return serviceAxios({
        method: 'GET',
        url: '/fanbook/deliverbot/back/admin/audit/pass_withdraw_money_application',
        params
    });
};

export const rejectRegisterApplication = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/audit/reject_register_application',
        data
    });
};

export const rejectWithdrawMoneyApplication = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/audit/reject_withdraw_money_application',
        data
    });
};