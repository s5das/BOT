<!-- 首页中的 快递员入驻申请 弹出层 -->
<template>
    <div>
        <van-popup v-model="isShow" closeable>
            <div class="box">
                <div class="title">入驻申请</div>
                <div class="item">
                    <div class="item-name">真实姓名</div>
                    <div class="error-prompt" v-show="errorPromptOfTrueName !== ''">{{errorPromptOfTrueName}}</div>
                    <input
                        type="text"
                        class="inputArea"
                        v-model="trueName"
                        placeholder="请输入真实姓名"
                    />
                </div>
                <div class="item">
                    <div class="item-name">手机号</div>
                    <div class="error-prompt" v-show="errorPromptOfTeleNum !== ''">{{errorPromptOfTeleNum}}</div>
                    <input
                    type="text"
                        class="inputArea"
                        v-model="teleNum"
                        placeholder="请输入手机号"
                    />
                </div>
                <div class="item">
                    <div class="remarks">备注</div>
                    <div class="error-prompt" v-show="errorPromptOfRemarks !== ''">{{errorPromptOfRemarks}}</div>
                    <input
                        type="text"
                        class="inputArea"
                        v-model="remarks"
                        placeholder="请输入备注"
                    />
                </div>
                <div class="submit" @click="submit">提交审核</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { courierRegister } from '@/http/api/courier'

    export default {
        emits: ['changeShow'],
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        model: {
            prop: 'show',
            event: 'changeShow'
        },
        data() {
            return {
                isShow: false,

                trueName: '',
                teleNum: '',
                remarks: '',

                errorPromptOfTrueName: '',
                errorPromptOfTeleNum: '',
                errorPromptOfRemarks: '',
            }
        },
        methods: {
            submit() {
                let trueName = this.trueName.trim()
                let teleNum = this.teleNum.trim()
                let remarks = this.remarks.trim()

                // 校验 - 真实姓名项
                if(trueName === '') {
                    this.errorPromptOfTrueName = '此项必填'
                }
                else {
                    this.errorPromptOfTrueName = ''
                }
                // 校验 - 手机号项
                if(teleNum === '') {
                    this.errorPromptOfTeleNum = '此项必填'
                }
                else if(!/^1[3456789]\d{9}$/.test(teleNum)) {
                    this.errorPromptOfTeleNum = '请输入正确的手机号'
                }
                else {
                    this.errorPromptOfTeleNum = ''
                }
                // 校验 - 备注项
                if(remarks === '') {
                    this.errorPromptOfRemarks = '此项必填'
                }
                else {
                    this.errorPromptOfRemarks = ''
                }
                
                // 若有错误, 则直接return
                if(
                    this.errorPromptOfRemarks !== '' ||
                    this.errorPromptOfTeleNum !== '' ||
                    this.errorPromptOfTrueName !== ''
                ) {
                    return;
                }

                // 只有通过前端校验才能成功提交

                let params = {
                    phone_number: teleNum,
                    real_name: trueName,
                    remarks: remarks
                }
                courierRegister(params).then(() => {
                    Toast('提交审核')
                    this.isShow = false
                })
            }
        },
        watch: {
            show: function (val) {
                this.isShow = val
            },
            isShow: function (val) {
                if(val === false) { 
                    this.$emit('changeShow', val)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 342px;
    height: 335px;
    margin: 0 auto;
    background-color: #FFFFFF;
    text-align: center;
    border: 1px solid UIColor(0.73, 0.73, 0.73, 100);


    .title {
        font-family: PingFangSC-semiBold;
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        height: 60px;
        font-weight: 800;
        line-height: 60px;
    }
    
    .item {
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        width: 290px;
        height: 28px;
        line-height: 28px;
        margin-top: 18px;
        border-bottom: #BBB solid 1px;
        font-size: 14px;
        

        .item-name {
            color: rgba(16, 16, 16, 100);
        }

        .inputArea {
            width: 120px;
            margin-bottom: 1px;
            padding: 0;
            font-size: 14px;
            text-align: left;
            &::placeholder {
                color: rgba(102, 102, 102, 78);
            }
        }

        .error-prompt {
            position: absolute;
            right: 0;
            top: -20px;
            height: 20px;
            line-height: 20px;
            font-size: 8px;
            color: lightcoral;
        }
    }

    .submit {
        width: 200px;
        height: 39px;
        margin-top: 38px;
        line-height: 39px;
        color: rgba(234, 12, 12, 73);
        border: rgba(234, 12, 12, 73) solid 1px;
        border-radius: 19px;
    }
}
</style>