/**
 * schema.js
 * phil.estival@free.fr
 * $Date$:2016/09/09 14:01:20 $ 
 *
 * schema definition
 * ported to ES6 from dialoguea v1.2
 *
 */
// warning : read carefully the docs, as without exclicitly specifying collection name,
// mongoose is now context aware when creating the collection as a plural of the model name
// http://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name

var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,
	log = require ('../log');


// Schema definition goes here
var GameData = exports.GameData = new Schema({
			value: {type: String, required: false}
	}, { collection: 'gamedata' })


function setFieldsRequiredByDefautlt(schema) {
	var schs;
	if (!schema.length)
		schs = [schema]
	else schs = schema;

	schs.forEach(schema => {
		var attr
		var keys = Object.keys(schema.paths);
		keys.forEach( k => {
			attr = schema.paths[k]
			if (attr.isRequired == undefined && attr.instance != 'Array') {
				attr.required(true);
			}
		})
	})
}

var collections = [ GameData ]

setFieldsRequiredByDefautlt(collections);

collections.forEach(function(schema) {
	schema.add({ creation_date: Date, required:false })
	schema.add({ updated_date: Date, required:false })
})

function setCreateOrUpdateDate(next) {
	if(this.isNew)
		this.creation_date = Date.now()
	else {
		this.updated_date = Date.now()
	}
	next()
}

collections.forEach((c) => {
	c.pre('save', setCreateOrUpdateDate)
})

