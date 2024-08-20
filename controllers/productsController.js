const { Products } = require('../models'); // Importa el modelo Products de Sequelize
const ErrorResponse = require('../utils/errorResponse');


exports.createProduct = async (req, res, next) => {
  try {
    const { code, description } = req.body;
    const existingProduct = await Products.findOne({ where: { code_product: code } });
    if (existingProduct) {
      return next(new ErrorResponse('Product code already exists', 400));
    }
    
    await Products.create({ code_product:code, description_product: description });
    res.status(201).json({ message: 'Product registered successfully' });
  } catch (err) {

    console.log(err)
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const productData = await Products.findAll();
    return res.status(200).json({ success: true, data: productData });
  } catch (err) {
    next(err);
  }
};

