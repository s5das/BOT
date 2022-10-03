import serviceAxios from "@/http/api/back";

export const add = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/pickup_stations/add',
        data
    });
};

export const resetStationList = (data) => {
    return serviceAxios({
        method: 'POST',
        url: '/fanbook/deliverbot/back/admin/pickup_stations/reset_station_list',
        data
    })
}