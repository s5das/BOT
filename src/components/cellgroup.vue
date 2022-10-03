<template>
  <div class="group">
     <div v-for="(item,index) in items" :key="index" class="item" @click="goto(item.to)">
        <div class="left">       
        <div class="ico"><img :src="item.ico"></div>
       <div class="title">{{item.title}}</div>
        </div>
      <div class="right">
       <div class="config">{{item.config}}</div>
       <div class="arrow" v-if="item.arrow"><van-icon name="arrow" size="1.5rem"/></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name:'cell-group',
    props: ['items'],
    data() {
        return {
        } 
    },
    methods: {
        goto(to) {
            if (to) {
                this.$router.push({
                path: to
          })
            }
     }
}
}
</script>

<style scoped lang="less">
.group{
    .item{
        width: 410px;
        margin: 0px auto;
        background-color: #fff;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #bbb;
        .left{
            display: flex;
            justify-items: center;
            margin-left: 25px;
            font-size: 15px;
            font-weight:600;
            .ico{

             height: 25px;
             width: 25px;
             img{
                width: 100%;
                height: auto;
             }
            }
            .title{
            margin-left: 5px;
            
             height: 30px;
             line-height: 28px;
            }
        }
     .right{
         display: flex;
            .config{
               margin-right: 8px;
            }
            .arrow{
               margin-right: 8px;
            }

     }

    }
}
</style>