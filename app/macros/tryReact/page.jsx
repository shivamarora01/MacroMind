"use client"
import React, { useState } from "react";
import Childish from "../../../components/childish";
export default function tryReact(){
    const [value, setValue] = useState(0);
    return(
        <>
            <Childish value={value} setValue={setValue}></Childish>
        </>
    )
}

