#!/bin/bash
export ENV=$1 && rm -rf .angular && yarn && yarn run build-$ENV

export APP_VERSION=$(node -p "require('./package.json').version")

docker-compose config

docker-compose build --pull && docker login 159.223.35.151:5000

docker tag lemo-cms-svc:"$APP_VERSION" 159.223.35.151:5000/lemo-cms-svc:"$APP_VERSION"

docker push 159.223.35.151:5000/lemo-cms-svc:"$APP_VERSION"

# docker save -o lemo-cms-svc.tar lemo-cms-svc:0.1.0