import serviceAxios from "../..";
export  function wxpay(jine, orderid) {
    const orderIdWithPrefix = 'order_id-' + orderid
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
            url = url + '&redirect_url=https%3A%2F%2Fwww.foodmemory.com.cn%2Ffront%2Fpayjudge'
            console.log(url);
            window.location.href = url
        })
}

export function paycheck(orderid){
    const outTradeNo = 'order_id-' + orderid
    return serviceAxios({
        url:'/fanbook/deliverbot/wxPay/queryOrder',
        method:'get',
        params:{
            outTradeNo
        }
    })
}