#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ElbtestStack } from '../lib/elbtest-stack';
import { RdsStack } from '../lib/rds_infrastructure';
import { VpcStack } from '../lib/vpc-stack';


const app = new cdk.App();

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION,
}

const vpcStack = new VpcStack(app, 'VpcStack', { env: env });
const rdsStack = new RdsStack(app, 'RdsStack', { env: env , myVpc: vpcStack.myVpc, rdsSecurityGroup: vpcStack.rdsSecurityGroup });
const ebStack =  new ElbtestStack(app, 'ElbtestStack', {  env: env, myRds: rdsStack.myRdsInstance });

rdsStack.addDependency(vpcStack);
ebStack.addDependency(rdsStack);

app.synth();