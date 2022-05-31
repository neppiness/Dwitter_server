import { config } from '../config.js';
import Mongoose from 'mongoose';

let db;

export async function connectDB() {
    return Mongoose.connect(config.mongodb.host);
}

export function useVirtualId(schema) {
    // _id -> id
    schema.virtual('id').get(function() {
        return this._id.toString();
    });
    schema.set('toJSON', {virtuals: true});
    schema.set('toObject', {virtuals: true});
}

// TODO(JHKIM): Delete below

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets');
}
