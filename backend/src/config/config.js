require('dotenv').config({ path: '../.env' });;
const config = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 5432,
		dialect: process.env.DB_DIALECT || 'postgres',
		dialectOptions: {},
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 5432,
		dialect: process.env.DB_DIALECT || 'postgres',
		dialectOptions: {},
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 5432,
		dialect: process.env.DB_DIALECT || 'postgres',
		dialectOptions: {},
	},
};

module.exports = config;