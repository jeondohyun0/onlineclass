import db, { type classinformation } from '$lib/DB';
import type { RequestHandler } from '../api/$types';

import { ObjectId } from 'mongodb';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody); 
        const id = new ObjectId(requestBody); 
        const result = await db.collection<classinformation>('classinformation').deleteOne(
            { _id: id }
        );
        console.log('Delete result:', result);

        return new Response('classinformation deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
};
