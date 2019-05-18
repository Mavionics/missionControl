#!/bin/bash

echo "Extracting files..."

tar xvf buildFiles.tar -C .

cp keystore.jks app/android/app/keystore.jks
cp keystore.properties app/android/app/keystore.properties
cp api-8906124737792415557-945249-5af783f6cbeb.json app/android/app/api-8906124737792415557-945249-5af783f6cbeb.json

# Only push this update to the server if the current branch is the Master branch
if [ "$TRAVIS_BRANCH" == "master" ]; then

  echo "Using google-service.json for build..."

  cp google-services.json app/android/app/google-services.json

else

  echo "Using google-service.json-dev for build..."

  cp google-services.json-dev app/android/app/google-services.json
fi
