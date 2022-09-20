<template>
  <div class="group">
     <div v-for="(item,index) in temp" :key="index" class="item">
       <div class="ico"><img :src="item.ico"></div>
       <div class="title">{{item.title}}</div>
       <div class="config">{{item.config}}</div>
       <div class="arrow" v-if="item.arrow"><van-icon name="arrow" size="1.5rem"/></div>
    </div>
  </div>
</template>

<script>
export default {
    name:'cell-group',
    props: ['items'],
    data() {
        return {
            temp: [
                {
                    ico: require('@/assets/money.png'),
                    title: '总收入金额',
                    config: '1000元',
                    arrow:true
                }
            ]
        } 
    },
    methods: {
    
}
}
</script>

<style scoped lang="less">
.group{
    .item{
        background-color: #fff;
        height: 45px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        .ico{

        }
        .title{

        }
        .config{

        }
        .arrow{

        }
    }
}
</style>