"use client"

import { useRef } from "react"

export function InputRef(){
    const inputRef = useRef(null)

    function handleClick(){
        inputRef.current.focus()
    }

    return(
        <>
            <input type="text"
            ref={inputRef} />
            <button onClick={handleClick}>
                press here to focus
            </button>
        </>
    )
}