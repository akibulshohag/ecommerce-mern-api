const Category = require('../model/Category')

async function slugify(slug) {
    const makeSlug = (Text) => {
      return Text?.toString()?.toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/['"<>@+?.,\/#!$%\^&\*;:{}=\_`~()©®℗™℃℉§‡⁑⁂‰⁈‱⁒⁍⁌ª⁊^µ♪※¸¶±é½″]/g, '-')
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
    slug = makeSlug(slug)
    const newSlug = slug
    return newSlug
  }

exports.categoryCreateController = async (req, res, next) => {
    try {
        let { title } = req.body
        let categoryObject = {
            title: title,
            slug: await slugify(title)
        }
        if(req?.body?.parentCategoryId){
            categoryObject.parentCategoryId = req?.body?.parentCategoryId
        }



        // From Video>>>>>>>>>>>>

        // let cat = new Category(categoryObject);
        // cat.save((error, category) => {
        //   if (error) return res.status(400).json({ error });
        //   if (category) {
        //     return res.status(201).json({ category });
        //   }
        // });
     


        let catObj = new Category(categoryObject);
        let category = await catObj.save()
        console.log('category===',category);
        if (category) {
            console.log('category===',category);
            res.status(200).json({
                ...category,
                success: "Category Created Successfully"
            })
        } else {
            res.status(400).json({
                error: "Can not save"
            })
        }

    } catch (err) {
        console.log('error===', err)
    }
}

// exports.userLogin = async (req, res, next) => {
//     try {
//         let { email, password } = req.body
//         let user = await User.findOne({ email })
//         if (user) {
//             const { _id, firstName, lastName, email, role, fullName } = user;
//             let isvalidPassword = user.authinticate(password)
//             if (isvalidPassword) {
//                 let token = jwt.sign({
//                     id: user._id,
//                     role: user.role
//                 },
//                     process.env.SECRET_KEY,
//                     {
//                         expiresIn: '12h'
//                     })
//                 res.status(200).json({
//                     access_token: token,
//                     success: "Login successfully",
//                     firstName,
//                     lastName,
//                     email,
//                     role,
//                     fullName,
//                     id: _id
//                 })
//             } else {
//                 res.status(401).json({
//                     message: "Authintication failed"
//                 })
//             }
//         } else {
//             res.status(401).json({
//                 message: "Authintication failed"
//             })
//         }
//     } catch (err) {
//         console.log('error===', err)
//     }
// }

// exports.getAllUser = async (req, res, next) => {
//     try {
//         let allUser = await User.find()
//         res.status(200).json({
//             data: allUser,
//         })
//     } catch (err) {
//         console.log('error===', err)
//     }
// }


// ///// Admin Controller /////

// exports.adminSignup = async (req, res, next) => {
//     try {
//         let { firstName, lastName, email, password } = req.body
//         let user = await User.findOne({ email })
//         if (user) {
//             res.status(400).json({
//                 error: "Email already exit"
//             })
//         } else {
//             let user = new User({
//                 firstName,
//                 lastName,
//                 userName: Math.random().toString(),
//                 email,
//                 password,
//                 role: "admin"
//             })
//             console.log('err',user)
//             let result = await user.save()
//             res.status(200).json({
//                 data: result,
//                 success: "Admin singup successfully"
//             })
//         }

//     } catch (err) {
//         console.log('error===', err)
//     }
// }

// exports.adminLogin = async (req, res, next) => {
//     try {
//         let { email, password } = req.body
//         let user = await User.findOne({ email })
//         if (user) {
//             const { _id, firstName, lastName, email, role, fullName } = user;
//             let isvalidPassword = user.authinticate(password)
//             if (isvalidPassword) {
//                 let token = jwt.sign({
//                     id: user._id
//                 },
//                     process.env.SECRET_KEY,
//                     {
//                         expiresIn: '12h'
//                     })
//                 res.status(200).json({
//                     access_token: token,
//                     success: "Login successfully",
//                     firstName,
//                     lastName,
//                     email,
//                     role,
//                     fullName,
//                     id: _id
//                 })
//             } else {
//                 res.status(401).json({
//                     message: "Authintication failed"
//                 })
//             }
//         } else {
//             res.status(401).json({
//                 message: "Authintication failed"
//             })
//         }
//     } catch (err) {
//         console.log('error===', err)
//     }
// }
