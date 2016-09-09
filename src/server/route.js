/**
 *
 * route.js
 * phil.estival@free.fr
 *
 * express routes
 */

import { configuration as settings } from '../settings'
import fs from 'fs'
import log from './log'
import DB from './db'
import traceRequest from './tracerequest'
import MongoRest from './mongorest.js'
import RedisRest from './redisrest.js'
import redis from 'redis'

module.exports = function (app) {

	// for CORS middleware
	// app.use(methodOverride());
	app
			.use((req, res, next)=>{
				traceRequest(req)
				next();
			})
			.use('/*', (req, res, next)=>{
				log.dbg(req.params)
				next()
			})
			.get('/', (req, res, next)=>{
				log.dbg('woot')
				res.send('ok')
			})
			.use((err , req, res, next)=>{
				// this is where the authorized policy should handle jwt tokens, extra headers, viewstates id, etc.
				if (err === 'UnauthorizedError') {
					log.dbg(err)
				}
			})

	function GDprehandler(req,res,next) {
		log.dbg("GD prehandler (acl,etc..)")
		next()
	}

	new MongoRest(app, {urlPrefix: '/api/'})
		.addResource('gd', DB.GameData,{ reqPrehandler:GDprehandler, hide : ['__v']})

	// set acl here if the outer clients aren't allowed to write to the redis store
	var redisclient = redis.createClient(settings.redis.port,settings.redis.host) //creates a new client
	new RedisRest(app, redisclient, {urlPrefix: '/key/'})
}
