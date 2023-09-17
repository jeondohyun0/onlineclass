import type { PageServerLoad } from './$types';
import db, { type classplus } from '$lib/DB';
import { user } from '$lib/store';
export const load:PageServerLoad = async ({params}) => {
    const col = db.collection<classplus>('classplus')
    const arr = (await col.find({
        semail:{
            $eq:params.id
        }
    }).toArray()).map(v => ({ ...v, _id: v._id.toString('hex') }))
    return {
        student:arr
    };
}