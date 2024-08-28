import {NextResponse} from 'next/server'
import dbConnect from '../../../db/mongoDB'
import products from '../../../db/products'
import { getChoseong } from 'es-hangul'

export async function GET(req){

    await dbConnect()

    const { searchParams } = new URL(req.url)

    const keyword = searchParams.get('keyword')
    const choseong = getChoseong(keyword)

    const regexKeyword = new RegExp(keyword, 'i')
    const regexChoseong = new RegExp(choseong)

    console.log(keyword)
    console.log(choseong)

    // biome-ignore lint/style/useConst: <explanation>
    let result 
    if(choseong){
        result = await products.find({ $or : [{products_name : { $regex : regexKeyword } },{brand : { $regex : regexKeyword } }, {category : { $regex : regexKeyword } }, { choseong : { $regex : regexChoseong}}] })
    }else{
        result = await products.find({ $or : [{products_name : { $regex : regexKeyword } },{brand : { $regex : regexKeyword } }, {category : { $regex : regexKeyword } }] })
    
    }
    console.log(result)

    return NextResponse.json({
        data : {
            result
        }
    })
}