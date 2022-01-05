require("express-async-errors");
const router = require("express").Router();
const Item = require("../models/itemModel");

router.get("/", async (request, response) => {
  const supplies = await Item.find({});
  return response.json(supplies);
});

router.post("/", async (request, response) => {
  const item = new Item(request.body);
  const newItem = await item.save();
  return response.json(newItem);
});

router.put("/:id", async (request, response) => {
  const product = request.body["quantity"] ? {
    name: request.body.name,
    brand: request.body.brand,
    level: request.body.level,
		quantity: request.body.quantity,
  } : {
		name: request.body.name,
    brand: request.body.brand,
    level: request.body.level,
	};

  const updatedProduct = await Item.findByIdAndUpdate(
    request.params.id,
    product,
    { new: true }
  );
  return response.json(updatedProduct);
});

router.delete("/:id", async (request, response) => {
  await Item.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

module.exports = router;