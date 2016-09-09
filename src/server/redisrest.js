/**
 *
 * redisrest.js
 * phil.estival@free.fr
 * $Date$:2016/09/09 14:01:20 $
 *
 * Redis REST store
 *
 * GET locahost/key/buddy  : get key 'buddy'
 * POST locahost/key/buddy/donkeykong  : set key 'buddy' as 'donkeykong'
 *
 */

import log from './log'
import {Empty} from './nem'

export class RedisRest {
	constructor(app, redis, options) {
		this.app = app;
		this.redis = redis
		this.options = Object.assign({
			urlPrefix: '/',
			requestPrehandler: function (req, res, next) {
				next();
			}
		}, options || {});
		this.registerRoutes();
	}

	registerRoutes() {
		this.app.all(this.options.urlPrefix + ':key', this.options.requestPrehandler, this.key());
		this.app.get(this.options.urlPrefix + ':key', this.options.requestPrehandler, this.get());
		this.app.all(this.options.urlPrefix + ':key/:value', this.options.requestPrehandler, this.key());
		this.app.post(this.options.urlPrefix + ':key/:value', this.options.requestPrehandler, this.set());
		//this.app.delete(this.options.urlPrefix + ':id', this.options.requestPrehandler, this.delete());
	}

	/**
	 * All entities rest functions have to go through this first.
	 */
	key() {
		return (req, res, next) => {
			req.key = req.params.key /*this.getResource(req.params.key)*/
			req.value = req.params.value
			return next()
		}
	}

	/**
	 * Renders a view with the list of all docs.
	 */
	get () {
		return (req, res, next) => {
			if(!req.key) { next(); return }
			this.redis.get(req.key, (err, reply)=>{
				if(err) throw err
        else {
					if(reply && !Empty(reply) )
						res.send(reply)
					else
						res.status(400).send('(no record)')
				}
			});
		}
	}

	set () {
		return (req, res, next) => {
			if(!req.key || !req.value) { next(); return }
			this.redis.set(req.key, req.value, (err, reply)=>{
				if(err) throw err
				else
					res.send(reply)
			});
		}
	}
}

module.exports = RedisRest