import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export interface VPCStackProps extends cdk.StackProps {
    readonly stage: string;

};

export class VPCStack extends cdk.Stack {
    readonly vpc: ec2.IVpc;

    constructor(scope: Construct, id: string, props: VPCStackProps) {
    super(scope, id, props)

    // This creates a standard VPC, nothin' special
    this.vpc = new ec2.Vpc(this, `${props.stage}-VPC`)

    }
};