export default function errorResponse(message, status){
    return Response.json(
        {
            success: false,
            message
        },
        {status}
    )
}