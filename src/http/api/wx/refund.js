import serviceAxios from "../..";

export function refund(orderid){
    outTradeNo = 'order_id:'+orderid
    serviceAxios({
        url:'/fanbook/deliverbot/wxPay/refund',
        method:'get',
        query:{
            outTradeNo
        }
    })
}

export function checkrefund(orderid){
    outTradeNo = 'order_id:'+orderid
    serviceAxios({
        url:'/fanbook/deliverbot/wxPay/refund',
        method:'get',
        query:{
            outTradeNo
        }
    })
}