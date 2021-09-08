const Category = require("../model/category");
const slugify = require("slugify");



exports.addProduct = (req, res) => {
   res.status(201).json({ "message" : "This is product create api" });
};

exports.getAllProduct = async (req, res, next) => {
    try {
        let allProduct = await Product.find()
        res.status(200).json({
            products: allProduct,
        })
    } catch (err) {
        console.log('error===', err)
    }
}

