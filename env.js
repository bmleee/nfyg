var dbconfig = {
	development: {
		dbname: 'seven_pictures',
		dbuser: '7pictures',
		dbpassword: '7pictures',
		dbhost: 'ds133348.mlab.com:33348'
	},
	seven_pictures_server_pre_scheme: {
		dbname: 'seven_pictures_sever_pre_scheme',
		dbuser: '7pictures',
		dbpassword: '7pictures',
		dbhost: 'ds133398.mlab.com:33398'
	}
};

function config2url(dbconfig) {
	return `mongodb://${dbconfig.dbuser}:${dbconfig.dbpassword}@${dbconfig.dbhost}/${dbconfig.dbname}`
}

var url = {
	development: config2url(dbconfig.development),
	seven_pictures_server_pre_scheme: config2url(dbconfig.seven_pictures_server_pre_scheme),
}

var EXPRESS_PORT = process.env.PORT || 8080
var MONGODB_URL = EXPRESS_PORT === 8080 ? url.development : url.seven_pictures_server_pre_scheme
var FB_TRACKER_URL = 'http://52.78.222.50:3000'

module.exports = {
	DEV_PORT: 3002,
	EXPRESS_PORT,
	MONGODB_URL,
	FB_TRACKER_URL,
};
