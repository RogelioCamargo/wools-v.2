require("express-async-errors");
const router = require("express").Router();
const Message = require("../models/messageModel");

router.get("/", async (request, response) => {	
	let messages; 
	const { type } = request.query;
	if (!type) messages = await Message.find({});
	else messages = await Message.find({ type });
		
  return response.json(messages);
});

router.post("/", async (request, response) => {
	const message = new Message(request.body);
	const newMessage = await message.save();
	return response.json(newMessage);
});

router.put("/:id", async (request, response) => {
	const message = {
		content: request.body.content,
		type: request.body.type,
		level: request.body.level
	};

  const updatedMessage = await Message.findByIdAndUpdate(
    request.params.id,
    message,
    { new: true }
  );
  return response.json(updatedMessage);
});

router.delete("/:id", async (request, response) => {
	await Message.findByIdAndDelete(request.params.id);
	return response.status(204).end();
});

module.exports = router;
