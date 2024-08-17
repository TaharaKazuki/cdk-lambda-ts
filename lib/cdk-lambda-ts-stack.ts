import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

const PREFIX = 'cdk-lambda-ts';

export class CdkLambdaTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // eslint-disable-next-line unused-imports/no-unused-vars
    const bucket = new s3.Bucket(this, `${PREFIX}-bucket`, {
      bucketName: `${PREFIX}-sample2`,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
