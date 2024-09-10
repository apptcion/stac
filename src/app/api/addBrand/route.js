import { NextResponse } from 'next/server'

import dbConnect from '../../../db/mongoDB'
import brands from '../../../db/brand'

dbConnect()

export async function POST(req, res){

    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',  // 모든 도메인에서 접근 허용
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
   
    const data = await req.json();
    const {brand_name, brand_type, tel, email, productUrl1, productUrl2} = data;

    await brands.create({
        brand_name,
        brand_type,
        tel,
        email,
        productUrl1,
        productUrl2
    })


    console.log(brand_name, brand_type,tel,email,productUrl1,productUrl2)
    return NextResponse.json({
        data : {
            msg : "good"
        }
    })
}