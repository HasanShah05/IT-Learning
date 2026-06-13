"use client"

import { useRef, useState, useEffect } from "react"

function VedioPlayer({src, isPlaying}){
    const ref = useRef(null)

    useEffect(() => {
        if (isPlaying) {
            ref.current.play()
        }else{
            ref.current.pause()
        }
    })
    return <video ref={ref} src={src} loop playsInline/>
}

export function Player(){
    const [isPlaying, setIsPlaying] = useState(false)

    return(
        <>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "pause" : "play"}
            </button>
            <VedioPlayer
            isPlaying={isPlaying}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
        </>
    )
}