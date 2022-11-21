import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ExampleLambdaStack } from '../lib/example-lambda-stack';

test('ExampleLambdaStack synthetizes the expected template', () => {
  const app = new cdk.App();

  const stack = new ExampleLambdaStack(app, 'ExampleLambdaStack', { });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});
