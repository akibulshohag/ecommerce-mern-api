const Cart = require("../model/Cart");

exports.addToCart = async (req, res) => {
    try {
        const { cartItems } = req.body
        const prevCarts = await Cart.findOne({ user: req.user.id })
        if (prevCarts) {


            const isDuplicateProduct = prevCarts.cartItems.find(item => item.product == cartItems.product)
            let condition, update;
            if (isDuplicateProduct) {
                condition = { "user": req.user.id, "cartItems.product": cartItems.product }
                update = {
                    $set: {
                        "cartItems.$": {
                            ...cartItems,
                            quantity: isDuplicateProduct.quantity + cartItems.quantity
                        },
                    }
                },
                {
                    new: true
                }
                const updatedCart = await Cart.findOneAndUpdate(condition, update)
                res.status(201).json({
                    updatedCart,
                    message: 'Cart updated succsessfully'
                })

            } else {
                condition = { user: req.user.id }
                update = {
                    $push: {
                        cartItems: cartItems
                    }
                }

            }

        } else {

            const cart = new Cart({
                user: req.user.id,
                cartItems: [cartItems]
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