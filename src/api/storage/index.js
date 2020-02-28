import dotenv from "dotenv";
dotenv.config();

const bucket = process.env.REACT_APP_AWS_S3_BUCKET;
const region = process.env.REACT_APP_AWS_S3_BUCKET_REGION;

export { bucket, region };
