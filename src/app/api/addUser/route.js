import dbConnect from '../../../db/mongoDB'
import users from '../../../db/user'

await dbConnect()

export async function POST(req, res){

    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',  // 모든 도메인에서 접근 허용
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
   
    const data = await req.json();
    const {username, tel, sendMail, personal} = data;

    try{
        let exist = await users.find({tel})
        if(exist){
            return new Response(
                JSON.stringify({
                    success : false
                }), {status : 500, headers}
            )
        }else{

            await users.create({
                username,
                tel,
                sendMail,
                personal
            })

            return new Response(
                JSON.stringify({
                    success : true
                }), {status : 200, headers}
            )
        }
    }catch(except){
        return new Response(
            JSON.stringify({
                success : false
            }), {status : 500, headers}
        )
    }

}