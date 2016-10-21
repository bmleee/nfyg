var dbconfig = {
	dbname: 'seven_pictures',
	dbuser: '7pictures',
	dbpassword: '7pictures',
}


module.exports = {
	EXPRESS_PORT: process.env.PORT || 3003,
	MONGODB_URL: `mongodb://${dbconfig.dbuser}:${dbconfig.dbpassword}@ds041643.mlab.com:41643/seven_pictures`,

	AWS_ACCESS_KEY: 'AKIAIFTTMP67OCZRKABQ',
	AWS_SECRET_KEY: 'lMsgmoRkk4g7TthwO7crtEN5GpTh',
	S3_IMAGE_BUCKET: '7pictures-image-upload',
};
