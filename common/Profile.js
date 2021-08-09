import Api from './Api.js';

let profileAndSettings = null;
const getProfileAndSettings = () => {
	if (profileAndSettings) {
		return Promise.resolve(profileAndSettings);
	}
	return Api.post('/usr/shop/profile_and_settings', null, {
		needToken: false
	}).then((res) => {
		profileAndSettings = res;
		return res;
	});
};

export default class Profile {
	static get() {
		return getProfileAndSettings().then((res) => {
			return res.profile;
		});
	}
	static getCs() {
		return getProfileAndSettings().then((res) => {
			return res.settings;
		});
	}
}