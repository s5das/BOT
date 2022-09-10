<template>
  <div>
<div class="head">
    <div class="box"></div>
    <div class="text">快递信息</div>
</div>
<van-form @submit="onSubmit">
<div class="content1">
<van-field
  readonly
  clickable
  name="size"
  :value="value1"
  label="快递规格"
  placeholder="点击选择规格"
  @click="showPicker1 = true"
/>
<van-popup v-model="showPicker1" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns1"
    @confirm="onConfirm1"
    @cancel="showPicker1 = false"
  />
</van-popup>

<van-field
  readonly
  clickable
  name="num"
  :value="value2"
  label="快递数量"
  placeholder="点击选择数量"
  @click="showPicker2 = true"
/>
<van-popup v-model="showPicker2" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns2"
    @confirm="onConfirm2"
    @cancel="showPicker2 = false"
  />
</van-popup>

<div class="jine">
    <div class="jine-text">金额</div>
    <div class="jine-num">{{jine}}元</div>
  </div>

  <van-field
  readonly
  clickable
  name="location"
  :value="value3"
  label="快递点"
  placeholder="点击选择快递点"
  @click="showPicker3 = true"
/>
<van-popup v-model="showPicker3" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns3"
    @confirm="onConfirm3"
    @cancel="showPicker3 = false"
  />
</van-popup>

<van-field name="pic" label="上传图片">
  <template #input>
    <van-uploader v-model="filelist" :after-read="afterRead" :max-count="1"/>
  </template>
</van-field>

<van-field
  readonly
  clickable
  name="starttime"
  :value="value4"
  label="起始时间"
  placeholder="点击选择送达起始时间"
  @click="showPicker4 = true"
/>
<van-popup v-model="showPicker4" position="bottom">
  <van-datetime-picker
    type="datetime"
    :min-date="minDate"
    @confirm="onConfirm4"
    @cancel="showPicker4 = false"
  />
</van-popup>

<van-field
  readonly
  clickable
  name="finishtime"
  :value="value5"
  label="送达时间"
  placeholder="点击选择送达截至时间"
  @click="showPicker5 = true"
/>
<van-popup v-model="showPicker5" position="bottom">
  <van-datetime-picker
    type="datetime"
    :min-date="minDate"
    @confirm="onConfirm5"
    @cancel="showPicker5 = false"
  />
</van-popup>

<van-field
  v-model="message"
  name="备注"
  rows="2"
  autosize
  label="备注"
  type="textarea"
  maxlength="50"
  placeholder="请输入备注"
/>
  </div>
  
  <div class="head">
    <div class="box"></div>
    <div class="text">个人信息</div>
  </div>
  <div class="content2">
    <van-field
    v-model="user_receiveplace"
    name="收件地址"
    label="收件地址"
    placeholder="请输入收件地址"
    
  />

  <van-field
    v-model="user_name"
    name="收件人"
    label="收件人"
    placeholder="请输入收件人名称"

  />

  <van-field
    v-model="user_phone"
    name="手机号"
    label="手机号"
    placeholder="请输入手机号"

  />
  </div>
  <div style="margin: 16px 0;">
    <van-button  block color="#eb1d1d" native-type="submit">立即下单</van-button>
  </div>
</van-form>

  </div>
</template>

<script>
import fmt from '@/utils/format'
import {Toast} from 'vant'
export default {
    
    name: 'place-order',
    data() {
        return {
    minDate:new Date(),
    // 快递规格
      value1: '',
      columns1: ['大件(3-5kg)','中件(1-3kg)','小件(小于1kg)'],
      showPicker1: false,
    // 快递数量
      value2: '',
      columns2: ['1件', '2件', '3件', '4件', '5件'],
      showPicker2: false,  
    //   快递点
      value3: '',
      columns3: ['深大一区菜鸟驿站', '深大一区菜鸟驿站'],
      showPicker3: false, 
    //   图片
        filelist: [],
    // 起始时间
        value4: '',
        showPicker4: false, 
    // 截止时间
        value5: '',
        showPicker5: false, 
    // 文本框
        message: '',
        user_receiveplace: '',
        user_name:'',
        user_phone:''
        };

  },
  methods: {
    onConfirm1(value) {
      this.value1 = value;
      this.showPicker1 = false;
      },
    onConfirm2(value) {
      this.value2 = value;
      this.showPicker2 = false;
      },
      onConfirm3(value) {
      this.value3 = value;
      this.showPicker3 = false;
      },
      afterRead(file) {
        console.log(file.file);
      },
      onConfirm4(value) {
      
      this.value4 = fmt(value);
      this.showPicker4 = false;
      },
      onConfirm5(value) {
      
      this.value5 = fmt(value);
      this.showPicker5 = false;
      },
      check_info(data) {
          for (var key in data) {
              if (!data[key]) {
                  Toast.fail('请输入完整信息');
                return false;
              }
              return true;
        }
      },
      onSubmit(data) {
          data['金额'] = this.jine;
          if(this.check_info(data))
          console.log(data);
      }
    },
    computed: {
        jine() {
            return 5;
    }
  }
}
</script>

<style scoped>
.head{
  height: 45px;
  width:100%;
  border-radius: 10px 10px 0 0 ;
  border-bottom: 1px solid #BBBBBB;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
}
.box{
    position: absolute;
    left: 8px;
    height: 24px;
    width: 3.5px;
    background-color: red;
}
.jine{
  height: 45px;
  width:100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
}
.jine-text{
position: absolute;
left: 16.5px;
color:#646566;
}
.jine-num{
    position: absolute;
    left: 150px;
    color: #BBBBBB;

}
.text{
    position: absolute;
    left: 16px;
}
.content1{
    margin-bottom: 10px;
}
</style>