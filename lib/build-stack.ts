import * as cdk from 'aws-cdk-lib';
import { LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { Construct } from 'constructs';

export class BuildStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      var armImage = LinuxBuildImage.fromAsset(this, "ArmImage",
      {
          directory: "./assets/build/amazon2023_arm",
          platform: Platform.LINUX_ARM64
      });

      var x86Image = LinuxBuildImage.fromAsset(this, "x86Image",
      {
          directory: "./assets/build/amazon2023_x86",
          platform: Platform.LINUX_AMD64
      });
    }
}