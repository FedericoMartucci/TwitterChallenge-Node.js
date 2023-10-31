import AWS from 'aws-sdk'

// Initialize AWS S3 with your credentials and S3 bucket details

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1",
});
function setPreSignedURL(userId: string, fileName: string, extension: string): string{
    const uploadURL = s3.getSignedUrl('putObject', {
        Bucket: 'siriuschallenge',
        Key: `${userId}-${fileName}${extension}`,
        Expires: 60 * 5,
    });
    return uploadURL.split('?')[0]
}

// Generate a pre-signed URL for retrieving a profile picture (GET request)
function getPreSignedURL(userId: string, fileName: string, extension: string): string{
    const profilePictureURL = s3.getSignedUrl('getObject', {
        Bucket: 'siriuschallenge',
        Key: `${userId}-${fileName}${extension}`,
    });
    return profilePictureURL
}
export { setPreSignedURL, getPreSignedURL }