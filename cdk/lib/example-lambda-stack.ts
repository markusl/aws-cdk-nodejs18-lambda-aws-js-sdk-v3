import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import {
  aws_s3 as s3,
  aws_s3_notifications as s3n,
  aws_logs as logs,
  aws_lambda as lambda,
  aws_lambda_nodejs as lambda_nodejs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ExampleLambdaStack extends Stack {

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'ExampleBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const lambdaFn = new lambda_nodejs.NodejsFunction(this, 'ExampleFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: false,
        externalModules: ['@aws-sdk/*'],
        format: lambda_nodejs.OutputFormat.ESM,
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
      memorySize: 256,
      timeout: Duration.minutes(1),
      architecture: lambda.Architecture.ARM_64,
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    bucket.grantRead(lambdaFn);
    bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(lambdaFn));
  }
}
