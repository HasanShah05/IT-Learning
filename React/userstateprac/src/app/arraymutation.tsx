"use client";

import { useState } from "react";

let nextId = 0;

export function List(){
    const [name, setName] = useState('');
    const [students, setStudents] = useState([])

    return(
        <>
            <h1>It Students</h1>
            <input type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name" />
            <button onClick={() => {
                setStudents([
                    ...students,
                    {id: nextId++, name: name}
                ]) ;
            }}>Add</button>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </>
    )
}

let initialStudetns = [
    {id: 0, name: 'Hasan Shah'},
    {id: 1, name: 'Abdul Hannan '},
    {id: 2, name: 'Lousive Nelwlton'},
]

export function ListTwo(){
    const [students, setStudents] = useState(
        initialStudetns
    )

    return(
        <>
            <h1>Inpiring Students</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name}{' '} <button onClick={() => {
                        setStudents(
                            students.filter(a =>a .id !== student.id)
                        )
                    }}>Delete</button></li>
                ))}
            </ul>
        </>
    )
}