require("express-async-errors");
const router = require("express").Router();
const Product = require("../models/productModel");

router.get("/", async (request, response) => {
  const products = await Product.find({});
  return response.json(products);
});

router.post("/", async (request, response) => {
  const product = new Product(request.body);
  const newProduct = await product.save();
  return response.json(newProduct);
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

  const updatedProduct = await Product.findByIdAndUpdate(
    request.params.id, 
    product, 
    { new: true }
  );
  return response.json(updatedProduct);
});

router.delete("/:id", async (request, response) => {
  await Product.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

module.exports = router;
