var dbconfig = {
	dbname: 'seven_pictures',
	dbuser: '7pictures',
	dbpassword: '7pictures',
	dbhost: 'ds133348.mlab.com:33348'
}


module.exports = {
	DEV_PORT: 3002,
	EXPRESS_PORT: process.env.PORT || 8080,
	MONGODB_URL: `mongodb://${dbconfig.dbuser}:${dbconfig.dbpassword}@${dbconfig.dbhost}/${dbconfig.dbname}`,
};
