import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { BuildStack } from "./build-stack";

export default class BuildStage extends Stage {
    constructor(scope: Construct, id:string, props? :StageProps) {
        super(scope, id, props);
        
        var buildStack = new BuildStack(this, "BuildStack");
    }
}