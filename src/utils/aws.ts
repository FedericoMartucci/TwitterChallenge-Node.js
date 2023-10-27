import AWS from 'aws-sdk'

// Initialize AWS S3 with your credentials and S3 bucket details

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "sa-east-1",
});

// Generate a pre-signed URL for retrieving a profile picture (GET request)
const downloadUrl = s3.getSignedUrl('getObject', {
    Bucket: 'siriuschallenge',
    Key: `user_id/profile.jpg`,
    Expires: 60 * 60 * 24, // URL expires in 24 hours
});
export { s3 }