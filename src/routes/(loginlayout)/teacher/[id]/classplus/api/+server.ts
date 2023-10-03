import db, { type classplus } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); 
        const [n, e, co] = requestBody; 


        const existingClass = await db.collection<classplus>('classplus').findOne({ classcode: co });
        if (existingClass) {
            return new Response('This class code already exists', { status: 400 });
        }

        const result = await db.collection<classplus>('classplus').insertOne(
            {
                classcode: co,
                temail: e,
                tname: n,
            }
        );

        console.log('Insert result:', result); 

        return new Response('Class added successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
}
