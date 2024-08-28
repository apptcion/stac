import { NextResponse } from 'next/server';
import dbConnect from '../../../db/mongoDB';
import products from '../../../db/products';
import { getChoseong } from 'es-hangul';

export async function GET(req) {
  // 데이터베이스 연결
  await dbConnect();

  // req 객체에서 URL을 생성하고, 쿼리 파라미터를 추출
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');

  // keyword가 없는 경우 예외 처리
  if (!keyword) {
    keyword = ''
  }

  // 초성 추출
  const choseong = getChoseong(keyword);

  // 정규식 생성
  const regexKeyword = new RegExp(keyword, 'i'); // 'i'는 대소문자 구분 없음
  const regexChoseong = choseong ? new RegExp(choseong) : null;

  console.log(keyword);
  console.log(choseong);

  // 쿼리 실행
  let result;
  if (regexChoseong) {
    result = await products.find({
      $or: [
        { product_name: { $regex: regexKeyword } },
        { brand: { $regex: regexKeyword } },
        { category: { $regex: regexKeyword } },
        { choseong: { $regex: regexChoseong } },
      ],
    });
  } else {
    result = await products.find({
      $or: [
        { product_name: { $regex: regexKeyword } },
        { brand: { $regex: regexKeyword } },
        { category: { $regex: regexKeyword } },
      ],
    });
  }

  console.log(result);

  // 결과 반환
  return NextResponse.json({
    data: {
      result,
    },
  });
}