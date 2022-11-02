import { Toast } from "vant";
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
            
            let plantform = localStorage.getItem('plantform')
            if(plantform=='Android'){
                url = url + '&redirect_url='+'https%3A%2F%2Fwww.gzxunyustf.top%2Ffront%2Fpayjudge'
                var gotoLink = document.createElement('a');
                gotoLink.href = url;
                document.body.appendChild(gotoLink);
                gotoLink.click();
            }else{
                var gotoLink = document.createElement('a');
                gotoLink.href = url;
                document.body.appendChild(gotoLink);
                gotoLink.click();
            }
            
        },
        ()=>{
            Toast.fail('请在fanbook内访问')
        }
        )
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