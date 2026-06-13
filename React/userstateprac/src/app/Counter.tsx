"use client";

import { useState } from "react";

export function Counter(){
    const [count, setCount] = useState(0);
    return <button className="bg-white p-2 text-black" onClick={() => setCount(count + 1)}>{count}</button>
}

export function Example(){
    const [text, setText] = useState("Hello")

    return(
        <>
        <p>{text}</p>
        <button className="bg-white p-2 text-black" onClick={() => setText("hi!")}>change</button>
        </>
    )
}

export function Form(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    function handleFirstNameChange(e){
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e){
        setLastName(e.target.value);
    }

    function handlereset(){
        setFirstName('');
        setLastName('')
    }

    return(
        <form onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
            <input type="text" placeholder="last name" value={lastName} onChange={handleLastNameChange} />
            <h1>Hi!!, {firstName} {lastName}</h1>
            <button onClick={handlereset}></button>
        </form>
    )
}

let n = 0

export function Counting(){
    const [number, setNumber] = useState(0)

    return(
        <>
        <h1>{number}</h1>
        <button className="bg-white p-2 text-black" onClick={() => {
            setNumber(n = n + 1);
            setNumber(n = n + 1);
            setNumber(n = n + 1);
        }}>+3</button>
        </>
    )
}