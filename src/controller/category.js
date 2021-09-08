const Category = require("../model/category");
const slugify = require("slugify");

const customizeCategoryList = (categories, parentId = null) =>{
    const customCategoryList = []
    let categoryList;
    if(parentId == null){
        categoryList = categories?.filter(element => element?.parentId == undefined)
    }else{
        categoryList = categories?.filter(element => element?.parentId == parentId)
    }

    for(let cat of categoryList){
        customCategoryList.push({
            _id: cat?._id,
            name: cat?.name,
            slug: cat?.slug,
            children: customizeCategoryList(categories,cat?._id)
        })
    }

    return customCategoryList
}


exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        
    };


    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
            return res.status(201).json({ category });
        }
    });
};

exports.getCategories = async (req, res, next) => {
    try {
        let allCategories = await Category.find()
        let categoryList = customizeCategoryList(allCategories)
        res.status(200).json({
            categories: categoryList,
        })
    } catch (err) {
        console.log('error===', err)
    }
}

// exports.getCategories =(req,res)=>{
//     Category.find()
//     .exec((error, categories)=>{
//         if(error) 
//         return res.status(400).json({ error });

//         if(categories){
//             res.status(200).json({categories});
//         }
//     });
// }