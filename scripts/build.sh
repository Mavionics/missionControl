#!/bin/bash

# Only push this update to the server if the current branch is the Master branch
if [ "$TRAVIS_PULL_REQUEST_BRANCH" != "false" ]; then

  echo "Current commit is on a Pull request skipping deploy"

elif [ "$TRAVIS_BRANCH" == "master" ]; then

  echo "Compiling and deploying $TRAVIS_BRANCH to production..."

  npm run build
  firebase deploy -P default --token $FIREBASE_TOKEN --only hosting

elif [ "$TRAVIS_BRANCH" == "develop" ]; then
  echo "Compiling and deploying $TRAVIS_BRANCH to development..."

  npm run dev-build
  firebase deploy -P develop --token $FIREBASE_TOKEN --only hosting

else
    echo "Current branch is $TRAVIS_BRANCH, Not master or develop so no deployment will be done"
fi
