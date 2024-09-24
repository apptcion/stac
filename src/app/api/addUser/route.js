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
        if(exist.length != 0){
            console.log("사용자등록이 거부됨. 사유 - 존재하는 사용자 : ");
            console.log(`Exist : ${exist}`)
            console.log(`Tried : 이름 : ${username} 전화 : ${tel} 이메일 수신 동의 : ${sendMail} 개인정보처리 : ${personal}`)
            return new Response(
                JSON.stringify({
                    success : false,
                    msg : '존재하는 사용자입니다.'
                }), {status : 200, headers}
            )
        }else{
            await users.create({
                username,
                tel,
                sendMail,
                personal
            })
            
            console.log(`새 사용자 등록됨.`)
            console.log(`이름 : ${username} 전화 : ${tel} 이메일 수신 동의 : ${sendMail} 개인정보처리 : ${personal}`)
            return new Response(
                JSON.stringify({
                    success : true,
                    msg : '사용자 등록에 성공하였습니다.'
                }), {status : 200, headers}
            )
        }
    }catch(except){
        console.error("사용자 등록 처리중 에러 발생")
        console.log(`이름 : ${username} 전화 : ${tel} 이메일 수신 동의 : ${sendMail} 개인정보처리 : ${personal}`)
        return new Response(
            JSON.stringify({
                success : false,
                msg : '사용자 등록에 실패했습니다. 관리자에게 문의해주세요 :('
            }), {status : 200, headers}
        )
    }

}