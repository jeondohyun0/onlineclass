import db, { type classinformation } from '$lib/DB';
import type { RequestHandler } from './$types';
import { classcode as Code } from '$lib/store';

export const POST:RequestHandler = async () => {
    const col = db.collection<classinformation>('classinformation')
    const arr = (await col.find({
        classcode:{
            $eq:'209809812'
        }
    }).toArray()).map(v => ({...v, _id:v._id.toString('hex')}))
    return new Response(JSON.stringify(arr), { headers: {'Content-type':'application/json'}});
}