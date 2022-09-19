import serviceAxios from "../index";

export const getUserInfo = (params) => {
    return serviceAxios({
        method: "get",
        url: "/api/website/queryMenuWebsite",
        params: params,
    });
};

export const login = (data) => {
    return serviceAxios({
        url: "/api/user/login",
        method: "GET",
        data,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        requestType: 'form',
    });
};