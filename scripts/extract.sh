#!/bin/bash

echo "Extracting files..."

tar xvf buildFiles.tar -C .

# Only push this update to the server if the current branch is the Master branch
if [ "$TRAVIS_BRANCH" == "master" ]; then

  echo "Using google-service.json for build..."

  cp google-services.json vueNautics/android/app/google-services.json

else

  echo "Using google-service.json-dev for build..."

  cp google-services.json-dev vueNautics/android/app/google-services.json
fi
