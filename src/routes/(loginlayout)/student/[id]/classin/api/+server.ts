import db, { type classinformation } from '$lib/DB';
import type { RequestHandler } from './$types';

export const POST:RequestHandler = async ({request}) => {
    try {
        const classcode = await request.json();
        const col = db.collection<classinformation>('classinformation');
        const arr = (await col.find({
            classcode:{
                $eq: classcode
            }
        }).toArray()).map(v => ({...v, _id:v._id.toString('hex')}))
        return new Response(JSON.stringify(arr), { headers: {'Content-type':'application/json'}});
    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response('Bad request', { status: 400 });
    }
}