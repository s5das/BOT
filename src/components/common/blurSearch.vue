<template>
    <div>
        <div class="search-area">
            <van-icon @click="isInputingKey = true" name="search" size="20px"/>
            <slot name="prompt" v-if="blur_search_context === ''"></slot>
            <div class="search-prompt" v-if="blur_search_context !== ''">
                <div class="text">
                    {{`关键词: ${blur_search_context}`}}
                </div>
                <div @click="clearKey" class="clear">
                    <van-icon name="close" size="20"/>
                </div>
            </div>
        </div>

        <!-- <van-popup v-model="isInputingKey" position="top">
            <div class="search-box">
                <input v-model="nameBuf" class="item" type="text" :placeholder="'姓名'"/>
                <input v-model="phoneNumBuf" class="item" type="text" :placeholder="'手机号'"/>
                <div class="search" @click="confirmKey">
                    搜索
                </div>
            </div>
        </van-popup> -->

        <van-popup v-model="isInputingKey" position="top">
            <div class="blur-search-box">
                <div class="enter-box">
                    <van-icon class="icon" name="search" size="22px"></van-icon>
                    <input type="text" v-model="blur_search_context_BUF" placeholder="请输入关键词"/>
                </div>
                <div class="confirm" @click="confirmKey">搜索</div>
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
                blur_search_context: '',
                blur_search_context_BUF: ''
            }
        },
        methods: {
            confirmKey() {
                this.blur_search_context = this.blur_search_context_BUF
                this.isInputingKey = false
                this.$emit('confirmKey', {
                    key: this.blur_search_context
                })
            },
            clearKey() {
                this.blur_search_context = ''
                this.blur_search_context_BUF = ''
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
      margin-left: 2px;
      .text {
        margin-top: 1px;
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

.blur-search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 60px;
    margin: 0 auto;
    // background-color: #FCF6F4;
    .enter-box {
        width: 300px;
        display: flex;
        align-items: center;
        margin-left: 15px;
        font-size: 17px;
        .icon {
            margin-right: 5px;
        }
    }
    .confirm {
        margin-right: 10px;
        font-size: 18px;
        color: hsla(30, 86%, 60%, 1);
        font-weight: bold;
    }
}
</style>