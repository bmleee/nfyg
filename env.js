var dbconfig = {
	development: {
		dbname: 'seven_pictures_development',
		dbuser: '7pictures',
		dbpassword: '7pictures.co.kr',
		dbhost: '52.78.222.50:27017'
	},
	seven_pictures_server_pre_scheme: {
		dbname: 'seven_pictures_server_pre_scheme',
		dbuser: '7pictures',
		dbpassword: '7pictures.co.kr',
		dbhost: '52.78.222.50:27017'
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
var REDIS = {
	HOST: '52.78.222.50',
	PORT: '6379',
	PASS: '7pictures.co.kr',
}
var FB_TRACKER_URL = 'http://52.78.222.50:3000'

var FB_SHARER_URL = '//www.facebook.com/sharer/sharer.php'

var FB_APP = {
	// 7pictures-passport
	// clientID: '173733359775456',
	// clientSecret: '5e2b6f76dd2056a75baa30bc53b5463f',

	// 7pictures - dev test
	// clientID: '361812380855194',
	// clientSecret: 'ae271e47f68fcd1137ff029daeec475c'

	// 7pictures
	 clientID: '244902342546199',
	 clientSecret: '0f9ac2c68c43551f0a646d15605c3741'
}

module.exports = {
	DEV_PORT: 3002,
	EXPRESS_PORT,
	MONGODB_URL,
	FB_TRACKER_URL,
	REDIS,
	FB_SHARER_URL,
	FB_APP,
};
