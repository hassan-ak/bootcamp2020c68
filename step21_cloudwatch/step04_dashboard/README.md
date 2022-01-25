# Step21-4 Dashboard

## Steps to code

1. Create new directory using `mkdir step04_dashboard`.
2. Navigate to newly created directory using `cd step04_dashboard`
3. Create cdk app using `cdk init app --language typescript`
4. Use `npm run watch` to auto transpile the code
5. Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step04_dashboard-stack.ts" to create a lambda function and define matrices for the lambda function

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
     runtime: lambda.Runtime.NODEJS_14_X,
     code: lambda.Code.fromAsset('lambda'),
     handler: 'lambda.handler',
   });
   const errors = lambdaFn.metricErrors({
     statistic: 'avg',
     period: cdk.Duration.minutes(1),
   });
   const duration = lambdaFn.metricDuration();
   ```

6. Create "./lambda/lambda.ts" to define lambda handler code

   ```js
   export async function handler(event: any) {
     console.log('event:', event);
   }
   ```

7. Install cloudwatch in the app using `npm i @aws-cdk/aws-cloudwatch`. Update "./lib/step04_dashboard-stack.ts" to create a dashboard

   ```js
   import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
   const dash = new cloudwatch.Dashboard(this, 'dash');
   ```

8. Update "./lib/step04_dashboard-stack.ts" to create cloudwatch widgets

   ```js
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
   ```

9. Install sns in the app using `npm i @aws-cdk/aws-sns`. And define a topic which is then used for sending emails to the subscriber

   ```js
   import * as sns from '@aws-cdk/aws-sns';
   const Topic = new sns.Topic(this, 'Topic');
   ```

10. Update "./lib/step04_dashboard-stack.ts" and add widgets to the dashboard

    ```js
    dash.addWidgets(textWidget);
    dash.addWidgets(widget);
    ```

11. Deploy the app using `cdk deploy`
12. Test using console
13. Destroy using `cdk destroy`
