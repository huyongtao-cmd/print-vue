<template>
<div :class="{'add-file':true,'menu-open':open}" @touchmove=" buttonMove" @touchstart="buttonStart" @click="iconLick" :style="{bottom:bottom+'px',right:right+'px'}">
    <div class="m-icon">
        <u-icon name="plus" size="40px" color="#fff"></u-icon>
    </div>
    <div class="menu" :class="{'open':open}">
        <ul>
            <li v-if="open" @click="addClick('folder')">
                <u-icon name="email" size="20px" color="#c0c0c0"></u-icon>
                <p>文件夹</p>
            </li>
            <li v-if="open" @click="addClick('file')">
                <u-icon name="file-text" size="20px" color="#c0c0c0"></u-icon>
                <p>文件</p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
let startPoint;

export default {
    name: 'DraggableBtn',
    props: {},
    data() {
        return {
            bottom: 50,
            right: 10,
            windowHeight: '',
            windowWidth: '',
            open: false
        }
    },
    methods: {
        buttonStart(e) {
            startPoint = e.touches[0]
        },
        buttonMove(e) {
            var endPoint = e.touches[e.touches.length - 1]
            var translateX = endPoint.clientX - startPoint.clientX
            var translateY = endPoint.clientY - startPoint.clientY
            startPoint = endPoint
            var bottom = this.bottom - translateY
            var right = this.right - translateX
            //判断是移动否超出屏幕
            if (right + 80 >= this.windowWidth) {
                right = this.windowWidth - 80;
            }
            if (right <= 0) {
                right = 0;
            }
            if (bottom <= 0) {
                bottom = 0
            }
            if (bottom + 150 >= this.windowHeight) {
                bottom = this.windowHeight - 150;
            }
            this.bottom = bottom
            this.right = right
        },
        iconLick() {
            this.open = !this.open;
        },
        addClick(type) {
            this.$emit('btnAddClick', type)
        }
    },
    mounted() {
        const res = wx.getSystemInfoSync();
        let {
            windowHeight,
            windowWidth
        } = res;
        this.windowHeight = res.windowHeight
        this.windowWidth = res.windowWidth

    }
}
</script>

<style lang="scss" scoped>
.add-file {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .2);

    .m-icon {
        position: absolute;
        z-index: 1;
        right: 0;
        width: 60px;
        height: 60px;
        background: $primary-color;
        border-radius: 50%;
        padding: 10px;
        transition: transform 0.2s;
    }

    .menu {
        position: absolute;
        right: 30px;
        top: 0;
        width: 0px;
        height: 60px;
        overflow: hidden;

        ul {
            width: 140px;

            li {
                display: inline-block;
                width: 50px;
                text-align: center;
                padding: 10px 0;

                p {
                    font-size: 12px;
                    color: $uni-text-color-grey;
                }

                &:nth-child(1) {
                    margin-left: 10px;
                }

                &:nth-child(2) {
                    margin-right: 30px;
                }
            }
        }
    }

    .open {
        width: 140px;
        border-radius: 30px 0 0 30px;
        transition: width .2s;
    }
}

.menu-open {
    width: 170px;
    transition: width .2s;

    .m-icon {
        transform: rotate(45deg);
    }
}
</style>
