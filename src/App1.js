import React, { useState } from 'react';
import workoutDatalink from './data';
import absData from './Data/AbsData';
import upperBodyData from './Data/UpperBodyData';
import gymRandom from './Data/upperBodyGymData';

function App() {

  const [workoutRoutine, setWorkoutRoutine] = useState({
    workoutType: 'PUSH UP',
    workoutImage: 'https://media.self.com/photos/5b6af7a156b2e2706f755857/master/w_728,c_limit/blast-off-push-ups-20-min.gif',
    sets: 1,
    reps: 3
  })


  const [workoutData, setWorkoutData] = useState(workoutDatalink)


const changeWorkoutType = type => {
  switch(type){
    case absData:
    setWorkoutData(absData);
    break;
    case gymRandom:
    setWorkoutData(gymRandom);
    break;
    case upperBodyData:
    setWorkoutData(upperBodyData);
    break;
    default: setWorkoutData(workoutDatalink);
  }
}

  const newRandom=(max,min)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  const triggerNewSet=()=>{
      const num = workoutData.length
      const newNum = Math.floor(Math.random()*Math.floor(num));
      const newWorkout = workoutData[newNum];
      const newSets = newRandom(newWorkout.maxSets, newWorkout.minSets);
      const newReps = newRandom(newWorkout.maxReps, newWorkout.minReps);

      setWorkoutRoutine({
        workoutType: newWorkout.workoutType,
        workoutImage: newWorkout.workoutImage,
        sets: newSets,
        reps: newReps
      })
  }

  return (
    <div className="App">
      <button onClick={ changeWorkoutType.bind(this, absData)}>Abs</button>
      <button onClick={ changeWorkoutType.bind(this, upperBodyData)}>Upper</button>
      <button onClick={ changeWorkoutType.bind(this, gymRandom)}>Gym Random</button>
      <div className="outerBlock">
        <div className="innerBlock">
          <img className="imgDisplay" alt={workoutRoutine.workoutType} src={workoutRoutine.workoutImage} />
          <b className="typeDisplay">{workoutRoutine.workoutType}</b>
          <p className="setsDisplay">Do: <b>{workoutRoutine.sets}</b> rounds</p>
          <p className="repsDisplay">Do: <b>{workoutRoutine.reps}</b> times/round</p>
          <button onClick={triggerNewSet}>NEW SET</button>
        </div>
      </div>
    </div>
  );
}

export default App;
