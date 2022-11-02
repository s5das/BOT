
  /*判断客户端*/
  export default () => {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
      client = 'IOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      client = 'Android';
    } else {
      client = 'PC';
    }
    return client;
  }
