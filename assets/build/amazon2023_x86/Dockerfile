FROM public.ecr.aws/codebuild/amazonlinux2-x86_64-standard:5.0 

RUN set -ex \
    && yum update -y \
    && yum clean metadata \
    && yum install -y postgresql15-server \
    && yum clean all
