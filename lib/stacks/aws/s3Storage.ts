import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'

export interface S3BucketStackProps extends cdk.StackProps {
    readonly stage: string; // this should be one of development, production, staging
    readonly s3BucketTags?: string;
};

export class S3BucketStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: S3BucketStackProps) {
    super(scope, id, props)

    // Create an S3 bucket without a name so that if a rollback is required the bucket can also be deleted
    // by the cloudformation service. Other wise you will eventually use up your buckets. We will use
    // "termination protection" to prevent it from being accidently deleted. Using tags will let us have a more human
    // read-able "name", but still give us the ability to allow cloudformation to delete.

    const s3Bucket = new s3.Bucket(this, `${props.stage}-Bucket`, {})

    }
};