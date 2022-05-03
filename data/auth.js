import {db} from '../db/database.js';
import bcrypt from 'bcrypt';
import { config } from '../config.js'; 

const bcryptSaltRounds = config.bcrypt.saltRounds;
const hashedPw = await bcrypt.hash("67890", bcryptSaltRounds);

/*
// dummy accounts
export const accounts = [
    {
        id: '1',
        username: 'bob',
        password: hashedPw,
        name: 'Bob',
        email: 'bob@naver.com',
    },
    {
        id: '2',
        username: 'neppy',
        password: hashedPw,
        name: 'Nepppiness',
        email: '0414kjh@naver.com',
    }
];

export function checkAccounts(username, password) {
    let matchAccount = accounts.find((account) => {
        if((account.username == username)
        && (account.password == password)) return true;
    });
    return matchAccount != null ? true : false
};
*/

export async function findByUsername(username) {
    return db.execute('SELECT * FROM users WHERE username=?',[username])
    .then(result => {
        return result[0][0];
    });
}

export async function findById(id) {
    return db.execute('SELECT * FROM users WHERE id=?',[id])
    .then(result => {
        return result[0][0];
    });
}

export async function createUser(user) {
    const {username, password, name, email, url} = user;
    return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
        [username, password, name, email, url]
    ).then((result) => result[0].insertId);
}