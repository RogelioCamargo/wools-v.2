const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	level: {
		type: Number,
		required: true,
		enum: [0, 1, 2],
		default: 2
	},
	brand: String,
	type: String, 
	url: String,
	sku: String,
	quantity: Number
	// instructions: [String],
	// supplies: [String],
}, {
	timestamps: true
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
		returnedObject.date = DateTime.fromJSDate(
      returnedObject.updatedAt
    ).toLocaleString(DateTime.DATETIME_MED);
    delete returnedObject._id;
    delete returnedObject.__v;
		delete returnedObject.createdAt;
		delete returnedObject.updatedAt;
  },
});

module.exports = mongoose.model("Product", productSchema);