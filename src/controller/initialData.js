const Category = require("../model/category");
const Product = require("../model/product");

exports.initialData = async (req, res) => {

    const categories = await Category.find()
    const products = await Product.find()
    res.status(200).json({
        categories,
        products
    })
}