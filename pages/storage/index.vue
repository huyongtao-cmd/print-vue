<template>
<div class="container">

    <HeaderTitle title="文件库" color="#000000" />

    <ul class="ul-folders">
        <li v-for="(item, index) in folders" :key="index">
            <div class="icon" />
            <div class="info">
                <div class="title">{{item.name}}</div>
                <div class="time">
                    {{$FormatDate.timestampToTime(item.lastModified)}}
                </div>
            </div>
            <div class="more" @click="openOpt(index,'folder')" />
        </li>
    </ul>
    <div class="clearfix" />

    <DraggableBtn @btnAddClick="btnAddClick" />

    <Modal ref="addModal" title="新建文件夹" @onOk="addFolder" />
    <Modal ref="renameModal" :title="renameTip" :defaultText="renameText" @onOk="doRename" />

    <u-action-sheet :list="opts" v-model="showOpt" cancel-btn="true" @click="optClick"></u-action-sheet>   
    <u-modal v-model="showDelete" content="确定删除吗？" @confirm="doDelete" confirm-color="#32B8B7" :show-title="false" show-cancel-button="true"></u-modal>

</div>
</template>

<script>
import HeaderTitle from '../../components/HeaderTitle'
import DraggableBtn from '../../components/DraggableBtn'
import Modal from '../../components/Modal'
import Toast from '../../components/Toast'
export default {
    data() {
        return {
            loaded: true,
            folders: [],
            addType: 'file',
            showOpt: false,
            optType: 'folder',
            optIndex: -1,
            opts: [{
                text: '重命名'
            }, {
                text: '删除',
                color: '#dd524d'
            }],

            showDelete: false,
            renameTip: '',
            renameText: ''

        }
    },
    components: {
        HeaderTitle,
        DraggableBtn,
        Modal
    },
    methods: {
        loadFolders() {
            this.$Api.post('/usr/storage/folders').then((folders = []) => {
                this.folders = folders;
            });
        },
        btnAddClick(type) {
            this.addType = type;
            if (type == 'folder') {
                this.$refs.addModal.showModal(true);
            } else if (type == 'file') {
                Toast.show('暂不支持');
            }
        },
        addFolder(name) {
            this.$Api.post('/usr/storage/save_folder', {
                folder: JSON.stringify({
                    name
                })
            }).then(() => {
                this.$refs.addModal.showModal(false);
                this.loadFolders();
            });
        },
        openOpt(index, optType) {
            this.optType = optType;
            this.optIndex = index;
            this.showOpt = true;
        },
        optClick(index) {
            if (index == 0) {
                let isFolder = this.optType == 'folder';
                this.renameTip = isFolder ? '文件夹重命名' : '文件重命名';
                this.renameText = isFolder ? this.folders[this.optIndex].name : '';
                console.log(this.renameText);
                setTimeout(() => {
                    this.$refs.renameModal.showModal(true);
                }, 100);
            } else if (index == 1) {
                this.showDelete = true;
            }
        },
        doDelete() {
            console.log('do delete');
            let isFolder = this.optType === 'folder';
            let id = isFolder ? this.folders[this.optIndex].id : 0;
            let api = isFolder ? '/usr/storage/remove_folder' : '';
            this.$Api.post(api, {
                id
            }).then(() => {
                this.reload();
            });
        },
        doRename(name) {
            let isFolder = this.optType === 'folder';
            let id = isFolder ? this.folders[this.optIndex].id : 0;
            let api = isFolder ? '/usr/storage/rename_folder' : '';
            this.$Api.post(api, {
                id,
                name
            }).then(() => {
                this.$refs.renameModal.showModal(false);
                this.reload();
            });
        },
        reload() {
            let isFolder = this.optType === 'folder';
            if (isFolder) {
                this.loadFolders();
            }
        }
    },
    mounted() {
        this.loadFolders()
        wx.setNavigationBarTitle({
            title: '文件库'
        })
        wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff',
        })
    },
    onShow() {

    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 70px;
    min-height: 100vh;
    background: $bg-grey;

    .ul-folders {
        width: 100%;
        background: #fff;

        li {
            display: flex;
            height: 60px;
            padding: 10px 15px;

            .icon {
                flex: 0 0 20px;
                width: 20px;
                height: 40px;
                background: url('https://fs.maidaotech.cn/fine-printer/mp/icon_folder.png') center no-repeat;
                background-size: contain;
            }

            .info {
                flex: 1;
                padding: 0 15px;

                .title {
                    height: 25px;
                    line-height: 25px;
                    font-size: 16px;
                    color: #4A4A4A;
                    font-weight: 400;
                    @include multi-line(1)
                }

                .time {
                    height: 15px;
                    line-height: 15px;
                    font-size: 12px;
                    color: #9A9A9A;
                    font-weight: 400;
                }
            }

            .more {
                flex: 0 0 17px;
                width: 17px;
                height: 40px;
                background: url('https://fs.maidaotech.cn/fine-printer/mp/icon_more_dot.png') center no-repeat;
                background-size: contain;
            }

            @include border-btm();
        }
    }
}
</style>
