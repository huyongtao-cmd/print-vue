import config from './Config.js';
let Env = {
	api: config.url,
	getShopId: () => {
		const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
		return  extConfig.shopId || config.shopId;

	},
	getAppId: () => {
		const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
		return  extConfig.appId || config.appId;
	}
};
export default Env;
