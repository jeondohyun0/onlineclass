import { MongoClient, ObjectId, type WithId } from 'mongodb'
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://tintin3492:jdh080821@jdh.yowz4k7.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'Project';

export interface classinformation {
    _id?: any
    classcode: string
    date: string
    book: string
    stime: string
    etime: string
}
export interface homework {
    _id?: any
    classcode: string
    sdate: string
    edate: string
    book: string
    srange: string
    erange:string
}
export interface classplus {
    classcode: string
    temail: string
    semail?: string
    tname: string
    sname?: string
}

await client.connect();
export default client.db(dbName);