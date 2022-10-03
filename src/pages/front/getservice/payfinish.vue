<template>
  <div>
    <Successhead>
        <template v-slot:content>
            <div>
                付款成功
            </div>
        </template>
    </Successhead>
    <Orderinfo :orderinfo="orderinfo" />
    <Userinfo :orderinfo="orderinfo" />
  </div>
</template>

<script>
import Successhead from '@/components/successhead.vue';
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
    props:['orderId'],
    components: { Successhead, Orderinfo, Userinfo },
    methods: {

  },
  mounted() {
      serviceAxios({
        method: 'get',
        url:`/fanbook/deliverbot/general/order/get_details/${this.orderId}`
        }).then((res)=>{this.orderinfo = res.data})
      },
}

</script>

<style>

</style>