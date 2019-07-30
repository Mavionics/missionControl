#!/bin/bash

while getopts m: option
do
case "${option}"
in
m) SETUP_MODE=${OPTARG};;
esac
done

if [ -z "$SETUP_MODE" ]; then
  echo ""
  echo "*** Error ***"
  echo ""
  echo "Usage:  setup.sh [Options]"
  echo "Options:"
  echo "-m, Set development mode (dev|production)"
  exit -1
fi

git clone git@github.com:owodunni/mavionics-secrets.git

if [ "$SETUP_MODE" == "dev" ]; then

export TRAVIS_BRANCH=''

elif [ "$SETUP_MODE" == "production" ]; then

export TRAVIS_BRANCH="master"

fi

cp mavionics-secrets/missionControl/buildFiles.tar buildFiles.tar

./scripts/extract.sh

rm google-services.json google-services.json-dev keystore.jks keystore.properties api-8906124737792415557-945249-5af783f6cbeb.json buildFiles.tar
rm -rf mavionics-secrets
unset TRAVIS_BRANCH