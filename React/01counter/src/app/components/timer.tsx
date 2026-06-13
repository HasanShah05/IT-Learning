"use client"

import { useState, useRef } from "react"

export function Stopwatch(){
    const [startTime, setStartTime] = useState(null)
    const [now, setNow] = useState(null)
    const intervalRef = useRef(null)

    function handleStart(){
        setStartTime(Date.now())
        setNow(Date.now())

        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setNow(Date.now())
        }, 10);
    }

      function handleStop() {
    clearInterval(intervalRef.current);
  }

    let secondPassed = 0
    if (startTime != null && now != null) {
        secondPassed = (now - startTime) / 1000
    }

    return(
        <>
            <h1>Time Passed: {secondPassed.toFixed(3)}</h1>
            <button onClick={handleStart}>start</button>
            <button onClick={handleStop}>stop</button>
        </>
    )
}