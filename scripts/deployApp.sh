#!/bin/bash

echo "$TRAVIS_PULL_REQUEST_BRANCH"

# Only push this update to the server if the current branch is the Master branch
if [ "$TRAVIS_PULL_REQUEST_BRANCH" != "" ]; then

  echo "Current commit is on a Pull request skipping deploy"

elif [ "$TRAVIS_BRANCH" == "master" ]; then

  echo "Compiling and deploying $TRAVIS_BRANCH to production..."

  npm run deploy-master

elif [ "$TRAVIS_BRANCH" == "develop" ]; then
  echo "Compiling and deploying $TRAVIS_BRANCH to alpha..."

  npm run deploy-alpha

else
    echo "Current branch is $TRAVIS_BRANCH, Not master or develop so no deployment will be done"
fi
