import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Users } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweets = sequelize.define('Tweets', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, { timestamps: true, })

const INCLUDE_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url'],
    ], include: {
        model: Users,
        attributes: [],
    },
}

const ORDER_CREATEDAT = {
    order: [['createdAt', 'DESC']],
}

Tweets.belongsTo(Users);

export async function queryingAll() {
    return Tweets.findAll({
        ...INCLUDE_USER,
        ...ORDER_CREATEDAT,
    }).then((data) => {
        console.log(data);
        return data;
    })
}

export async function createNew(text, userId) {
    return Tweets.create({text, userId}).then((data) => {
        console.log(data);
        return data;
    });
}

export async function findById(id) {
    return Tweets.findByPk(id).then((data) => {
        return data;
    });
}