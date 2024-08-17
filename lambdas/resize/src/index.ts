import { Handler } from 'aws-lambda';

export const handler: Handler = (event) => {
  console.info('invoked');
  console.info('%o', event);
};
