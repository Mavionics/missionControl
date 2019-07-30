echo "Build app for development"

while getopts b: option
do
case "${option}"
in
b) BUILD_MODE=${OPTARG};;
esac
done

if [ -z "$BUILD_MODE" ]; then
  echo ""
  echo "*** Error ***"
  echo ""
  echo "Usage:  build.sh [Options]"
  echo "Options:"
  echo "-b, Set build mode (build|clean)"
  exit -1
fi

if [ "$BUILD_MODE" == "build" ]; then

sudo docker run --privileged -p 5037:5037 --name mavionics-android --rm -v "$PWD":/root/tmp -w /root/tmp/ owodunni/mavionics-android:0.2.0 /bin/sh -c "cd app; npm run build-develop"

elif [ "$BUILD_MODE" == "clean" ]; then

sudo docker kill mavionics-android

fi
