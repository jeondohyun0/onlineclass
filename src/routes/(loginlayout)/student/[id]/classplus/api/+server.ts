import db, { type classplus } from '$lib/DB';
import type { RequestHandler } from '../api/$types'; export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestBody = await request.json();
        console.log('Request body:', requestBody);
        const [n, e, co] = requestBody;

        // classcode가 이미 존재하는지 확인
        const existingClass = await db.collection<classplus>('classplus').findOne({ classcode: co });
        if (!existingClass) {
            return new Response('No such class code exists', { status: 404 });
        }

        if (existingClass.semail || existingClass.sname) {
            return new Response('The classroom is already full', { status: 409 });
        }


        const result = await db.collection<classplus>('classplus').updateOne(
            { classcode: co },
            {
                $set: {
                    semail: e,
                    sname: n,
                }
            }
        );

        console.log('Update result:', result);

        return new Response('Class updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);


        return new Response('Bad request', { status: 400 });
    }
}
