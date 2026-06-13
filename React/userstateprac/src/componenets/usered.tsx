"use client";

import { useReducer } from "react";

function reducer(state, action){
    if (action.type === "incremented_age") {
        return{
            age: state.age + 1
        }
        throw Error('unkonwn error')
    }
}

export function Age(){
    const [state, dispatch] = useReducer(reducer, {age: 20})

    return(
        <>
        <button onClick={() => {
            dispatch({type: "incremented_age"})
        }}>Increment age</button>
        <p>your age is {state?.age}</p>
        </>
    )
}