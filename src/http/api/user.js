import serviceAxios from "../index";

export const completeOrder = (params) => {
  return serviceAxios({
    method: "get",
    url: `/fanbook/deliverbot/front/order/client/complete_order/${params.orderId}`,
  });
};

export const getOrderList = (data) => {
  return serviceAxios({
    method: "post",
    url: "/fanbook/deliverbot/front/order/client/get_order_list",
    data,
  });
};

export const blurSearch = (data) => {
  return serviceAxios({
    method: "post",
    url: "/fanbook/deliverbot/front/order/client/blur_search",
    data,
  });
};

export const cancelOrder = (params) => {
  return serviceAxios({
    method: "get",
    url: `/fanbook/deliverbot/front/order/client/cancel_order/${params.orderId}`,
    params,
  });
};

export const login = (code) => {
  const guildId = BigInt(localStorage.getItem('guildid'))
  return serviceAxios({
    methods: "get",
      url: `/fanbook/deliverbot/general/login/front`,
    params:{code,guildId}
  });
};

export const login_back = (code) => {
  const guildId = BigInt(localStorage.getItem('guildid'))
  return serviceAxios({
    methods: "get",
      url: `/fanbook/deliverbot/general/login/back`,
      params:{code,guildId}
  });
};
