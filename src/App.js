import React, { useState } from 'react';
import workoutData from './data';

function App() {

  const [workoutRoutine, setWorkoutRoutine] = useState({
    workoutType: 'PUSH UP',
    workoutImage: 'https://media.self.com/photos/5b6af7a156b2e2706f755857/master/w_728,c_limit/blast-off-push-ups-20-min.gif',
    sets: 1,
    reps: 3
  })



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
