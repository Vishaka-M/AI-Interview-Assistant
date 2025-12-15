const AWS = require('aws-sdk');
const config = require('../config/default');

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
});

exports.uploadFile = async (file) => {
  const params = {
    Bucket: config.aws.bucketName,
    Key: `interviews/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private'
  };
  
  const result = await s3.upload(params).promise();
  return result.Location;
};

exports.getSignedUrl = async (key) => {
  const params = {
    Bucket: config.aws.bucketName,
    Key: key,
    Expires: 3600 // URL expires in 1 hour
  };
  
  return s3.getSignedUrl('getObject', params);
};