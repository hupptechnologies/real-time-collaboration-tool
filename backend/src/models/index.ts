import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import process from 'node:process';
import config from '../config/config';
import { TConfigEnvironments } from '../interface';
const env = (process.env.NODE_ENV as TConfigEnvironments) || 'development';
const dbConfig = config[env];
const dialect = (dbConfig.dialect as Dialect) || 'postgres';

const sequelize = new Sequelize({
	host: dbConfig.host,
	database: dbConfig.database,
	dialect: dialect,
	username: dbConfig.username,
	password: dbConfig.password,
	port: dbConfig.port,
	repositoryMode: true,
	models: [__dirname + '/*.model.*'],
	dialectOptions: dbConfig?.dialectOptions || {},
});

export const models = sequelize.models;
export default sequelize;
