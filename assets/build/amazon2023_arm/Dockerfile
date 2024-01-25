FROM public.ecr.aws/codebuild/amazonlinux2-aarch64-standard:3.0

RUN set -ex \
    && yum update -y \
    && yum clean metadata \
    && yum install -y postgresql15-server \
    && yum clean all
