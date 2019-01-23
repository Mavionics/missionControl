import { PermissionsAndroid } from 'react-native';

export class PermissionNotifier {

static async  requestCameraPermission() {
  console.log("Permission.js, requestCameraPermission")
    return this.requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Mavionics App Camera Permission',
        'message': 'Camera is required to see where we are flying.'
      })
  }

  static async requestFineLocationPermission() {
    console.log("Permission.js, requestFineLocationPermission")
    return this.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Mavionics App Location Permission',
        'message': 'GPS is required to find your vehicle.'
      })
  }

  static async requestCoarseLocationPermission() {
    console.log("Permission.js, requestCoarseLocationPermission")
    return this.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        'title': 'Mavionics App Coarse Location Permission',
        'message': 'GPS is required to find your vehicle.'
      })
  }

  static async requestRecordAudioPermission() {
    console.log("Permission.js, requestRecordAudioPermission")
    return this.requestPermission(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        'title': 'Mavionics App Microphone Permission',
        'message': 'Microphone is required to talk to the pilote.'
      })
  }

  static async requestStoragePermission() {
    console.log("Permission.js, requestStoragePermission")
    return this.requestPermission(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Mavionics App Storage Permission',
        'message': 'Storage permission is required.'
      })
  }

  static async requestPermission(permission, permissionNotificationMessage ){
    console.log("Permission.js, requestPermission")
    try {
      const granted = await PermissionsAndroid.request(
        permission,
        permissionNotificationMessage)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission.js, Permission request success")
        return true;
      } else {
        console.log("Permission.js, Permission denied")
        return false;
      }
    } catch (err) {
      console.warn("Permission.js, " + err)
      return false;
    }
  }
}