#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ExampleLambdaStack } from '../lib/example-lambda-stack';

const props: cdk.StackProps = {
  env: {
    region: 'eu-west-1'
  }
};
const app = new cdk.App();
new ExampleLambdaStack(app, 'ExampleLambdaStack', props);
