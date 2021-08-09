<template>
<div class='title-container' :style="{color:color,top:statusBarHeight+'px'}">
    {{title}}
</div>
</template>

<script>
export default {
    name: 'HeaderTitle',
    props: {
        title: {
            type: String,
            default: '好打印'
        },
        color: {
            type: String,
            default: "#ffffff"
        },
    },
    data() {
        return {
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
        }
    }
}
</script>

<style lang="scss" scoped>
.title-container {
    width: 100%;
    z-index: 2;
    height: 40px;
    line-height: 40px;
    position: absolute;
    text-align: center;
}
</style>
