import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as cloudwatchAction from '@aws-cdk/aws-cloudwatch-actions';

export class Step03AlarmsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Lambda function on which we are placing cloudwatch alarms
    const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'lambda.handler',
    });

    // Matrices for the lambda function
    const errors = lambdaFn.metricErrors();
    const invocations = lambdaFn.metricInvocations();
    const throttle = lambdaFn.metricThrottles();

    // Cloudwatch variable/Matrics
    const allProblems = new cloudwatch.MathExpression({
      expression: 'errors + throttles',
      usingMetrics: {
        errors: errors,
        throttles: throttle,
      },
    });
    const problemPercentage = new cloudwatch.MathExpression({
      expression: '(problems / invocations) * 100',
      usingMetrics: {
        problems: allProblems,
        invocations: invocations,
      },
      period: cdk.Duration.minutes(1),
    });

    // Cloudwatch alarm
    const alarm = new cloudwatch.Alarm(this, 'Alarm', {
      metric: problemPercentage,
      threshold: 10,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 1,
    });

    // SNS Topic
    const Topic = new sns.Topic(this, 'Topic');
    Topic.addSubscription(
      new subscriptions.EmailSubscription('abc@example.com')
    );

    // Add alarm action to the alam
    alarm.addAlarmAction(new cloudwatchAction.SnsAction(Topic));
  }
}
