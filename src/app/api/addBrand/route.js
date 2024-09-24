import { NextResponse } from 'next/server'

import dbConnect from '../../../db/mongoDB'
import brands from '../../../db/brand'

await dbConnect()

export async function POST(req, res){

    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',  // 모든 도메인에서 접근 허용
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
   
    const data = await req.json();
    const {brand_name, brand_type, tel, email, productUrl1, productUrl2, sendMail, personal} = data;

    try { 

        const brand = await brands.find({brand_name})
        if(brand.length != 0){
            console.log('브랜드 등록 거절됨. 사유 : 존재하는 브랜드 이름')
            console.log(`Brandname : ${brand_name}`)
            return new Response(
                JSON.stringify({
                    success : false,
                    msg : "존재하는 브랜드 이름"
                }), {status : 200, headers}
            )
        }else{
            await brands.create({
                brand_name,
                brand_type,
                tel,
                email,
                productUrl1,
                productUrl2,
                sendMail,
                personal
            })
        }
        console.log(`새 브랜드 등록됨.`)
        console.log(`이름 : ${brand_name}, 종류 : ${brand_type}, 전화번호 : ${tel}`);
        return new Response(
            JSON.stringify({
                success : true,
                msg : '등록 성공.! 감사합니다 :)'
            }),{status : 200, headers}
        )
    
    } catch (error) {
        console.error('브랜드 등록 처리 중 Error 발생. ')
        console.error(`브랜드 이름 : ${brand_name}`);
        return new Response(
            JSON.stringify({
                success : false,
                msg : "등록 실패. 관리자에게 연락해주세요 :("
            }), {status : 200, headers}
        )
    }}