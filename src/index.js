/**
 * index.js
 * phil.estival@free.fr
 * $Date$:2016/09/09 14:38:03 $
 *
 * express server
 */

import log from './server/log'
import { configuration as settings } from './settings'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import redis from 'redis'
import pack from '../package.json'
import db from './server/db'
import route from './server/route'

log.info("" + pack.name+ " v" + pack.version + " starts ("+process.pid+") █");

process.on('uncaughtException', function (err) {
    log.error(err.stack)
    process.exit(1)
})

let app = express()
    .use(bodyParser.json())
		.set('port',settings.PORT)

var server = require('http').createServer(app);

route(app);

mongoose.connect(settings.MONGO + settings.DB)
mongoose.connection.once('open', function callback() { log.dbg("DB "+settings.DB+" ready"); });
mongoose.connection.on('error', function (e) {log.error('Mongoose connection error', e);});

app.set('view engine', 'html');
app.set('view cache', false);

server.listen(app.get('port'), function(e) {
	log.info("http://"+settings.SERVER+":"+settings.PORT,"  ",server.address())
})
