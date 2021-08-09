import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import Api from '@/common/Api'
import KvStorage from '@/common/KvStorage.js'
import Toast from '@/components/Toast.js'
import Pages from '@/common/Pages'
import getKey from '@/common/GetKeys.js'
import FormatDate from '@/common/FormatDate.js'
import caching from '@/common/PageCaching.js'
import moment from 'moment'
//引入vuex
import store from './store'
Vue.config.productionTip = false
Vue.use(uView);
App.mpType = 'app'
//全局挂载方法
Vue.prototype.$moment = moment
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$KvStorage = KvStorage
Vue.prototype.$Toast = Toast
Vue.prototype.$caching = caching
Vue.prototype.$Api = Api
Vue.prototype.$FormatDate = FormatDate
Vue.prototype.$Pages = Pages
Vue.prototype.$getKey = getKey
const app = new Vue({
    ...App
})
app.$mount()