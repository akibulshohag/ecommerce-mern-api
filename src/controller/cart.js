const Cart = require("../model/Cart");

exports.addToCart = async (req, res) => {
    try {
        const { cartItems } = req.body
        const prevCarts = await Cart.findOne({ user: req.user.id })
        if (prevCarts) {
           

            const isDuplicateProduct = prevCarts.cartItems.find(item => item.product == cartItems.product)

            if (isDuplicateProduct) {

                const updatedCart = await Cart.findOneAndUpdate(
                    { "user": req.user.id ,"cartItems.product":cartItems.product },
                    {
                        $set: {
                            "cartItems.$": {
                                ...cartItems,
                                quantity: isDuplicateProduct.quantity + cartItems.quantity
                            },
                        }
                    },
                    {
                        new: true
                    })
                res.status(201).json({
                    updatedCart,
                    message: 'Cart updated succsessfully'
                })
            } else {
                const updatedCart = await Cart.findOneAndUpdate({ user: req.user.id }, {
                    $push: {
                        cartItems: cartItems
                    }
                })
                res.status(201).json({
                    updatedCart,
                    message: 'Cart updated succsessfully'
                })
            }

        } else {

            const cart = new Cart({
                user: req.user.id,
                cartItems:[cartItems]
            })
            const cartList = await cart.save()

            res.status(201).json({
                cartList,
                message: 'Add to cart succsessfully'
            })
        }


    } catch (err) {
        console.log('error===', err)

    }

}