import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const Users = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
    }
}, { timestamps: false });

export async function findByUsername(username) {
    return Users.findOne({ where: { username } });
}

export async function findById(id) {
    return Users.findByPk(id);
}

export async function createUser(user) {
    return Users.create(user).then(data => data.dataValues.id);
}