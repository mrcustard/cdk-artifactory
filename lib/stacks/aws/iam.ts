import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface IAMRoleProps extends cdk.StackProps {
    readonly stage: string
}

export class IAMRole extends cdk.Stack {
    readonly IAMRole: iam.Role;
    constructor(scope: Construct, id: string, props: IAMRoleProps) {
        super(scope, id, props);

        // TODO: fix the iam role to be least permission
        this.IAMRole = new iam.Role(this, `${props.stage}-IAM-Role`, {
            assumedBy: iam.AnyPrincipal
        });
    }
}