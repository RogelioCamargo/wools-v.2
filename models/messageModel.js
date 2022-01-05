const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const messageSchema = new Schema(
  {
    // announcement, reminder, ticket
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
    },
    level: {
      type: Number,
      required: true,
      enum: [0, 1, 2],
      default: 2,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.set("toJSON", {
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

module.exports = mongoose.model("Message", messageSchema);