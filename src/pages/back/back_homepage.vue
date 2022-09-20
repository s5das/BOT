<template>
  <div>
    <van-cell-group>
        <van-cell title="总收入金额" title-class="cell_title"   :icon="require('@/assets/back1.png')"  clickable :value="statistics.可以提现的金额 || '请求错误'" />
        <div class="line"></div>
        <van-cell title="未提现金额" title-class="cell_title"   :icon="require('@/assets/finish2.png')" :to="{path:'withdraw'}" clickable :value="statistics.money_earned || '请求错误'" is-link/>
        <div class="line"></div>
        <van-cell title="全部订单数" title-class="cell_title"   :icon="require('@/assets/order2.png')"  clickable :value="statistics.total_take_order_nums || '请求错误'" is-link/>
        <div class="line"></div>
        <van-cell title="已完成订单数" title-class="cell_title"  :icon="require('@/assets/mail.png')" clickable :value="statistics.finished_order_nums || '请求错误'" is-link/>
        <div class="line"></div>
        <van-cell title="未完成订单数" title-class="cell_title"  :icon="require('@/assets/mail2.png')" clickable :value="statistics.ongoing_order_nums || '请求错误'" is-link/>
      </van-cell-group>
  </div>
</template>

<script>
export default {
name:'back-homepage'
}
</script>

<style>

</style>