const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoutes')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const AddToCart = require('./routes/cart')
const initialDataRoutes = require('./routes/initialData')
const path = require('path')
const cors = require('cors')


const app = express()

//environment variable or you can say constants
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

// app.use('/',(req,res)=>{
//     res.json({"Running":"Run"})
// })

app.use('/gh', userRoute)
app.use('/gh', categoryRoutes)
app.use('/gh', productRoutes)
app.use('/gh', AddToCart)
app.use('/gh', initialDataRoutes)




// mongoose.connect('mongodb://localhost/eheartz', {
//     useNewUrlParser: true,
//      useUnifiedTopology: true,
//      useCreateIndex: true
// }, () => {
//     app.listen(3000, () => {
//         console.log('server is running on port 3000')
//         console.log('Database connected!')
//     })
// });

// cluster me cluster0-spwcl.mongodb.net
// clusteer own cluster0.ggon1.mongodb.net
// mongodb://localhost/eheartz
// mongodb+srv://akib:admin@cluster0.emosi.cd.net/eheartz?retryWrites=true&w=majority


mongoose.connect(
    `mongodb://localhost/eheartz`
    )
    .then(()=>{
        app.listen(process.env.PORT||3000)
        console.log('database connected....');
    })
    .catch((err)=>{
        console.log(err)
})