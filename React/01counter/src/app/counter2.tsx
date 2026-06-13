"use client";

import { useState } from "react";
import styles from "./testing.module.css"

function Counter(){
    const [count, setCount] = useState(0)
    const [hover, setHover] = useState(false)

    let className = styles.counter
    if (hover) {
        className += ' ' + styles.hover
    }

    return(
        <div
        className={className}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        >
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Add One</button>

        </div>
    )
}

export function Counter2(){
    return(
        <>
            <Counter/>
            <Counter/>
        </>
    )
}

export function Counter3(){
    const [isPaused, setIsPaused] = useState(false)
    return(
        <>
        {
            isPaused ? <p>See you later!</p> : <Counter/>
         }
         <label>
            <input type="checkbox"
            checked={isPaused}
            onChange={e => setIsPaused(e.target.checked)}
            />
            Take a break.
         </label>
        </>
    )
}