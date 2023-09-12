import db, { type classroom } from '$lib/DB';
import type { RequestHandler } from './$types';

export const POST:RequestHandler = async () => {
    const col = db.collection<classroom>('classroom')
    const arr = (await col.find({}).toArray()).map(v => ({...v, _id:v._id.toString('hex')}))
    return new Response(JSON.stringify(arr), { headers: {'Content-type':'application/json'}});
}