import db, { type homework } from '$lib/DB';
import type { RequestHandler } from './$types';

export const POST:RequestHandler = async ({request}) => {
    try {
        const classcode = await request.json();
        const col = db.collection<homework>('homework');
        const arr = (await col.find({
            classcode:{
                $eq: classcode
            }
        }).toArray())
        return new Response(JSON.stringify(arr), { headers: {'Content-type':'application/json'}});
    } catch (error) {
        console.error('Error parsing request body:', error);

        return new Response('Bad request', { status: 400 });
    }
}