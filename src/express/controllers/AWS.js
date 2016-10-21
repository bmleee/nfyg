import aws from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_IMAGE_BUCKET } from '../../../env'

import express from 'express'

const router = express.Router();

router.get('/sign', async (req, res) => {
	aws.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY})

	const s3 = new aws.S3()
	const options = {
		Bucket: S3_IMAGE_BUCKET,
		Key: req.query.file_name,
		Expires: 60,
		ContentType: req.query.file_type,
		ACL: 'public-read'
	}

	try {
		const signed_request = await s3.getSignedUrl('putObject', options)

		res.json({
			signed_request,
			url: `https://s3.amazoneaws.com/${S3_IMAGE_BUCKET}/${req.query.file_name}`
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
				message: 'Error when S3 image uploads',
				error,
			})
	}
})


export default router;
