//this is a register api

//connect the db
//get data from model

import { connectDB } from "../../../lib/connectDB";
import Register from './../../../models/register'

//process to register
//1. get all the data
//2. validate if all data is coming
//3. check if mail already in db
//4. if not , let the user register

export async function POST(request){
    connectDB();
    console.log("db about to connect in register");
    return Response.json({status: "ok"})
}
