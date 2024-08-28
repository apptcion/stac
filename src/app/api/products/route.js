import {NextResponse} from 'next/server'
import dbConnect from '../../../db/mongoDB'
import products from '../../../db/products'

export async function GET(req){

    await dbConnect()

    // biome-ignore lint/style/useConst: <explanation>
    let result = await products.find()
    console.log(result)

    return NextResponse.json({
        data : {
            result
        }
    })
}