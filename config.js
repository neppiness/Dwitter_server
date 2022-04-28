import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: required('JWT_EXPIRES_SEC')
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS'))
    },
    host: {
        port: required('HOST_PORT', 8080)
    },
    db: {
        host: required('DATABASE_HOST'),
        user: required('DATABASE_USER'),
        name: required('DATABASE_NAME'),
        PW: required('DATABASE_PW')
    }
};