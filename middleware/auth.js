import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import * as authDB from '../data/auth.js'

import { config } from '../config.js';

const jwtSecretKey = config.jwt.secretKey;

export async function isAuth(req, res, next) {
    const AUTH_ERROR = {message: 'Authentication Error'};
    const authHeader = req.get('Authorization');

    if(!authHeader) {return res.status(401).json(AUTH_ERROR);}

    const dividedAuthHeader = authHeader.split(' ');
    const authDirectives = dividedAuthHeader[0];
    const token = dividedAuthHeader[1];

    if(authDirectives != 'Bearer') {return res.status(401).json(AUTH_ERROR)};

    jwt.verify(
        token, jwtSecretKey,
        async (err, decoded) => {
            if(err) {
                return res.status(401).json(AUTH_ERROR);
            }
            const account = await authDB.findById(decoded.id);

            if(!account) {
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = account.id;
            req.username = account.username;
            
            next();
        }
    )
};