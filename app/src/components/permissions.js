import { PermissionsAndroid } from 'react-native';


export class PermissionNotification {
  static async  requestCameraPermission() {
    await this.requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Mavionics App Camera Permission',
        'message': 'Camera is required to see where we are flying.'
      })
  }

  static async requestFineLocationPermission() {
    await this.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Mavionics App Location Permission',
        'message': 'GPS is required to find your vehicle.'
      })
  }

  static async requestCoarseLocationPermission() {
    await this.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        'title': 'Mavionics App Coarse Location Permission',
        'message': 'GPS is required to find your vehicle.'
      })
  }

  static async requestRecordAudioPermission() {
    await this.requestPermission(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        'title': 'Mavionics App Microphone Permission',
        'message': 'Microphone is required to talk to the pilote.'
      })
  }

  static async requestPermission(permission, permissionNotificationMessage ){
    try {
      const granted = await PermissionsAndroid.request(
        permission,
        permissionNotificationMessage)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission request success")
      } else {
        console.log("Permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
}