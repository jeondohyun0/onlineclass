import db, { type chatting } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); 
        const [M, C, T] = requestBody; 
        const result = await db.collection<chatting>('chatting').insertOne(
            {
                classcode: C,
                text: M,
                time: T,
                side: "student"
                
            }
        );
        console.log('Insert result:', result); 

        return new Response('chatting added successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
}