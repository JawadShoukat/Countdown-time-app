import React, {useEffect, useRef, useState} from 'react'
import './CounterTimer.css'


function CounterTimer() {
    const [time, setTime] = useState(0);
    const [isActive, setActive] =useState(false);
    const [ispause, setIspause] = useState(false);
    const intervalRef = useRef(null);

    const handleInput=(event)=>{
        setTime(parseInt(event.target.value * 60));
    }
    const formatTime = ()=>{
        const min = String(Math.floor(time/60)).padStart(2,'0');
        const sec = String(time%60).padStart(2,'0');
        return `${min} : ${sec}`
    }
    const handleStart = ()=>{
        setActive(true);
        setIspause(false);
    }
    useEffect(()=>{
        if(isActive && !ispause && time >0){
             intervalRef.current = setInterval(() => {
                setTime((prev)=> prev-1)
                
            },1000);
        }
        else if (time === 0){
            clearInterval(intervalRef.current);
            setActive(false);
            alert('Your time is over')
        }
        return () => clearInterval(intervalRef.current);

    }, [isActive, ispause, time])
    const handlePause = ()=>{
        setIspause(!ispause)
    }
    const handleReset = ()=> {
        clearInterval(intervalRef.current);
        setActive(false);
        setIspause(false);
        setTime(0);
    }
    

  return (
    
    <div className='countdown-timer'>
        <h1>Countdown Timer</h1>
       <div className='timer-display '>
        <input
        type='number'
        placeholder='Enter time in minuts'
        onChange={handleInput}/>
        <div>{formatTime()}</div>
        <div className='timer-controls'>
            <button onClick={handleStart}disabled={isActive && !ispause}>Start</button>
            <button onClick={handlePause}disabled={!isActive}>{ispause ? 'Resume' : 'pause'}</button>
            <button onClick={handleReset} >Reset</button>

        </div>

        <h4>create by Jawad Shoukat</h4>
     
       </div>
       <p>I have completed Sir Asharib's first project</p>
       
    </div>
  )

}


export default CounterTimer