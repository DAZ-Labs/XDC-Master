#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin
docker tag XinFin/XDCmaster XinFin/XDCmaster:latest
docker tag XinFin/XDCmaster XinFin/XDCmaster:$TRAVIS_BUILD_ID
docker push XinFin/XDCmaster:latest
docker push XinFin/XDCmaster:$TRAVIS_BUILD_ID
