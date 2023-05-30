import { useEffect, useState } from "react";
import { ParkingSpot, parkingSpots, ParkingSpotsReducer } from "./ParkingSpot";

export function useParkingSpotsReducer(): [ParkingSpot[], ParkingSpotsReducer] {
    const [spots, setSpots] = useState(parkingSpots);
    useEffect(() => {
    ParkingSpotsReducer.addCallback(setSpots);
      return () => {
        ParkingSpotsReducer.deleteCallback(setSpots);
        console.log(ParkingSpotsReducer.callbacks.length);
      };
    }, []);
    return [spots, new ParkingSpotsReducer()];
}