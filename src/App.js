import React, { useState, useEffect, useReducer } from 'react';
import gymWorkout from './Data/upperBodyGymData';
import './app.scss';

function GymRoutine() {
  const [workoutRoutine, setWorkoutRoutine] = useState(gymWorkout);
  const [currentNum, setCurrentNumb] = useState(0);

  const frashOrgData = {
    workoutType: "",
    acturalSets: 0,
    acturalRounds: [0,0,0],
    weights: 0
  };

  const [recData, setRecData] = useState(frashOrgData)

  //----
  const actReducer = (currentNum, action) => {
    switch(action.type){
      case 'nextPage':
        return {setCurrentNumb(currentNum + 1)};
        break;
      case 'prevPage':
        return { setCurrentNumb(currentNum - 1)};
        break;
      default { currentNum }
    }
  }

  const [ page, pageDispatch ] = useReducer(actReducer, currentNum)
  //----

  useEffect(()=>{
    triggerNewSet(currentNum)
  }, [currentNum]);


  const triggerNewSet=(aNum)=>{
      const workout = gymWorkout[currentNum];

      setWorkoutRoutine({
        workoutType: workout.workoutType,
        workoutImage: workout.workoutImage,
        sets: workout.sets,
        reps: workout.reps
      })
  }

  const updateChanges =(e)=>{
    const cn = e.target.name;
    const value = e.target.value;
    const num = e.target.getAttribute('data-num');

    setRecData({
      ...recData,
      workoutType: workoutRoutine.workoutType,
      [cn]: value
    })
  }

  console.log(recData)



  return (
    <div className="gymRoutine">


      <div className="outerBlock">
        <div className="innerBlock">
          <img className="imgDisplay" alt={workoutRoutine.workoutType} src={workoutRoutine.workoutImage} />
          <b className="typeDisplay">{workoutRoutine.workoutType}</b>
          <div className="buttonContainer">
            <p className="setsDisplay"><b>{workoutRoutine.sets}</b> Sets, </p>
            <p className="repsDisplay"> <b>{workoutRoutine.reps}</b> Round</p>
          </div>
          <div>
            <p>Actural Sets</p>
            <input
              className="numInBox"
              type="number"
              name="workoutType"
              onChange={updateChanges.bind(this)} />
          </div>
          <div>
            <p>Actural rounds</p>
            <label>
              1:
              <input
                className="numInBox"
                type="number"
                name="acturalRounds"
                data-num={0}
                onChange={updateChanges.bind(this)} />
            </label>
          </div>
        </div>
        <div>
        <span className="buttonContainer">
          <button disabled={currentNum === 0? true : false } onClick={()=> pageDispatch({type: prevPage})}>Prev</button>
          <p>{currentNum}/{gymWorkout.length-1}</p>
          <button disabled={currentNum === gymWorkout.length-1? true : false } onClick={()=> pageDispatch({type: nextPage})}>Next</button>
        </span>
      </div>
      </div>
    </div>
  );
}

export default GymRoutine;



  // const [workoutRoutine, setWorkoutRoutine] = useState(gymWorkout);
  // const [currentNum, setCurrentNumb] = useState(0);

  // useEffect(()=>{
  //   triggerNewSet(currentNum)
  // }, [currentNum]);


  // const triggerNewSet=(aNum)=>{
  //     const workout = gymWorkout[currentNum];
  //     const newSets = Math.floor(Math.random()*(workout.maxSets-(workout.minSets+1))+workout.minSets);
  //     const newReps = Math.floor(Math.random()*(workout.maxReps-(workout.minReps+1))+workout.minReps);

  //     setWorkoutRoutine({
  //       workoutType: workout.workoutType,
  //       workoutImage: workout.workoutImage,
  //       sets: newSets,
  //       reps: newReps
  //     })
  // }

  // return (
  //   <div className="gymRoutine">


  //     <div className="outerBlock">
  //       <div className="innerBlock">
  //         <img className="imgDisplay" alt={workoutRoutine.workoutType} src={workoutRoutine.workoutImage} />
  //         <b className="typeDisplay">{workoutRoutine.workoutType}</b>
  //         <p className="setsDisplay">Do: <b>{workoutRoutine.sets}</b> rounds</p>
  //         <p className="repsDisplay">Do: <b>{workoutRoutine.reps}</b> times/round</p>
  //       </div>
  //       <div>
  //       <span className="buttonContainer">
  //         <button disabled={currentNum === 0? true : false } onClick={()=> setCurrentNumb(currentNum-1)}>Prev</button>
  //         <p>{currentNum}/{gymWorkout.length-1}</p>
  //         <button disabled={currentNum === gymWorkout.length-1? true : false } onClick={()=> setCurrentNumb(currentNum+1)}>Next</button>
  //       </span>
  //     </div>
  //     </div>
  //   </div>
  // );

//   <input
//   type="text"
//   value={message}
//   placeholder="Enter a message"
//   onChange={e => setMessage(e.target.value)}
// />
