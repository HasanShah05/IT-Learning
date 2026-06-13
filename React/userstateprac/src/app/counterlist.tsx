"use client";

import { useState } from "react";

let inittialCounters = [
    0,0,0
]

export function CounterList(){
    const [counters, setCounters] = useState(
        inittialCounters
    )

    function handleIncrementClick(index){
        const nextCounters = counters.map((c, i) => {
            if (i === index) {
                return c + 1
            }else{
                return c
            }
        });
        setCounters(nextCounters)
    }

    return(
        <>
            <ul>
                {counters.map((counter, i) => (
                    <li key={i}>{counter}
                    <button className="ml-4 bg-white text-black" onClick={() => {
                        handleIncrementClick(i)
                    }}>+1</button>
                    </li>
                ))}
            </ul>
        </>
    )
}