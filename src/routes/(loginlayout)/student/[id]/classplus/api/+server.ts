import db, { type classplus } from '$lib/DB';
import type { RequestHandler } from '../api/$types'; export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); // 요청 본문 로그 출력
        const [n, e, co] = requestBody; // 배열로 데이터 받아오기

        // classcode가 이미 존재하는지 확인
        const existingClass = await db.collection<classplus>('classplus').findOne({ classcode: co });
        if (!existingClass) {
            return new Response('No such class code exists', { status: 404 });
        }

        // Check if a student is already enrolled in the class
        if (existingClass.semail || existingClass.sname) {
            return new Response('The classroom is already full', { status: 409 });
        }

        // update the document
        const result = await db.collection<classplus>('classplus').updateOne(
            { classcode: co },
            {
                $set: {
                    semail: e,
                    sname: n,
                }
            }
        );

        console.log('Update result:', result); // updateOne 결과 로그 출력

        return new Response('Class updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        // Return a response with a 400 status code to indicate a bad request
        return new Response('Bad request', { status: 400 });
    }
}
