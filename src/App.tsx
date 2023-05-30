import { useEffect, useRef } from 'react'
import './App.css'
import { useParkingSpotsReducer } from './model';
import { ParkingSpotList } from './ParkingSpotList/ParkingSpotList';
import { createRandomParkingSpots, findFirstAvailableSpot } from './model/utils';
import { ParkingHistory } from './ParkingHistory/ParkingHistory';

function App() {
  
  const [spots, spotsReducer] = useParkingSpotsReducer();
  const isIntilized = useRef(false);

  function useFirstAvailableSpot() {
    const spot = findFirstAvailableSpot(spots);
    if (!spot) {
      return;
    }
    spotsReducer.useSpot(spot, {plate: Math.floor(Math.random() * 100) + ""});
  }

  useEffect(() => {
    if (isIntilized.current) {
      return;
    }
    isIntilized.current = true;
    spotsReducer.addSpots(createRandomParkingSpots(10));
  }, []);

  return (
    <div style={{display: "flex", justifyContent: "flex-start"}}>
      <div>
        <button onClick={useFirstAvailableSpot}>
          Enter Garage
        </button>
      </div>

      <div style={{width: "80vw"}}>
        <div>
          <ParkingSpotList/>
          <ParkingHistory/>
        </div>
      </div>
    </div>
    
  )
}

export default App
