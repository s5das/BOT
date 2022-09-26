import serviceAxios from "../index";

export const completeOrder = (params) => {
  return serviceAxios({
    method: "get",
    url: "/fanbook/deliverbot/front/order/client/complete_order",
    params,
  });
};

export const getOrderList = (params) => {
  return serviceAxios({
    method: "post",
    url: "/fanbook/deliverbot/front/order/client/get_order_list",
    params,
  });
};

export const blurSearch = (params) => {
  return serviceAxios({
    method: "post",
    url: "/fanbook/deliverbot/front/order/client/blur_search",
    params,
  });
};

export const cancelOrder = (params) => {
  return serviceAxios({
    method: "get",
    url: "/fanbook/deliverbot/front/order/client/cancel_order",
    params,
  });
};

export const login = (code) => {
  return serviceAxios({
    methods: "get",
      url: `/fanbook/deliverbot/general/login/front`,
    params:{code,guildId:413298633736192000}
  });
};

export const login_back = (code) => {
  return serviceAxios({
    methods: "get",
      url: `/fanbook/deliverbot/general/login/back`,
      params:{code,guildId:413298633736192000}
  });
};
