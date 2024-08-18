import { S3Handler, S3Event } from 'aws-lambda';

export const handler: S3Handler = (event: S3Event) => {
  console.info('invoked');
  console.info('%o', event);
};
