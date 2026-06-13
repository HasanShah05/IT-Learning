"use client";

import {sculptureList} from './data'
import { useState } from 'react'

export function Balcony(){
    const [index, setIndex] = useState(0)

    function handleClick(){
        setIndex(index + 1)
    }

    const sculpture = sculptureList[index]

    return(
        <>
        <button onClick={handleClick}>
            Next
        </button>
        <h2>
            <i>{sculpture.name}</i>
            by {sculpture.artist}
        </h2>
        <h3>
            <img src={sculpture.url} alt={sculpture.alt} />
        </h3>
        <p>
            {sculpture.description}
        </p>
        </>
    )
}