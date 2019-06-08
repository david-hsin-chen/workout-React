import React, { useState } from 'react';


function App() {

  const [workoutRoutine, setWorkoutRoutine] = useState({
    workoutType: 'PUSH UP',
    workoutImage: 'a.jpg',
    sets: 1,
    reps: 3
  })

  const workoutData = [
    {
      workoutType: 'Push-Up',
      workoutImage: 'a.jpg',
      minSets: 1,
      maxSets: 10,
      minReps: 1,
      maxReps: 30
    },
    {
      workoutType: 'Mountain Climber',
      workoutImage: 'b.jpg',
      minSets: 1,
      maxSets: 10,
      minReps: 2,
      maxReps: 40
    },
    {
      workoutType: 'Sit-Up',
      workoutImage: 'a.jpg',
      minSets: 1,
      maxSets: 10,
      minReps: 1,
      maxReps: 30
    }
  ]

  const newRandom=(max,min)=>{
    return Math.floor(Math.random()*(max-min)+min);
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
          <p className="setsDisplay">do <b>{workoutRoutine.sets}</b> round</p>
          <p className="repsDisplay">at <b>{workoutRoutine.reps}</b> times</p>
          <button onClick={triggerNewSet}>NEW SET</button>
        </div>
      </div>
    </div>
  );
}

export default App;
