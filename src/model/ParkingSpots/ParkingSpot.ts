import { Reservation } from "../reservation/reservation";

type SpotState = "available" | "in_use";

export class ParkingSpot {
    state: SpotState;
    id: string;
    reservation: Reservation | undefined;
}

export let parkingSpots: ParkingSpot[] = [];
export type StateChangeCallback = ((spots:ParkingSpot[]) => void);

export  class ParkingSpotsReducer {
  static callbacks: StateChangeCallback[] = [];
  static addCallback(callback: StateChangeCallback) {
    this.callbacks.push(callback);
  }

  static deleteCallback(callback: StateChangeCallback) {
    this.callbacks = this.callbacks.filter(current_callback => current_callback != callback);
  }

  static notify(spots: ParkingSpot[]) {
    this.callbacks.forEach(callback => callback(spots));
  }

  addSpots(spots: ParkingSpot[]) {
    parkingSpots = parkingSpots.concat(spots);
    ParkingSpotsReducer.notify(parkingSpots);
  }
  
  deleteSpots(spots: ParkingSpot[]) {
    const ids = spots.map(spot => spot.id);
    parkingSpots = parkingSpots.filter(parkingSpot => !ids.includes(parkingSpot.id));
    ParkingSpotsReducer.notify(parkingSpots);
  }

  setSpotAvailability(spot: ParkingSpot, newSpotState: SpotState) {
    const parkingSpot = parkingSpots.find(parkingSpot => parkingSpot.id == spot.id);
    if (parkingSpot) {
      parkingSpot.state = newSpotState;
    }
    ParkingSpotsReducer.notify([...parkingSpots]);
  }
}