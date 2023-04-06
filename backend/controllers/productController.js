const Product = require("../models/productModel");

//create product --ADMIN

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//GET ALL Product

exports.getAllProducts = async (req, res) => {
  const products = await Product.find(); //gets all products
  res.status(200).json({ success: true, products });
};

//GET PRODUCT DETAILS
exports.getProductDetails = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  //check if product already exists or not
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//Update Product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const options = { new: true, runValidators: true, useFindAndModify: false };

  let product = await Product.findById(id);

  //check if product already exists or not
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(id, update, options); //options returns the update product

  res.status(200).json({
    success: true,
    product,
  });
};

//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product removed successfully",
  });
};
