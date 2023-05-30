import { useEffect, useState } from "react";
import { useParkingSpotsReducer } from "../model";
import { ParkingSpot } from "../model/ParkingSpots/ParkingSpot";
import { Reservation } from "../model/reservation/reservation";


interface SpotHistoryProps {
    reservations: Reservation[];
    parkingSpot: ParkingSpot;
}

function SpotHistory({reservations, parkingSpot}: SpotHistoryProps) {
    
    function getBorderColor(index: number) {
        if (parkingSpot.state == "available") {
            return "green";
        }
        if (index == reservations.length -1 && parkingSpot.state == "in_use") {
            return "red";
        }
        return "green";
    }

    function getPlateStyle(index: number): React.CSSProperties {
        return {borderColor: getBorderColor(index), marginTop: "0.5em", borderStyle: "solid"}
    }
    
    return (
    <div style={{width: "10em", height: "15em", display: "inline-block", overflowY: "scroll", margin: " 0 1em"}}>
        <div style={{fontWeight: "bold"}}>Spot# {parkingSpot.id}</div>
        <div style={{display: "flex", flexDirection: "column"}}>
            {reservations.map(
                (reservation, index) =>
                    <div key={reservation.plate} style={getPlateStyle(index)}> 
                        Plate Nr:{reservation.plate}
                    </div>
            )}
        </div>
    </div>
    )
}

export function ParkingHistory() {

    const [history, setHistory] = useState<Map<ParkingSpot, Reservation[]>>(new Map());
    const [spots,] = useParkingSpotsReducer();
    useEffect(() => {
        const newHistory = new Map();
        for (const spot of spots) {
            const spotHistory = history.get(spot) ?? [];
            if (spot.state == "available") {
                newHistory.set(spot, spotHistory);
            } else if (spotHistory.length == 0 || spotHistory[spotHistory.length-1] != spot.reservation) {
                console.log("inn");
                newHistory.set(spot, [...spotHistory, spot.reservation]); 
            } else {
                newHistory.set(spot, spotHistory);
            }
        }
        setHistory(newHistory);
        console.log(newHistory);
    }, [spots])

    return <div>
        <div 
            style={{marginBottom: "3em", fontWeight: "bold", fontSize: "2em"}}
        >
            Reservation History Chart
        </div>
        <div>
        {spots.map(spot => <SpotHistory key={spot.id} parkingSpot={spot} reservations={history.get(spot) || []}></SpotHistory>)}
        </div>
    </div>
}