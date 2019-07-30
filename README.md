# README
[![Build Status](https://travis-ci.org/Mavionics/missionControl.svg?branch=master)](https://travis-ci.org/Mavionics/missionControl)

## Setup

The project can be developed towards the production server or the development server.

This is done with the following commands.

Develop:

```
./scripts/setup.sh -m dev
```

Production:
```
./scripts/setup.sh -m production
```


## Build

The app can be built using docker.

```
sudo docker run --privileged -p 5037:5037 --rm -v "$PWD":/root/tmp -w /root/tmp/ owodunni/mavionics-android:0.2.0 /bin/sh -c "cd app; npm run build-develop"
```