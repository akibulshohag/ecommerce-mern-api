const Category = require("../model/category");
const Product = require("../model/product");
const slugify = require("slugify");
const multer = require('multer');



exports.addProduct = async (req, res) => {
    try {
        const { title, regularPrice, description, category, quantity } = req.body;
        let images = [];

        if (req.files.length > 0) {
            images = req.files.map((file) => {
                console.log('file====',file);
                return { img: file.filename };
            });
        }

        console.log('images===', images);

        const product = new Product({
            title,
            slug: slugify(title),
            regularPrice,
            quantity,
            description,
            images,
            category,
            createdBy: req.user.id,
        });
        const prod = await product.save()
        res.status(200).json({
            product: prod,
            message: 'Product added successfully'
        })
    } catch (err) {
        console.log('error===', err)
    }

};

exports.getAllProduct = async (req, res, next) => {
    try {
        let allProduct = await Product.find()
        .populate('category')
        .populate('createdBy')
        res.status(200).json({
            products: allProduct,
        })
    } catch (err) {
        console.log('error===', err)
    }
}

