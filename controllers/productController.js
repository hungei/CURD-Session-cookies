const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.home = async (req,res) => {
  const suppliers = await Supplier.find();
  const q = req.query.q || '';
  const supplier = req.query.supplier || '';
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (supplier) filter.supplierId = supplier;
  const products = await Product.find(filter).populate('supplierId');
  res.render('index', { products, suppliers, q, supplier });
};

exports.index = async (req,res) => {
  const products = await Product.find().populate('supplierId');
  res.render('products/index', { products });
};

exports.form = async (req,res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { product: {}, suppliers });
};

exports.create = async (req,res) => {
  await Product.create(req.body);
  res.redirect('/products');
};

exports.editForm = async (req,res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
};

exports.update = async (req,res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
};

exports.delete = async (req,res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
