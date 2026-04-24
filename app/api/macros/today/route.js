//Steps
//1. verify if user is logged in -> for token check we have a wrapper
//2. if yes, get its id
//3. connect the db
//4. make the query from month resource, get its data
//5. return it
import { verifyAuth } from "../../../../lib/verifyAuth"
import { withErrorWrapper } from "../../../../lib/withErrorWrapper"
import { connectDB } from "../../../../lib/connectDB"
import Macros from "../../../../models/macros";

export const GET = withErrorWrapper(
    verifyAuth(async function (request){
        await connectDB();
        //get the userId
        const user = request.user;
        const userId = user.userId;
        //get today's date
        const date = new Date().toLocaleDateString("en-CA");
        console.log(date);
        //now request to month api and use date filter
        const data = await Macros.find({
            userId: userId,
            date: date
        })
        console.log("data",data);
        return Response.json(
            {
               data: data,
               message: "this is the today's data"
            },
            {status: 200}
        );
    })
)