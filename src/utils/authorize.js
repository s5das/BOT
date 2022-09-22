

export default function authorize() {
    window.fb.init({

        success: () => {
             window.fb.oAuth({ 'oAuthUrl': 'http://124.220.9.212:9098/fanbook/deliverbot/general/redirect' }).then(()=>{console.log(111);})
        }
    });
}  