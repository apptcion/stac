import mongoose from 'mongoose'

const DATABASE_URL = process.env.DATABASE_URL;

if(!DATABASE_URL){
    throw new Error(
        "Fail connect to DATABASE"
    )
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn : null, promise : null};
}

async function dbConnect(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        };

        cached.promise = await mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn
}

export default dbConnect
