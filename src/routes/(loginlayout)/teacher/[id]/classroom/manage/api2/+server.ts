import db, { type homework } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); // 요청 본문 로그 출력
        const [R, S, B, F, E, C] = requestBody; // 배열로 데이터 받아오기
        const result = await db.collection<homework>('homework').insertOne(
            {
                classcode: C,
                sdate: R,
                edate: S,
                book: B,
                srange: F,
                erange: E
            }
        );
        console.log('Insert result:', result); // insertOne 결과 로그 출력

        return new Response('Homework added successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);
        // Return a response with a 400 status code to indicate a bad request
        return new Response('Bad request', { status: 400 });
    }
}