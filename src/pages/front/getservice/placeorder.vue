<template>
  <div class="main" :style="{ height: h + 'px' }">
    <div class="head">
      <div class="box"></div>
      <div class="text">快递信息</div>
    </div>
    <van-form @submit="onSubmit" scroll-to-error>
      <div class="content1">
        <van-field
          readonly
          clickable
          name="spec_name"
          :value="value1"
          label="快递规格"
          placeholder="点击选择规格"
          @click="showPicker1 = true"
          :rules="[{ required: true }]"
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
          name="num_of_packages"
          :value="value2"
          label="快递数量"
          placeholder="点击选择数量"
          @click="showPicker2 = true"
          :rules="[{ required: true }]"
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
          <div class="jine-num">{{ jine }}元</div>
        </div>

        <van-field
          readonly
          clickable
          name="pickup_station_name"
          :value="value3"
          label="快递点"
          placeholder="点击选择快递点"
          @click="showPicker3 = true"
          :rules="[{ required: true }]"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns3"
            @confirm="onConfirm3"
            @cancel="showPicker3 = false"
          />
        </van-popup>

        <van-field
          name="pic"
          label="取件码截图"
          :rules="[{ required: true, message: '请上传取件码截图' }]"
        >
          <template #input>
            <van-uploader v-model="filelist" :max-count="5" />
          </template>
        </van-field>

        <van-field
          readonly
          clickable
          name="starting_time"
          :value="value4"
          label="起始时间"
          placeholder="点击选择送达起始时间"
          @click="showPicker4 = true"
          style="margin-top: 15px"
          :rules="[{ required: true }]"
        />
        <van-popup v-model="showPicker4" position="bottom">
          <van-datetime-picker
            type="datetime"
            :min-date="minDate"
            @confirm="onConfirm4"
            @cancel="showPicker4 = false"
            title="选择送达起始时间"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="cut_off_time"
          :value="value5"
          label="送达时间"
          placeholder="点击选择送达截止时间"
          @click="showPicker5 = true"
          :rules="[{ required: true }]"
        />
        <van-popup v-model="showPicker5" position="bottom">
          <van-datetime-picker
            type="datetime"
            :min-date="minDate"
            @confirm="onConfirm5"
            @cancel="showPicker5 = false"
            title="选择送达截至时间"
          />
        </van-popup>

        <van-field
          v-model="message"
          name="remarks"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="100"
          placeholder="请输入不超过100字的备注"
        />
      </div>

      <div class="head">
        <div class="box"></div>
        <div class="text">个人信息</div>
      </div>
      <div class="content2">
        <van-field
          v-model="user_receiveplace"
          name="recipient_address"
          label="收件地址"
          placeholder="请输入收件地址"
          :rules="[{ required: true }]"
          maxlength="100"
        />

        <van-field
          v-model="user_name"
          name="recipient_name"
          label="收件人"
          placeholder="请输入收件人名称"
          :rules="[{ required: true }]"
          maxlength="100"
        />

        <van-field
          v-model="user_phone"
          name="recipient_phone_number"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true }]"
        />
      </div>
      <div style="margin: 30px 0 50px 0; height: 58px">
        <van-button
          :disabled="issubmitting"
          block
          color="linear-gradient(119deg,#FD9448,#FF7A55)"
          native-type="submit"
        >
          立即下单</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import fmt from "@/utils/format";
import { Toast } from "vant";
import serviceAxios from "@/http";
import compress from "@/utils/compress";
import {useStore} from "@/model/store";
let store = useStore();

