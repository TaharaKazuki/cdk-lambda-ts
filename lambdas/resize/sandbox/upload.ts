import {
  PutObjectAclCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import Jimp from 'jimp';
import path from 'path';

const BUCKET_NAME = process.env.BUCKET_NAME;
const REPOSITORY_TOP = path.resolve(__dirname, '../../../');

async function main() {
  const s3Client = new S3Client();
  const imagePath = path.join(REPOSITORY_TOP, 'images/cdk.png');

  console.info(`reading an image from: ${imagePath}`);

  const image = await Jimp.read(imagePath);
  const mime = image.getMIME();

  const imageBuffer = await image.getBufferAsync(mime);

  const putInput: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: 'tmp/cdk.png',
    Body: imageBuffer,
  };

  const putCommand = new PutObjectAclCommand(putInput);
  const result = await s3Client.send(putCommand);
  console.info(result);
}

main();
