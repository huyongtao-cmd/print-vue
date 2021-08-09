<script>
import Vue from "vue"
export default {
    globalData: {}
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";

/*每个页面公共css */
.u-numberbox {
    border: 1px solid #f2f2f2 !important;
}

.u-number-input {
    background: #FFFFFF !important;
}

.u-close {
    z-index: 100 !important;
}

/deep/.uni-scroll-view ::-webkit-scrollbar {
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
    display: none;
    width: 0;
    height: 0;
    color: transparent;
    background: transparent;
}

/deep/::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
    background: transparent;
}

.u-input__right-icon {
    margin-right: 20rpx;
}

.mobile-type .u-input {
    width: 150rpx !important;
}

.u-input {
    margin-bottom: 20rpx !important;
}

.mobile-input .u-input {
    width: 100% !important;
}

.input_mt .u-input {
    margin-top: 20rpx !important;
}

.u-form-item__body {
    display: block !important;
}
</style>
