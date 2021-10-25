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
                console.log('file====', file);
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

exports.getProductsBySlug = async (req, res,) => {
    try {
        const { slug } = req.params;
        let category = await Category.findOne({ slug: slug })
            .select('_id')
        if (category) {
            let products = await Product.find({ category: category._id })
            if (products.length > 0) {
                res.status(200).json({
                    products,
                    productsByPrice: {
                        under10k: products.filter(product => product.regularPrice <= 10000),
                        under15k: products.filter(product => product.regularPrice > 10000 && product.regularPrice <= 15000),
                        under25k: products.filter(product => product.regularPrice > 15000 && product.regularPrice <= 25000),
                        under35k: products.filter(product => product.regularPrice > 25000 && product.regularPrice <= 35000),
                        under60k: products.filter(product => product.regularPrice > 35000 && product.regularPrice <= 60000)
                    }
                })
            }

        }

    }
    catch (err) {
        console.log('error===', err);
    }
}

