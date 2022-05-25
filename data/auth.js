import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function findByUsername(username) {
    return getUsers()
    .findOne({username})
    .then(mapOptionalUser);
}

export async function findById(id) {
    return getUsers()
    .findOne({_id: new ObjectId(id)})
    .then(mapOptionalUser);
}

export async function createUser(user) {
    return getUsers()
    .insertOne(user)
    .then(data => {
        return data.insertedId.toString();
    })
}

function mapOptionalUser(user) {
    return user ? {...user, id: user._id} : user;
}