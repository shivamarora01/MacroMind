export default function errorResponse(message, status = 500){
    return Response.json(
        {
            success: false,
            message
        },
        {status}
    )
}