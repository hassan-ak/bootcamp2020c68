# Step21-3 Alams

## Steps to code

1. Create new directory using `mkdir step03_alarms`.
2. Navigate to newly created directory using `cd step03_alarms`
3. Create cdk app using `cdk init app --language typescript`
4. Use `npm run watch` to auto transpile the code
5. Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   const lambdaFn = new lambda.Function(this, 'LambdaHandler', {
     runtime: lambda.Runtime.NODEJS_14_X,
     code: lambda.Code.fromAsset('lambda'),
     handler: 'lambda.handler',
   });
   ```

6. Create "./lambda/lambda.ts" to define lambda handler code

   ```js
   export async function handler(event: any) {
     console.log('event:', event);
   }
   ```

Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function

Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function

Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function

Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function

Install lambda in the app using `npm i @aws-cdk/aws-lambda`. Update "./lib/step03_alarms-stack.ts" to create a lambda function
