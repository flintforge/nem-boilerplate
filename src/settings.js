/**
 * CONFIGURATION FILE
 */

var upload_dir = 'data/';

export const configuration = {
	SERVER: "localhost",
	PROTOCOL: "http://",
	PORT: 2100,
	DEBUG: true,
	LOG_FILE:'./logs/server.log',
	LOG_LEVEL:'debug',
	MONGO:'mongodb://localhost/',
	DB: 'gamedata',
	redis: {
		host:"127.0.0.1",
		port:"6379"
	}
}
