import db, { type classplus } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); 
        const C = requestBody
        const result = await db.collection<classplus>('classplus').deleteOne(
            { classcode: C }
        );
        console.log('Delete result:', result);

        return new Response('Homework deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
};
