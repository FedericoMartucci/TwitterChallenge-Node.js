import AWS from 'aws-sdk';

// Initialize AWS S3 with your credentials and S3 bucket details
const s3 = new AWS.S3({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY',
});

// Generate a pre-signed URL for uploading a profile picture (PUT request)
const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: 'your-bucket-name',
    Key: `user_id/profile.jpg`, // Object key (e.g., user's ID)
    Expires: 60 * 5, // URL expires in 5 minutes
});

// Generate a pre-signed URL for retrieving a profile picture (GET request)
const downloadUrl = s3.getSignedUrl('getObject', {
    Bucket: 'your-bucket-name',
    Key: `user_id/profile.jpg`,
    Expires: 60 * 60 * 24, // URL expires in 24 hours
});

// Return the generated URLs to the client for upload and retrieval.
export { s3 }