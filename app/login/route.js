import { connectDB } from "../../lib/connectDB"

export async function GET(){
    connectDB()
    return Response.json({status: "ok"})
}