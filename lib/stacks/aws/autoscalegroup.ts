import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as asg from 'aws-cdk-lib/aws-autoscaling';
import * as ec2  from 'aws-cdk-lib/aws-ec2';
import * as vpc from './vpc';

export interface AutoScaleStackProps extends cdk.StackProps {
    readonly stage: string;

};

export class AutoScaleStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: AutoScaleStackProps) {
    super(scope, id, props)

    // Create an S3 bucket without a name so that if a rollback is required the bucket can also be deleted
    // by the cloudformation service. Otherwise you will eventually use up your buckets. We will use 
    // "termination protection" to prevent it from being accidently deleted. Using tags will let us have a more human
    // readable "name", but still give us the ability to allow cloudformation to delete.
    const launchTemplate = new ec2.LaunchTemplate(this, `${props.stage}-LaunchTemplate`, {});

    const ASG = new asg.AutoScalingGroup(this, `${props.stage}-ASG`, {
        vpc: new vpc.VPCStack(this, `${props.stage}-ASG-VPC`, { stage: `${props.stage}`}).vpc,

        


    })


    }
};