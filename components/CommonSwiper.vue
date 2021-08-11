<template>
<div class="common-swiper" :style="{width:size.width,height:size.height}">
    <swiper class="my-swiper" :style="{width:size.width,height:size.height}" :indicator-dots="dots" :interval="interval" :duration="duration" :autoplay="autoplay" :circular="circular" @change="swiperChange($event)">
        <swiper-item v-for="(item, index) in swiperData" :key="index">
            <img :src="item.img" :style="{width:size.width,height:size.height}" class="slider-image" @click="goDetails(item)" />
        </swiper-item>
    </swiper>
    <div class="dots">
        <div v-for="(item, index) in swiperData" :key="index">
            <div :class="index === currentSwiper ? 'dot active' : 'dot'" />
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'CommonSwiper',
    props: {
        swiperData: {
            type: Array,
            default: []
        },
        size: {
            type: Object,
            default: {
                width: '100vw',
                height: '56vw'
            }
        }
    },
    data() {
        return {
            duration: 900,
            circular: true,
            imgList: [],
            autoplay: true,
            interval: 5000,
            dots: false,
            currentSwiper: 0
        }
    },
    methods: {
        goDetails(item) {},
        swiperChange(res) {
            this.currentSwiper = res.mp.detail.current
        }
    }
}
</script>

<style lang="scss" scoped>
.common-swiper {
    position: relative;

    img {
        border-radius: 8px;
    }

    .dots {
        height: 5px;
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 7px;
        left: 50%;
        transform: translateX(-50%);

        .dot {
            width: 10px;
            height: 2px;
            border-radius: 7px;
            margin-right: 5px;
            background-color: #EFEFEF;
        }

        .active {
            width: 15px;
            height: 2px;
            background-color: $primary-color;
        }
    }
}
</style>
