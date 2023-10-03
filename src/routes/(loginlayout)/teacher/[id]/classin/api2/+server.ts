import db, { type classinformation } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody);
        const [D, B, S, E, C] = requestBody;
        const result = await db.collection<classinformation>('classinformation').insertOne(
            {
                classcode: C,
                date: D,
                book: B,
                stime: S,
                etime: E
                }
        );
        console.log('Insert result:', result);

        return new Response('classinformation added successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
}