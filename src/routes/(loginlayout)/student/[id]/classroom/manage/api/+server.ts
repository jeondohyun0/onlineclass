import db, { type homework } from '$lib/DB';
import type { RequestHandler } from './$types';


export const POST:RequestHandler = async (request) => {
    try {
        const col = db.collection<homework>('homework');
        const arr = (await col.find({
            classcode:{
                $eq: '123123123'
            }
        }).toArray()).map(v => ({...v, _id:v._id.toString('hex')}))
        return new Response(JSON.stringify(arr), { headers: {'Content-type':'application/json'}});
    } catch (error) {
        console.error('Error parsing request body:', error);
        // Return a response with a 400 status code to indicate a bad request
        return new Response('Bad request', { status: 400 });
    }
}