import formidable from 'formidable';
import path from 'path';
import { NextResponse } from 'next/server';

// export const config = {
//   api: {
//     bodyParser: false, // Next.js에서 bodyParser를 비활성화합니다.
//   },
// };

export async function POST(req, res) {
  try {
    
    return new Promise((resolve, reject) => {33
      const form = formidable({
        uploadDir: path.join(process.cwd(), '/public/imgs'),
        keepExtensions: true,
        multiples: false,
      });
  
      console.log(path.join(process.cwd(),))
  
      // req 객체를 IncomingMessage로 변환
      console.log(req.headers)
      console.log(req.body)
      console.log('req._headers : ', req._headers)
      const reqStream = req.body;
      reqStream.content_length = rep._headers.content_length;
  
      form.parse(reqStream, (err, fields, files) => {
        if (err) {
          console.error("파일 파싱 중 오류 발생", err);
          reject(NextResponse.json({ data: { msg: '파일 파싱 중 오류 발생' } }, { status: 500 }));
          return;
        }
  
        const file = files.file;
        const filePath = file.filepath;
        const product_name = fields.product_name;
        const price = fields.price;
        const brand = fields.brand;
        const img = file;
        const category = fields.category;
  
        console.log(img);
  
        console.log('파일이 업로드되었습니다:', filePath);
  
        resolve(
          NextResponse.json({
            data: {
              msg: '성공',
            },
          })
        );
      });
    });
  } catch (error) {
    return NextResponse.json({
      data : `error, ${error}`
    })
  }
}