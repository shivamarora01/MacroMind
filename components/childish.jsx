"use client"
import React, { useState } from "react";
export default function Childish({value, setValue}){
    const handlclick = () => {
        setValue(value+1);
    }
    return(
        <>
            <p>Hi sir {value}</p>
            <button onClick={handlclick}>click me!</button>
        </>
    )
}


