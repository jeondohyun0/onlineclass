import db, { type classplus, type classinformation, type homework, type chatting } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); 
        const C = requestBody
        const resulta = await db.collection<classplus>('classplus').deleteMany(
            { classcode: C }
        );
        const resultb = await db.collection<classinformation>('classinformation').deleteMany(
            { classcode: C }
        );
        const resultc = await db.collection<homework>('homework').deleteMany(
            { classcode: C }
        );
        const resultd = await db.collection<chatting>('chatting').deleteMany(
            { classcode: C }
        );
        console.log('Delete result:', resulta, resultb, resultc, resultd);

        return new Response('Homework deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
};
