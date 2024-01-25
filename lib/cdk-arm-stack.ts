import * as cdk from 'aws-cdk-lib';
import { GitHubTrigger } from 'aws-cdk-lib/aws-codepipeline-actions';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import BuildStage from './build-stage';
import { LinuxArmBuildImage } from 'aws-cdk-lib/aws-codebuild';

export class CdkArmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "ArmPipeline", {
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("m17kea/cdk-arm", "arm", {
          trigger: GitHubTrigger.WEBHOOK,
          authentication: cdk.SecretValue.secretsManager("cdk-arm")
        }),
        commands: [ 
          "npm ci",
          "npm run build",
          "npx cdk synth"
        ]
        }),
        publishAssetsInParallel: false,
        crossAccountKeys:true,
        dockerEnabledForSynth: true,
        codeBuildDefaults: {
          buildEnvironment: {
            buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
          }
        }
      }
    );

    const buildStage = new BuildStage(this, "BuildStage", {

    });

    pipeline.addStage(buildStage);    
  }
}
