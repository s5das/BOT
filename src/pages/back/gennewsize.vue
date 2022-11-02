<template>
  <div class="main">
     <div class="top">
        <div class="left" @click="finish">完成</div>
        <div class="right" @click="cancle">取消</div>
     </div>
     <div class="box1">
        <div class="title">规格名</div>
        <div class="in1"><input type="text" placeholder="输入规格大小" v-model="specification_name" maxlength="50"></div>
     </div>
     <div class="box2">
         <div class="left">
            <div class="title">设定价格</div>
            <div class="in2"><input type="text" placeholder="0.00" v-model="reward_per_package">元</div>
         </div>
         <div class="right">
            <div class="title">提成比例</div>
            <div class="in2"><input type="text" placeholder="0" v-model="royalty_rate">%</div>
         </div>
     </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import serviceAxios from '@/http';
export default {
    name: 'gen-newlocation',

    methods: {
        cancle() {
            this.$router.replace({
            path:'/back/sizesettings'
        })
        },
        finish() {
            if (this.specification_name &&this.royalty_rate&&this.reward_per_package&& Number(this.royalty_rate)>=0 && Number(this.reward_per_package) ) {
                serviceAxios({
                    method: 'post',
                    url:'/fanbook/deliverbot/back/admin/specs/add',
                    data: {
                        reward_per_package: this.reward_per_package,
                        royalty_rate: this.royalty_rate,
                        specification_name:this.specification_name
                    }
                }).then(() => { Toast.success('添加成功'); this.cancle() },
                        (err) => {Toast(err.message.replace(/[a-zA-Z]/g, ""))}
                )
            } else {
                Toast.fail('请正确输入信息');
            }
        }
    },
    data(){   
    return {
        specification_name: '',
        reward_per_package: '',
        royalty_rate:''
        }
}
}
</script>

<style scoped lang="less">
.main{
    padding: 10px;
}
input{
    text-indent: 15px;
}
.top{
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left{
          width: 80px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          color: #EF7C26;
        }
        .right{
          width: 80px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          color: #EF7C26;
        }
    }
.title{
    font-size: 17px;
    height: 50px;
    line-height: 50px;
    text-indent: 20px;
}
.box1{
    height: 100px;
    display: flex;
    flex-direction: column;
    .in1{
      display: flex;
      justify-content: center;
      height: 50px;
      width: 100%;
      input{
        height: 30px;
        width: 90%;
      }
    }
}
.box2{
    display: flex;
    width: 100%;
    height: 100px;
    .left{
        flex: 1;
        height: 50px;
        .in2{
            height:50px;
            display: flex;
            justify-content: center;
            line-height: 30px;
            input{
                height: 30px;
                width:70%;
            }
        }
    }
    .right{
        height: 50px;
        flex: 1;
        .in2{
            line-height: 30px;
            height:50px;
            display: flex;
            justify-content: center;
            input{
                height: 30px;
                width:70%;
            }
        }
    }
}
</style>