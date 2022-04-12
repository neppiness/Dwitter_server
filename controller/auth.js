import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authDB from '../data/auth.js';

// TODO: Make it secure!
// Cause it's not good to have the confidential info. on server side.
const jwtSecreteKey = "DPZ&BcfbMJ8gCfyIdlQT5c0miXU7r@iw";
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signUp(req, res, next) {
    const {username, password, name, email, url} = req.body;

    // Have to deal with the duplicated account info
    let foundAccount = await authDB.findByUsername(username);
    if (foundAccount) {
        res.status(409)
            .json({ message: 'Duplicated username'});
    };

    // Hashing PW
    const hashedPw = await bcrypt.hash(password, bcryptSaltRounds);

    // Create Using enrolled account
    let enrolled = {username, password: hashedPw, name, email, url};
    let token = await authDB.createUser(enrolled);
    let resData = { token, username };
    res.status(201).json(resData);
};

export async function login(req, res, next) {
    const { username, password } = req.body;

    const foundAccount = await authDB.findByUsername(username);
    if (!foundAccount) {
        return res.status(401).json({ message: 'Invalide user or password'});
    }

    const isValidPassword = await bcrypt.compare(password, foundAccount.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    console.log(foundAccount.id);
    const token = createJwtToken(foundAccount.id);
    res.status(200).json({ token, username });
};

function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecreteKey, { expiresIn: jwtExpiresInDays});
}

/*
export async function me(req, res, next) {
    const {token, username} = req.body;
    let isTokenValid = authDB.verifyToken(token);

    if (isTokenValid) {
        res.status(200)
    } else {
        res.status(404)
    }
};
*/