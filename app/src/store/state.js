export function getEmptyState(){
  return {
    user: null,
    vehicles: [],
    activeVehicle: null,
    activeVehicleRef: null,
    logging_in: false,
    permissionStatus: false,
    position: {longitude: 0, latitude: 0},
  };
}