import db, { type homework } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); // 요청 본문 로그 출력
        const id = new ObjectId(requestBody); // ID 받아오기 및 ObjectId로 변환
        const result = await db.collection<homework>('homework').deleteOne(
            { _id: id }
        );
        console.log('Delete result:', result); // deleteOne 결과 로그 출력

        return new Response('Homework deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);
        // Return a response with a 400 status code to indicate a bad request
        return new Response('Bad request', { status: 400 });
    }
};
