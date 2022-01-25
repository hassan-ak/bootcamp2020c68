# Step21 - AWS CDK CloudWatch

## Class Notes

Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), and IT managers. We can trigger alarms based on events. CloudWatch collects all data at one place which can be accessed in dashboard using different widgets. Cloudwatch is pre integrated with lambda functions but not true for some other services.

- Cloud watch allows to moniter matrics
- Matics can be viewed in graph
- Alams can be setup on graphs

On the CloudWatch console we have

- Log groups which list all the logs for all the resources
- Log insights where we can run queries on the logs#
- For using matices we need to apply tags
- If need to visulize data again and again need to create a dashboard
- We can create alarms on our matics

Important terms

- Namespaces
- Metrics
- Units
- Periods
- Dimensions
- Statistics
- Aggregation
- Alarms
- Dashboards
- SNS

## Sections

- [Alarms](./step03_alarms)

## Reading Material

- [AWS Cloudwatch Overview](https://aws.amazon.com/cloudwatch/)
- [AWS Cloudwatch User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [How Amazon CloudWatch Works](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_architecture.html)
- [AWS Cloudwatch CDK](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudwatch-readme.html)
- [AWS Cloudwatch Actions CDK](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudwatch-actions-readme.html)
- [Set a CloudWatch Alarm](https://docs.aws.amazon.com/cdk/v2/guide/how_to_set_cw_alarm.html)
- [CloudWatch Dashboards Using AWS CDK](https://medium.com/poka-techblog/cloudwatch-dashboards-as-code-the-right-way-using-aws-cdk-1453309c5481)
- [SNS Overview](https://aws.amazon.com/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc)
- [SNS CDK](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-sns-readme.html)
- [SNS Subscriptions CDK](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-sns-subscriptions-readme.html)
