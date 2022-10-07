<template>
    <div>
      <Orderinfo :orderinfo="orderinfo" />
      <Userinfo :orderinfo="orderinfo" />
    </div>
  </template>
  
  <script>
  import Orderinfo from '@/components/orderinfo.vue';
  import Userinfo from '@/components/userinfo.vue';
  import serviceAxios from '@/http';
  export default {
    name: "pay-finish",
    data() {
      return {
          orderinfo:{}
        }
      },
      components: {Orderinfo, Userinfo },
      methods: {
  
    },
    created() {
        this.orderId = this.$route.params.id;
        serviceAxios({
          method: 'get',
          url:`/fanbook/deliverbot/general/order/get_details/${this.orderId}`
        }).then((res) => { console.log(res); this.orderinfo = res})
        },
  }
  
  </script>
  
  <style>
  
  </style>