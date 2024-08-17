import jimp from 'jimp';
import * as path from 'path';

const REPOSITORY_TOP = path.resolve(__dirname, '../../../');

const main = async () => {
  const imagePath = path.join(REPOSITORY_TOP, 'images/cdk.png');

  const image = await jimp.read(imagePath);

  const width = image.getWidth();
  const height = image.getHeight();

  console.info(`original size: (${width}, ${height})`);

  const resizedWidth = Math.floor(width / 2);
  const resizedHeight = Math.floor(height / 2);

  console.info(`resized size: (${resizedWidth}, ${resizedHeight})`);

  image.resize(resizedWidth, resizedHeight);
  image.write('resized.png');
};

main();
