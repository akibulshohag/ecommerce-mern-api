const Category = require("../model/category");
const Product = require("../model/product");

function customizeCategoryList(categories, parentId = null) {
    const customCategoryList = []
    let categoryList; 
    if (parentId == null) {
        categoryList = categories?.filter(element => element?.parentId == undefined)
    } else {
        categoryList = categories?.filter(element => element?.parentId == parentId)
    }

    for (let cat of categoryList) {
        customCategoryList.push({
            _id: cat?._id,
            name: cat?.name,
            slug: cat?.slug,
            parentId: cat?.parentId,
            children: customizeCategoryList(categories, cat?._id)
        })
    }

    return customCategoryList
}

exports.initialData = async (req, res) => {

    const categories = await Category.find()
    const products = await Product.find()
        .select('_id title regularPrice quantity slug description images category')
        
    res.status(200).json({
        categories: customizeCategoryList(categories),
        products
    })
}