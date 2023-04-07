const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create product --ADMIN

// exports.createProduct = async (req, res, next) => {
//   const product = await Product.create(req.body);
//   res.status(201).json({
//     success: true,
//     product,
//   });
// };
//in create product, if an input parameter is missing in the req.body, then it will be an error, so we create a middleware to handle the error called catchAsyncError

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL Product

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find(); //gets all products
  res.status(200).json({ success: true, products });
});

//GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  //check if product already exists or not
  if (!product) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not found",
    // });

    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const update = req.body;
  const options = { new: true, runValidators: true, useFindAndModify: false };

  let product = await Product.findById(id);

  //check if product already exists or not
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(id, update, options); //options returns the update product

  res.status(200).json({
    success: true,
    product,
  });
});

//DELETE PRODUCT
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product removed successfully",
  });
});
