// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js'; 

// TODO: Make it secure!
// Cause it's not good to have the confidential info. on server side.
const bcryptSaltRounds = config.bcrypt.saltRounds;

// Hashing PW
const hashedPw = await bcrypt.hash("67890", bcryptSaltRounds);

export const accounts = [
    {
        id: new Date().toString(),
        username: 'bob',
        password: hashedPw,
        name: 'Bob',
        email: 'bob@naver.com',
        url: ''
    }
];

export function checkAccounts(username, password) {
    let matchAccount = accounts.find((account) => {
        if((account.username == username)
        && (account.password == password)) return true;
    });
    return matchAccount != null ? true : false
};

export async function findByUsername(username) {
    return accounts.find((account) => {
        if(account.username === username) {return true};
    });
}

export async function findById(id) {
    return accounts.find((account) => {
        if(account.id === id) {return true;}
    });
}

export async function createUser(account) {
    const created = {...account, id: Date.now().toString() };
    accounts.push(created);
    return created.id;
}