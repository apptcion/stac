import {NextResponse} from 'next/server'

export async function GET(req){
    return NextResponse.json({
        data : {
            msg : "Welcome to Morning Star"
        }
    })
}