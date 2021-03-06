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

The app can be built using docker. To remove some docker complexity I wrapped the docker command in bash. You can run it with the command bellow:

```
./scripts/buildApp.sh -b build
```

## Local development

To efficiently test the Android app:

```
cd app
npm run start
```

Start Android Studio and build and deploy app in Debug to device or emulator. After making vue code changes reload app with R,R (press R-key twice rapidly) 