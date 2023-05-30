import { useEffect, useState } from "react";
import { useParkingSpotsReducer } from "../model";
import { ParkingSpot } from "../model/ParkingSpots/ParkingSpot";
import { Reservation } from "../model/reservation/reservation";

export function ParkingHistory() {

    const [history, setHistory] = useState<Map<ParkingSpot, Reservation[]>>(new Map());
    const [spots,] = useParkingSpotsReducer();
    useEffect(() => {
        const newHistory = new Map();
        for (const spot of spots) {
            const spotHistory = history.get(spot) ?? [];
            if (spot.state == "available") {
                return;
            } else if (spotHistory.length > 0 && spotHistory[-1] != spot.reservation) {
                newHistory.set(spot, [...spotHistory, spot.reservation]); 
            }
        }
        setHistory(newHistory);
    }, [spots])
}