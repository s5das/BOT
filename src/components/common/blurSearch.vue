<template>
    <div>
        <div class="search-area">
            <van-icon @click="isInputingKey = true" name="search" size="20px"/>
            <div class="search-prompt" v-if="name + phoneNum !== ''">
                <div class="text">
                    {{`${name!==''?'姓名: '+name+' ':''}${phoneNum!==''?'电话: '+phoneNum:''}`}}
                </div>
                <div @click="clearKey" class="clear">
                    <van-icon name="close" size="20"/>
                </div>
            </div>
        </div>

        <van-popup v-model="isInputingKey" position="top">
            <div class="search-box">
                <input v-model="nameBuf" class="item" type="text" :placeholder="'姓名'"/>
                <input v-model="phoneNumBuf" class="item" type="text" :placeholder="'手机号'"/>
                <div class="search" @click="confirmKey">
                    搜索
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        emits: ['confirmKey', 'clearKey'],
        data() {
            return {
                isInputingKey: false,
                nameBuf: '',
                phoneNumBuf: '',
                name: '',
                phoneNum: '',
            }
        },
        methods: {
            confirmKey() {
                this.name = this.nameBuf
                this.phoneNum = this.phoneNumBuf
                this.isInputingKey = false
                this.$emit('confirmKey', {
                    name: this.name,
                    phoneNum: this.phoneNum
                })
            },
            clearKey() {
                this.name = ''
                this.nameBuf = ''
                this.phoneNum = ''
                this.phoneNumBuf = ''
                this.$emit('clearKey')
            },
        }
    }
</script>

<style lang="less" scoped>
  .search-area {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 220px;
    margin-left: 5px;

    .search-prompt {
      display: flex;
      align-items: center;
      .text {
        max-width: 200px;
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .clear {
        height: 100%;
        margin-left: 5px;
      }
    }
  }
.search-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #E2E3E2;
  .item {
    width: 90%;
    height: 30px;
    margin: 10px 0;
    padding-left: 5px;
    border-radius: 20px;
    background-color: #FEFFFF;
  }

  .search {
    width: 50px;
    text-align: center;
    margin: 10px 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
}
</style>