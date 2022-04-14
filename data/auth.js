// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// TODO: Make it secure!
// Cause it's not good to have the confidential info. on server side.
const bcryptSaltRounds = 12;


// Hashing PW
const hashedPw = await bcrypt.hash("67890", bcryptSaltRounds);

export const accounts = [
    {
        "id": Date.now().toString(),
        "username": "711jh",
        "password": hashedPw,
        "name": "JaeHyun",
        "email": "711jh@hanmail.com",
        "url": ""
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
    return accounts.find((account) => account.username === username);
}

export async function findById(id) {
    return accounts.find((account) => account.id === id);
}

export async function createUser(account) {
    const created = {...account, id: Date.now().toString() };
    accounts.push(created);
    return created.id;
}