#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin
docker tag XinFin/XDCmaster XinFin/XDCmaster:$1
docker push XinFin/XDCmaster:$1
