<!-- 抢单详情页 -->
<template>
    <div>
        <Orderinfo/>
    </div>
</template>

<script>
import Orderinfo from '@/components/orderinfo.vue';
    export default {
    mounted() {
        // let id = this.$route.params.id;
    },
    data() {
        return {};
    },
    components: { Orderinfo }
}
</script>

<style lang="less" scoped>

</style>