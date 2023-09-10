import { MongoClient, ObjectId, type WithId } from 'mongodb'
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://tintin3492:jdh080821@jdh.yowz4k7.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'Project';

export interface classinformation {
    job: string
    classcode: string
    date: string
    book: string
    time: string
}
export interface homework {
    job: string
    classcode: string
    rdate: string
    sdate: string
    book: string
    range: string
}
export interface classroom {
    email: string
    classcode: string
}


await client.connect();
export default client.db(dbName);
// let arr:WithId<chatting>[] = [];

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection<chatting>('chatting');
//     for await(let i of collection.find({})){
//         arr = [...arr, i];
//     // the following code examples can be pasted here...
//     return 'done.';
// }