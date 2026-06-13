"use client";

import { useState } from "react";

export function MovingDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          top: -180,
          left: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}

export function EmailForm(){
  const [person, setPerson] = useState({
    firstName: 'Hasan',
    lastName: 'Shah',
    email: 'shahhasan@gmail.com'
  });

  function handleFnameChange(e){
    // person.firstName = e.target.value
    setPerson({
      ...person,
      firstName: e.target.value
    })
  }

  function handleLnameChange(e){
    // person.lastName = e.target.value
    setPerson({
      ...person,
      lastName: e.target.value
    })
  }

  function hadleEmailChange(e){
    // person.email = e.target.value
    setPerson({
      ...person,
      email: e.target.value
    })
  }

  return(
    <>
      <label>
        First Name:
        <input type="text"
        value={person.firstName}
        onChange={handleFnameChange} />
      </label>
      <label>
        <input type="text"
        value={person.lastName}
        onChange={handleLnameChange} />
      </label>
      <label>
        <input type="email"
        value={person.email}
        onChange={hadleEmailChange} />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  )
}