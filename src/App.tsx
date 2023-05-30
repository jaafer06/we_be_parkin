import { useState, useReducer, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useParkingSpotsReducer } from './model';
import { ParkingSpotList } from './ParkingSpotList/ParkingSpotList';
import { createRandomParkingSpots, findFirstAvailableSpot } from './model/utils';

function App() {
  
  const [spots, spotsReducer] = useParkingSpotsReducer();
  const [numberOfSpots, setNumberOfSpots] = useState(10);
  
  return (
    <div style={{display: "flex", justifyContent: "flex-start"}}>
      <div>
        <button onClick={() => spotsReducer.setSpotAvailability(findFirstAvailableSpot(spots), "in_use")}>Enter Garage</button>
      </div>

      <div style={{width: "80vw"}}>
          <button
            onClick={() => spotsReducer.addSpots(createRandomParkingSpots(numberOfSpots))}
            disabled={spots.length > 0}
          >
            Generate random spots
          </button>
          <input
            style={{width: "3em"}}
            type="number" 
            defaultValue={10} 
            onChange={(event) => setNumberOfSpots(Number(event.target.value))}
          />
        <ParkingSpotList/>
      </div>
    </div>
    
  )
}

export default App
