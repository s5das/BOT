import serviceAxios from "@/http/api/back/httpForBack";

export const blurSearchClients = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/client/blur_search_clients',
        data
    });
};