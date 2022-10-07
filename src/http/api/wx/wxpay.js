import serviceAxios from "../..";
export  function wxpay(jine, orderid) {
    const orderIdWithPrefix = 'order_id:' + orderid
    const reward = jine
    serviceAxios({
        url:'/fanbook/deliverbot/wxPay/wapPay',
        method: 'get',
        params: {
            orderIdWithPrefix,
            reward,
        }
    }).then(
        (url) => {
            window.location.href = url
        })
}

export function paycheck(orderid){
    const outTradeNo = 'order_id:' + orderid
    serviceAxios({
        url:'/fanbook/deliverbot/wxPay/queryOrder',
        method:'get',
        params:{
            outTradeNo
        }
    })
}