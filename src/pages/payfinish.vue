<template>
  <div>
    <Successhead>
        <template v-slot:content>
            <div>
                付款成功
            </div>
        </template>
    </Successhead>
    <Orderinfo/>
    <Userinfo/>
  </div>
</template>

<script>
import Successhead from '@/components/successhead.vue';
import Orderinfo from '@/components/orderinfo.vue';
import Userinfo from '@/components/userinfo.vue';

export default {
    name: "pay-finish",
    components: { Successhead, Orderinfo, Userinfo }
}
</script>

<style>

</style>