import React, { useState, useReducer } from 'react';
import gymWorkout from './Data/upperBodyGymData';
import './app.scss';

  const initTodayWorkoutDataArray = [];
  const initFrashOrgData = {
    workoutType: "",
    acturalRounds: [0,0,0],
    weights: [0,0,0],
    notes: ""
  };

  for(var i = 0; i < gymWorkout.length; i++){
    initTodayWorkoutDataArray.push({
      ...initFrashOrgData, workoutType: gymWorkout[i].workoutType
    })
  }

  const statePayload = {
    currentNum: 0,
    gymWorkout,
    currentWorkout: gymWorkout[0],
    todayWorkoutData: initTodayWorkoutDataArray
  }

  const actReducer = (page, action) => {
    switch(action.type){
      case 'nextPage':
        return {
          ...page,
          currentNum: page.currentNum + 1,
          currentWorkout: page.gymWorkout[page.currentNum + 1]
        }; 
      case 'prevPage':
        return {
          ...page,
          currentNum: page.currentNum - 1,
          currentWorkout: page.gymWorkout[page.currentNum - 1]
        }; 
      case 'dataChange':
        return {
          ...page,
          currentNum: page.currentNum + 1,
          currentWorkout: page.gymWorkout[page.currentNum + 1],
          todayWorkoutData: action.payload
        }
      default: return{ 
        ...page,
        currentNum: page.currentNum,
        currentWorkout: page.gymWorkout[0]
      };
    }
  }

  
  function GymRoutine() {
    const [ page, pageDispatch ] = useReducer(actReducer, statePayload)

  const frashOrgData = {
    workoutType: "",
    acturalRounds: [0,0,0],
    weights: [0,0,0],
    notes: ""
  };

  const [recData, setRecData] = useState(frashOrgData)

  const updateChanges =(e)=>{
    const cn = e.target.name;
    const value = e.target.value;
    const wrkName = e.target.getAttribute('data-workouttype');

    setRecData({
      ...recData,
      workoutType: wrkName,
      [cn]: value
    })
  }

  const updateWorkoutRec =(e)=>{
    const cn = e.target.name;
    const value = parseInt(e.target.value);
    const num = e.target.getAttribute('data-num');
    const wrkName = e.target.getAttribute('data-workouttype');

    (value < 1)? recData[cn][num]=0 : recData[cn][num]= value;
    recData[cn][num]= value
    const newArr = recData[cn];

    setRecData({
      ...recData,
      workoutType: wrkName,
      [cn]: newArr
    })
  }

  const updateRec = page.todayWorkoutData;
  updateRec.splice(page.currentNum, 1, recData)

  const onSubmitRec = (e) => {
    e.preventDefault()
    pageDispatch({type: 'dataChange', payload: updateRec})
    setRecData(frashOrgData);
  }

    const inputSetups = [
      {
        currentRound: 1,
        arrNum: 0
      },{
        currentRound: 2,
        arrNum: 1
      },{
        currentRound: 3,
        arrNum: 2
      }
    ]
  


  return (
    <div className="gymRoutine">
      <div className="outerBlock">
        <div className="innerBlock">
          <img className="imgDisplay" alt={page.currentWorkout.workoutType} src={page.currentWorkout.workoutImage} />
          <b className="typeDisplay">{page.currentWorkout.workoutType}</b>
          <div className="buttonContainer">
            <p className="setsDisplay"><b>{page.currentWorkout.sets}</b> Sets, </p>
            <p className="repsDisplay"> <b>{page.currentWorkout.reps}</b> Round</p>
          </div>
          <h3>Do 3 Sets</h3>

          <div className="lineContainer">
            <div>
              <b>Rounds</b>
            </div>
            <div>
              <b>Weight</b>
            </div>
          </div>   
          {           
            inputSetups.map((inputSetup, i)=>{
              return(
                <div className="lineContainer" key={i}>
                  <div>
                    <label>
                      {inputSetup.currentRound}:
                      <input
                        className="numInBox"
                        value = {recData.acturalRounds[inputSetup.arrNum]===0? '': recData.acturalRounds[inputSetup.arrNum]}
                        min = {0}
                        placeholder={recData.acturalRounds[inputSetup.arrNum]}
                        type="number"
                        name="acturalRounds"
                        data-num={inputSetup.arrNum}
                        data-workouttype={recData.workoutType}
                        onChange={updateWorkoutRec.bind(this)} />
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        className="numInBox"
                        value = {recData.weights[inputSetup.arrNum]===0? '': recData.weights[inputSetup.arrNum]}
                        min = {0}
                        placeholder={recData.weights[inputSetup.arrNum]}
                        type="number"
                        name="weights"
                        data-num={inputSetup.arrNum}
                        data-workouttype={recData.workoutType}
                        onChange={updateWorkoutRec.bind(this)} />
                        LB
                    </label>
                  </div>
                </div>  
              )
            })
          }

          <div className="notesContainer">
            <div className="notesInnerContainer">
              <input
                className="numInBox"
                placeholder="NOTES"
                value = {!recData.notes?"": recData.notes}
                type="text"
                name="notes"
                data-workouttype={page.currentWorkout.workoutType}
                onChange={updateChanges.bind(this)} />
            </div>
          </div>

          <button disabled={page.currentNum === gymWorkout.length-1? true : false } className="onSubmitRecBtn" onClick={onSubmitRec}>Submit</button>
        </div>
        <div>
        <span className="buttonContainer">
          <button disabled={page.currentNum === 0? true : false } onClick={()=> pageDispatch({type: 'prevPage'})}>Prev</button>
          <p>{page.currentNum}/{gymWorkout.length-1}</p>
          <button disabled={page.currentNum === gymWorkout.length-1? true : false } onClick={()=> pageDispatch({type: 'nextPage'})}>Next</button>
        </span>
      </div>
      </div>
    </div>
  );
}

export default GymRoutine;



