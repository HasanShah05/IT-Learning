"use client";

function AlertButton({ message, children}){
    return(
        <button className="flex" onClick={() => alert(message)}>
            {children}
        </button>
    )
}

export default function Toolbar(){
    return(<>
        <AlertButton message={"playing"}>
            Play movie
        </AlertButton>
        <AlertButton message={"Clicked me!!!"}>
            Click Me
        </AlertButton>
        </>
    )
}

export function Tooledbar(){
    return(
        <div className="Toolbar" onClick={() => alert("You clicked on a toolbar")}>
            <button onClick={() => alert("Playing")}>
                Play Movie
            </button>

        </div>
    )
}