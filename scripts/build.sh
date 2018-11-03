#!/bin/bash
echo "Pre branch"
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
echo $branch

# Only push this update to the server if the current branch is the Master branch
if [ "$branch" == "master" ]; then

  echo "Compiling and deploying $branch to production..."

  npm run build
  firebase deploy -P default --token $FIREBASE_TOKEN --only hosting
elif [ "$branch" == "develop" ]; then
  echo "Compiling and deploying $branch to development..."

  npm run dev-build
  firebase deploy -P develop --token $FIREBASE_TOKEN --only hosting

else
    echo "Will not publish from a branch other than master or develop.\nPlease merge your changes into master and try again.\n\n"
fi
