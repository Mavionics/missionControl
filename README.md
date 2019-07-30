# README
[![Build Status](https://travis-ci.org/Mavionics/missionControl.svg?branch=master)](https://travis-ci.org/Mavionics/missionControl)

## Build

The app can be built using docker. To do so run the following command:

```
sudo docker run --rm -v "$PWD":/root/tmp -w /root/tmp/ owodunni/mavionics-android:0.2.0 /bin/sh -c "cd app; npm run build-develop"
```