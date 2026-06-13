"use client";

import { useState } from "react";

export function App(){

    const [counter, setCounter] = useState(5)

    const addValue = () => {
        setCounter(counter + 1)
    }

    const remValue = ()=> {
        setCounter(counter - 1)
    }

    return(
        <>
            <h1>Chai Aur Code</h1>
            <h2>Counter value: {counter}</h2>

            <button
                onClick={addValue}
            >Add value</button>
            <br />
            <button
                onClick={remValue}
            >remove Value</button>
        </>
    )
}