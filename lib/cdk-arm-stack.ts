import * as cdk from 'aws-cdk-lib';
import { GitHubTrigger } from 'aws-cdk-lib/aws-codepipeline-actions';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import BuildStage from './build-stage';

export class CdkArmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "ArmPipeline", {
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("m17kea/cdk-arm", "main", {
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
        dockerEnabledForSynth: true
      }
    );

    const buildStage = new BuildStage(this, "BuildStage", {

    });

    pipeline.addStage(buildStage);    
  }
}
