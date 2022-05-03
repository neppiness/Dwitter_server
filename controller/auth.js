import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authDB from '../data/auth.js';
import { config } from '../config.js';

const jwtSecreteKey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

export async function signUp(req, res, next) {
    const {username, password, name, email, url} = req.body;

    let foundAccount = await authDB.findByUsername(username);
    if (foundAccount) {
        return res.status(409)
            .json({ message: 'Duplicated username'});
    };

    const hashedPw = await bcrypt.hash(password, bcryptSaltRounds);

    let enrolledAccount = {username, password: hashedPw, name, email, url};
    let id = await authDB.createUser(enrolledAccount);
    let token = createJwtToken(id);
    let resData = {token, username};
    res.status(201).json(resData);
};

export async function login(req, res, next) {
    const {username, password} = req.body;

    const foundAccount = await authDB.findByUsername(username);

    if (!foundAccount) {
        return res.status(401).json({message: 'Invalide user or password'});
    }

    const isValidPassword = await bcrypt.compare(password, foundAccount.password);
    if (!isValidPassword) {
        return res.status(401).json({message: 'Invalid user or password'});
    }

    const token = createJwtToken(foundAccount.id);
    res.status(200).json({token, username});
};

function createJwtToken(id) {
    return jwt.sign({id}, jwtSecreteKey, {expiresIn: jwtExpiresInDays});
}

export async function me(req, res, next) {
    const user = await authDB.findById(req.userId);
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({token: req.token, username: user.username});
};