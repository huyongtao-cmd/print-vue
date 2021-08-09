<template lang="zh_CN">
<view class="login">
    <view class="login-logo">
        <image src="../../static/image/login/login-bgc.png" mode=""></image>
        <image class="merchant-logo" :src="shop.img" mode=""></image>
        <view class="login-text">{{shop.name}}</view>
        <view class="login-logo-img">
            <image src="../../static/image/login/login.png" mode=""></image>
        </view>
    </view>
    <button class='login-btn' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="getUserInfo">授权登录</button>
    <view class="login-info">请同意微信授权，查看更多精彩内容~</view>
</view>
</template>

<script>
import Env from '@/common/Env.js'
import Api from '@/common/Api.js'
import Toast from '@/components/Toast.js'
export default {
    data() {
        return {}
    },
    methods: {
        getUserInfo() {
            let _that = this
            uni.login({
                provider: 'weixin',
                success: (res) => {
                    let code = res.code;
                    uni.getUserInfo({
                        provider: 'weixin',
                        success: function (res) {
                            let wx = {
                                appId: Env.getAppId(),
                                code: code,
                                encryptedData: res.encryptedData,
                                iv: res.iv,
                                signature: res.signature
                            };
                            Api.post('/usr/user/signin', {
                                signinWrap: JSON.stringify({
                                    wx
                                })
                            }, {
                                needToken: false
                            }).then((result) => {
                                Api.setAuthInfo(result);
                                uni.navigateBack();
                            }).catch((err) => {
                                console.log(err);
                                Toast.show('登录失败，请重试');
                            });
                        }
                    });
                },
                fail: (res) => {
                    Toast.show('授权失败，请重试');
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login-logo {
    position: relative;
}

.login-logo image {
    width: 100%;
    height: 828rpx;
    object-fit: cover;
}

.login-logo .merchant-logo {
    width: 150rpx;
    height: 150rpx;
    object-fit: cover;
    border-radius: 50%;
    position: absolute;
    top: 30rpx;
    left: 300rpx;
}

.login-text {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 210rpx;
    font-size: $uni-font-size-lg;
    font-weight: 600;
    color: #333333;
}

.login-logo-img image {
    width: 346rpx;
    height: 395rpx;
    object-fit: cover;
    position: absolute;
    top: 342rpx;
    left: 202rpx;
}

.login-btn {
    width: 220rpx;
    height: 88rpx;
    background: $uni-bg-color;
    font-size: $uni-font-size-lg;
    color: $uni-text-color-inverse;
    margin-top: 86rpx;
}

.login-info {
    width: 100%;
    color: $uni-text-color-grey;
    font-size: $uni-font-size-base;
    text-align: center;
    margin-top: 30rpx;
}
</style>
