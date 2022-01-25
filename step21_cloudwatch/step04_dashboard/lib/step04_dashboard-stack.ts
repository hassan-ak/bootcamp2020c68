import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

export class Step04DashboardStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Lambda function
    const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'lambda.handler',
    });

    // CloudWatch Matric
    const errors = lambdaFn.metricErrors({
      statistic: 'avg',
      period: cdk.Duration.minutes(1),
    });
    const duration = lambdaFn.metricDuration();

    // CloudWatch Dashboard
    const dash = new cloudwatch.Dashboard(this, 'dash');

    // Cloudwatch widgets
    const widget = new cloudwatch.GraphWidget({
      title: 'Executions vs error rate',
      left: [errors],
      right: [duration],
      view: cloudwatch.GraphWidgetView.BAR,
      liveData: true,
    });
    const textWidget = new cloudwatch.TextWidget({
      markdown: '# Key Performance Indicators',
    });

    // Add widgets to the dashboard
    dash.addWidgets(textWidget);
    dash.addWidgets(widget);
  }
}
