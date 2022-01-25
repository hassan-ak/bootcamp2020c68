# Step21-3 Alams

## Steps to code

1. Create new directory using `mkdir step03_alarms`.
2. Navigate to newly created directory using `cd step03_alarms`
3. Create cdk app using `cdk init app --language typescript`
4. Use `npm run watch` to auto transpile the code
5. Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function and define matrices for the lambda function

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
     runtime: lambda.Runtime.NODEJS_14_X,
     code: lambda.Code.fromAsset('lambda'),
     handler: 'lambda.handler',
   });
   const errors = lambdaFn.metricErrors();
   const invocations = lambdaFn.metricInvocations();
   const throttle = lambdaFn.metricThrottles();
   ```

6. Create "./lambda/lambda.ts" to define lambda handler code

   ```js
   export async function handler(event: any) {
     console.log('event:', event);
   }
   ```

7. Install cloudwatch in the app using `npm i @aws-cdk/aws-cloudwatch`. Update "./lib/step03_alarms-stack.ts" to create cloudwatch variables on whihc we are going to set alarms

   ```js
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
   ```

8. Update "./lib/step03_alarms-stack.ts" to create a cloudwatch alarm

   ```js
   const alarm = new cloudwatch.Alarm(this, 'Alarm', {
     metric: problemPercentage,
     threshold: 10,
     comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
     evaluationPeriods: 1,
   });
   ```

9. Install sns in the app using `npm i @aws-cdk/aws-sns`. And define a topic which is then used for sending emails to the subscriber

   ```js
   import * as sns from '@aws-cdk/aws-sns';
   const Topic = new sns.Topic(this, 'Topic');
   ```

10. Install sns subscription in the app using `npm i @aws-cdk/aws-sns-subscriptions`. Update "./lib/step03_alarms-stack.ts" and add subscription to the topic

    ```js
    import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
    Topic.addSubscription(
      new subscriptions.EmailSubscription('abc@example.com')
    );
    ```

11. Install cloudwatch actions in the app using `npm i @aws-cdk/aws-cloudwatch-actions`. Update "./lib/step03_alarms-stack.ts" to add an action to alarm.

    ```js
    import * as cloudwatchAction from '@aws-cdk/aws-cloudwatch-actions';
    alarm.addAlarmAction(new cloudwatchAction.SnsAction(Topic));
    ```

12. Deploy the app using `cdk deploy`
13. Test using console
14. Destroy using `cdk destroy`
