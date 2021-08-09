let num = 0
import store from '../store/index.js'
export default class Preloader {
	static show(title) {
		 store.state.lodingflag = true
	}
	static hide() {
		store.state.lodingflag = false
	}
}
