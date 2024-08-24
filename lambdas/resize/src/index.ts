import { S3Handler, S3Event } from 'aws-lambda';

export const handler: S3Handler = (event: S3Event) => {
  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
  }
};
