import { useParkingSpotsReducer } from "../model/ParkingSpots/hooks"
import { ParkingSpot } from "../model/ParkingSpots/ParkingSpot";


function ParkingSpotStatus({ parkingSpot }: { parkingSpot: ParkingSpot }) {

    const [, parkingSpotsReducer] = useParkingSpotsReducer();

    const isAvailable = (spot: ParkingSpot) => {
        return spot.state == "available" ? true : false;
    }

    const circleStyle: React.CSSProperties = {
        width: "1em",
        height: "1em",
        backgroundColor: parkingSpot.state == "available" ? "green" : "red",
        borderRadius: "50%",
        margin: "auto"
    }

    return <div style={{ display: "inline-block", marginLeft: "1em"}}>
        <div>{parkingSpot.id}</div>
        <div style={circleStyle}></div>
        <button
            onClick={() => parkingSpotsReducer.freeSpot(parkingSpot)}
            disabled={isAvailable(parkingSpot)}
        >
            Exit
        </button>
    </div>
}

export function ParkingSpotList() {
    const [parkingSpots,] = useParkingSpotsReducer();
    return <div>
        {
            parkingSpots.map(spot => <ParkingSpotStatus key={spot.id} parkingSpot={spot} />)
        }
    </div>
}