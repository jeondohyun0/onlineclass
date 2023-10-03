import db, { type homework } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); 
        const [R, S, B, F, E, C] = requestBody; 
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
        console.log('Insert result:', result); 

        return new Response('Homework added successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
}