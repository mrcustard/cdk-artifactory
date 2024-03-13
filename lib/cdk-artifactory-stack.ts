import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as aws from './stacks/aws';


export class CdkArtifactoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
      const autoscale = aws.AutoScaleStack(this, '', {});
  }
}
