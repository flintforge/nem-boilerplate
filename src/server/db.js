/**
 * nemred-boilerplate
 *
 * db.js
 * phil.estival@free.fr
 * $Date$:2016/09/09 14:01:20 $
 *
 * database access methods. ie : mongoose jobs
 *
 * Try to use async whenever the db flow is unconditionnal
 */

import log from './log'
import mongoose from 'mongoose'
import async from 'async'
import schemas from './db/schemas'

mongoose.Promise = require('bluebird');

var DB = {
	GameData : mongoose.model('GameData', schemas.GameData)
}

// returns a promise.
function update(Model, newset) {
	return Model.findByIdAndUpdate(newset._id, {$set:newset}, {new: true} ).exec()
}

module.exports = DB