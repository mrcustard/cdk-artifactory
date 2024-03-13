import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as asg from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {InstanceClass, InstanceSize} from 'aws-cdk-lib/aws-ec2';
import * as vpc from './vpc';
import * as iam from './iam';

export interface AutoScaleStackProps extends cdk.StackProps {
    readonly stage: string;
    readonly defaultEBSVolumeSize: number;

};

export class AutoScaleStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: AutoScaleStackProps) {
    super(scope, id, props)

    // TODO: Add node specific block devices. The control plane should have a backup EBS volume in addition to the cache, and OS volumes.
    // TODO: fix iam role function
    const iamRole = iam.IAMRole(this, '', {})

    // Create an S3 bucket without a name so that if a rollback is required the bucket can also be deleted
    // by the cloudformation service. Otherwise, you will eventually use up your buckets. We will use
    // "termination protection" to prevent it from being accidentally deleted. Using tags will let us have a more human
    // read-able "name", but still give us the ability to allow cloudformation to delete.
    const asLaunchTemplate = new ec2.LaunchTemplate(this, `${props.stage}-LaunchTemplate`, {
        blockDevices: [{
            deviceName: '/dev/xvda',
            volume: new ec2.BlockDeviceVolume.ebs(500)
        }],
        instanceType: ec2.InstanceType.of(InstanceClass.C5, InstanceSize.XLARGE4),
        role: iamRole
    });

    const ASG = new asg.AutoScalingGroup(this, `${props.stage}-ASG`, {
        vpc: new vpc.VPCStack(this, `${props.stage}-ASG-VPC`, { stage: `${props.stage}`}).vpc,
        launchTemplate: asLaunchTemplate,
    });







    }
};