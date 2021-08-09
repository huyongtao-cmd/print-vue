let config = {
	url: '',
	shopId: '',
	appId: '',
};
if (process.env.NODE_ENV === 'development') {
	config.url = 'http://192.168.50.196:2909/';
	config.appId = 'wxf7acd268d3e175b4'
} else {
	config.url = '';
	config.appId = 'wxf7acd268d3e175b4'
}
export default config;