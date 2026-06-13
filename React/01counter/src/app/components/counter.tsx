"use client";
 
import { useRef } from "react";

export function Counter(){
    const ref = useRef(0)

    function handleClick(){
        ref.current = ref.current + 1
        alert("you clicked " + ref.current + " times!.")
    }

    return(
        <>
            <button onClick={handleClick}>click here!</button>
        </>
    )
}