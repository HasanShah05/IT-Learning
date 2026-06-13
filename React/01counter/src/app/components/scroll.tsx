"use client";

import styles from "./testing.module.css"
import { useRef } from "react";

export function ScrollView(){
    const firstCatRef = useRef(null)
    const secondCatRef = useRef(null)
    const thirdCatRef = useRef(null)

    function handleScrollToFirstCat(){
        firstCatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }

    function handleScrollToSecondCat(){
        secondCatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }

    function handleScrollToThirdCat(){
        thirdCatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    }

    return(
        <>
            <nav>
                <button onClick={handleScrollToFirstCat}>
                    neo
                </button>
                <button onClick={handleScrollToSecondCat}>
                    millie
                </button>
                <button onClick={handleScrollToThirdCat}> 
                    bella
                </button>
            </nav>
            <div className="scroller">
                <ul>
                    <li>
                        <img src="/neo.jpeg" alt="neo" ref={firstCatRef} />
                    </li>
                    <li>
                        <img src="/millie.jpeg" alt="millie" ref={secondCatRef} />
                    </li>
                    <li>
                        <img src="/bella.jpeg" alt="bella" ref={thirdCatRef} />
                    </li>
                </ul>
            </div>
        </>
    )
}