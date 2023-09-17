import db, { type classplus } from '$lib/DB';
import type { RequestHandler } from './$types';

export const POST:RequestHandler = async ({params}) => {
    const col = db.collection<classplus>('classplus')
    const arr = (await col.find({
        temail:{
            $eq:params.id
        }
    }).toArray()).map(v => ({...v, _id:v._id.toString('hex')}))
    return new Response(JSON.stringify(arr), { headers: {'Content-type':'application/json'}});
}