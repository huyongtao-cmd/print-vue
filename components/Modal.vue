<template>
<div class="modal-container" v-if="visible">
    <div :class="maskCls" @click="maskClick"></div>
    <div class="modal">
        <div class="inner">
            <div class="title">{{title}}</div>
            <input v-model="text">
        </div>
        <div class="footer">
            <div class="cancel" @click="onCancel">{{cancelText}}</div>
            <div class="ok" @click="doOK">{{okText}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String
        },
        defaultText: {
            type: String
        },
        okText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        maskClosable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visible: false,
            text: '',
            maskCls: 'mask'
        }
    },
    methods: {
        showModal(val = false) {
            if (!val) {
                this.onCancel();
            } else {
                console.log(this.defaultText);
                this.text = this.defaultText;
                console.log(this.text);
                this.visible = true;
            }
            this.maskCls = val ? 'mask' : 'mask mask-fade-out';
        },
        onCancel() {
            this.text = '';
            this.maskCls = 'mask mask-fade-out'
            setTimeout(() => {
                this.visible = !this.visible;
            }, 100)
        },
        doOK() {
            this.$emit('onOk', this.text)
        },
        maskClick() {
            if (this.maskClosable) {
                this.onCancel();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-container {

    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .4);
        overflow: hidden;
        z-index: 100;
    }

    .mask-fade-out {
        opacity: 0;
        transition: opacity .4s;
    }

    .modal {
        z-index: 101;
        position: fixed;
        width: 300px;
        height: 180px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -120%);
        background: #fff;
        border-radius: 7px;

        .inner {
            padding: 20px;

            .title {
                width: 100%;
                overflow: hidden;
                text-align: center;
                font-size: 18px;
                color: #000;
            }

            input {
                background: #FFFFFF;
                line-height: 40px;
                width: 100%;
                height: 40px;
                padding: 0 7px;
                font-size: 14px;
                margin-top: 20px;
                border: 1px solid #ddd;
                border-radius: 3px;
            }
        }

        .footer {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 50px;
            border-top: 1px solid #ddd;
            display: flex;

            .cancel {
                flex: 1;
                font-size: 18px;
                line-height: 50px;
                text-align: center;
                color: #000;
                border-right: 1px solid #ddd;
            }

            .ok {
                @extend .cancel;
                color: $primary-color;
                border: none;
            }
        }

    }
}
</style>