export default {
  name: "place-order",
  data() {
    return {
      issubmitting: false,
      h: document.body.clientHeight,
      orderId: -1,
      minDate: new Date(),
      // 快递规格
      value1: "",
      columns1: [],
      reward_per_package: [],
      royalty_rate: [],
      showPicker1: false,
      // 快递数量
      value2: "",
      columns2: ["1件", "2件", "3件", "4件", "5件"],
      showPicker2: false,
      //   快递点
      value3: "",
      columns3: [],
      showPicker3: false,
      //   图片
      filelist: [],
      // 起始时间
      value4: "",
      showPicker4: false,
      // 截止时间
      value5: "",
      showPicker5: false,
      // 文本框
      message: "",
      user_receiveplace: "",
      user_name: "",
      user_phone: "",
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

    async upload() {
      for (let i = 0; i < this.filelist.length; i++) {
        try {
          const orderPic = await compress(this.filelist[i].file);
          await serviceAxios({
            method: "post",
            url: "/fanbook/deliverbot/front/order/client/upload_order_pic",
            data: orderPic,
          });
        } catch {
          return Promise.reject(Error("图片上传失败"));
        }
      }
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
          Toast.fail("请输入完整信息");
          return false;
        }
      }
      for (var i = 0; i < this.filelist.length; i++) {
        if (this.filelist[i].file.size > 30 * 1024 * 1024) {
          Toast.fail("不能选择超过30MB的图片");
          return false;
        }
      }
      return true;
    },

    onSubmit(data) {
      this.issubmitting = true;
      data["reward"] = this.jine;
      delete data["pic"];
      data["pic_nums"] = this.filelist.length;
      data["num_of_packages"] = Number(
        data["num_of_packages"].replace("件", "")
      );

      console.log(data);

      // 创建订单
      serviceAxios({
        method: "post",
        url: "/fanbook/deliverbot/front/order/client/create_order",
        data,
      })
        .then(
          (res) => {
            this.orderId = res.order_id;
            // 上传图片
            return this.upload();
          },
          (err) => {
            this.issubmitting = false;
            Toast.fail(
              err.message.replace(/[^\u4E00-\u9FA5\u0030-\u0039]/g, "")
            );
            return new Promise(() => {});
          }
        )
        .then(
          () => {
            // 缓存订单号
            localStorage.setItem("orderid", this.orderId);
            localStorage.setItem("jine", this.jine);
            
            // 图片上传成功进行支付并缓存下单界面

              this.$router.replace({
                path: "/front/payjudge",
              });
            
          },
          (err) => {
            this.issubmitting = false;
            Toast.fail(err.message);
          }
        );
    },
  },
  // 动态申请规格、单价、利率、地点
  mounted() {
    serviceAxios({
      method: "get",
      url: "/fanbook/deliverbot/general/order/get_specifications",
    }).then(
      (response) => {
        for (var i = 0; i < response.length; i++) {
          let temp = response[i];
          this.columns1.push(temp.spec_name);
          this.reward_per_package.push(temp.reward_per_package);
          this.royalty_rate.push(temp.royalty_rate);
          console.log(1);
        }
      }
    );

    serviceAxios({
      method: "get",
      url: "/fanbook/deliverbot/general/pickup_station/get_all",
    }).then(
      (response) => {
        for (var i = 0; i < response.length; i++) {
          let temp = response[i];
          this.columns3.push(temp.pickup_address);
        }
      }
    );

    this.value1 = store.value1   
    this.value2 = store.value2   
    this.value3 = store.value3
    this.value4 = store.value4   
    this.value5 = store.value5   
    this.message = store.message   
    this.user_receiveplace = store.user_receiveplace   
    this.user_name = store.user_name   
    this.user_phone = store.user_phone  
    
  },
  computed: {
    jine() {
      if (this.value1 && this.value2) {
        const num = Number(this.value2.replace("件", ""));
        const per_value =
          this.reward_per_package[this.columns1.indexOf(this.value1)];
        return num * per_value;
      } else {
        return 0;
      }
    },
  },

  beforeRouteLeave (to, from, next) {
    console.log('leave');
    if (this.issubmitting == true) {
      store.status = 0     
      store.value1 = this.value1
      store.value2 = this.value2
      store.value3 = this.value3
      store.value4 = this.value4 
      store.value5 = this.value5 
      store.message = this.message  
      store.user_receiveplace = this.user_receiveplace 
      store.user_name = this.user_name   
      store.user_phone = this.user_phone
    }else{
      store.clear()
    }
    next()
  }
}

</script>

<style scoped>
.main {
  padding-top: 10px;
  background: #fcf6f4;
  box-sizing: border-box;
  overflow: scroll;
}

.head {
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #000;
  position: relative;
  margin-top: 15px;
  margin-bottom: 10px;
}

.box {
  position: absolute;
  left: 8px;
  height: 24px;
  width: 3.5px;
  background-color: red;
}

.jine {
  height: 45px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
}

.jine-text {
  position: absolute;
  left: 16.5px;
  color: #646566;
}

.jine-num {
  position: absolute;
  left: 118px;
  color: #bbbbbb;
}

.text {
  position: absolute;
  left: 16px;
}

.content1 {
  margin-bottom: 10px;
}
</style>
