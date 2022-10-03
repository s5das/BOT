<template>
  <div class="group">
     <div v-for="(item,index) in items" :key="index" :class="{item:true,buttomborder:!item.cancelborder}" @click="goto(item.to)">
        <div class="left">       
        <div class="ico"><img :src="item.ico"></div>
       <div class="title">{{item.title}}</div>
        </div>
      <div class="right">
       <div class="config" v-if="config">{{config[index]}}</div>
       <div class="arrow" v-if="item.arrow"><van-icon name="arrow" size="1.5rem"/></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name:'cell-group',
    props: ['items','config'],
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
    .buttomborder{
      border-bottom: 1px solid #bbb;
    }
    .item{
        width: 100%;
        margin: 0px auto;
        background-color: #fff;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left{
            display: flex;
            justify-items: center;
            margin-left: 25px;
            font-size: 15px;
            font-weight:500;
            color: #000;
            .ico{

             height: 18px;
             width: 19px;
             img{
                width: 100%;
                height: auto;

             }
            }
            .title{
            margin-left: 18px;
            
             height: 30px;
             line-height: 22px;
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