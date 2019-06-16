import React, { useState, useEffect } from 'react';
import gymWorkout from './Data/upperBodyGymData';

function GymRoutine() {

  const [workoutRoutine, setWorkoutRoutine] = useState(gymWorkout)
  const [currentNum, setCurrentNumb] = useState(0)

  useEffect(()=>{
    triggerNewSet
  }, [currentNum])


  const triggerNewSet=()=>{
      const newWorkout = workoutRoutine[currentNum];
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
    <div className="GymRoutine">


      <div className="outerBlock">
        <div className="innerBlock">
          <img className="imgDisplay" alt={workoutRoutine.workoutType} src={workoutRoutine.workoutImage} />
          <b className="typeDisplay">{workoutRoutine.workoutType}</b>
          <p className="setsDisplay">Do: <b>{workoutRoutine.sets}</b> rounds</p>
          <p className="repsDisplay">Do: <b>{workoutRoutine.reps}</b> times/round</p>
        </div>
      </div>

      <div>
        <span>
          <button className={currentNum === 0? "hide": ""} onClick={()=> setCurrentNumb(currentNum-1)}>Prev</button>
          <p>Current Page</p>
          <button className={currentNum === workoutRoutine.length? "hide": ""} onClick={()=> setCurrentNumb(currentNum+1)}>Next</button>
        </span>
      </div>
    </div>
  );
}

export default GymRoutine;
