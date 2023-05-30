import { ParkingSpot } from "./ParkingSpots/ParkingSpot";
import { Reservation } from "./reservation/reservation";

export function createRandomReservation(reservations: Reservation[]) {
    let plate = Math.round(Math.random() * 100) + "";
    while (reservations.find(reservation => reservation.plate == plate)) {
        plate = Math.round(Math.random() * 100) + "";
    }
    return plate;
}

export function createRandomParkingSpots(numParkingSpots: number) {
    const startingId =  Math.round(Math.random() * 100);
    const result: ParkingSpot[] = [];
    for (let index = 0; index < numParkingSpots; ++index) {
        const id = (startingId + index) + "";
        result.push({id, state: "available", reservation: undefined})
    }
    return result;
}

export function findFirstAvailableSpot(parkingSpots: ParkingSpot[]): ParkingSpot | undefined {
    return parkingSpots.find(spot => spot.state == "available");
}