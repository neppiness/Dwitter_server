// import { db } from '../db/database.js';

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url '
    + 'FROM tweets as tw JOIN users as us '
    + 'ON tw.userId=us.id ';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function queryingAll() {
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
        .then(result => result[0]);
}

export async function queryingByUsername(username) {
    return db
        .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
        .then(result => result[0]);
}

export async function findTweetsById(id) {
    return db
        .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
        .then(result => result[0][0]);
};

export async function createNew(text, userId) {
    return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)',
        [text, new Date(), userId])
        .then(result => findTweetsById(result[0].insertId));
}

// delete, need to be modified
export async function deleteById(id) {
    return db.execute(`DELETE FROM tweets WHERE tweets.id=?`, [id])
};