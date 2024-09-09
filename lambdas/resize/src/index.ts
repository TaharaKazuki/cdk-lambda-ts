import {
  S3Client,
  GetObjectCommandInput,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { S3Handler, S3Event } from 'aws-lambda';
import jimp from 'jimp';

export const handler: S3Handler = async (event: S3Event) => {
  const s3Client = new S3Client();

  for (const record of event.Records) {
    // 1.download
    const bucketName = record.s3.bucket.name;
    const key = record.s3.object.key;

    const input: GetObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };

    console.info(`downloading from s3://${bucketName}/${key}`);

    const command = new GetObjectCommand(input);
    const result = await s3Client.send(command);
    if (!result.Body) throw Error('result.Body is undefined!');

    const body = await result.Body.transformToByteArray();
    console.log(body);

    // 2. edit
    const bodyBuffer = Buffer.from(body);
    const image = await jimp.read(bodyBuffer);

    const width = image.getWidth();
    const height = image.getHeight();

    console.info(`original size: (${width}, ${height})`);

    const resizedWidth = Math.floor(width / 2);
    const resizedHeight = Math.floor(height / 2);

    console.info(`resized size: (${resizedWidth}, ${resizedHeight})`);

    image.resize(resizedWidth, resizedHeight);
  }
};
