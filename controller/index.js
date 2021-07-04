const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

module.exports = {
    //render home page
    home: function (req, res) {
        res.render('pages/index', {
            title: 'Home',
            // get user when login
            user: req.user
        })
    },
    // dashboard
    profile: function (req, res) {
        res.render('pages/profile', {
            title: 'Profile',
            // get user when login
            user: req.user
        })
    },
    // update user info
    updateInfo: function (req, res) {
        const path = req.file.path.replace(/\\/g,'/');
        User.findOneAndUpdate({email: req.body.email}, 
            {
                name: req.body.name,
                location: req.body.location,
                phone: req.body.phone,
                image: path
            }, function (err) {
                if (err) res.json(err);
                else {
                    res.redirect('/profile')
                }
                
            });
    },
    // add to cart
    addToCart: async function (req, res) {
        const productId = req.params.id;
        try {
            // get the correct cart, from db, session or an empty cart
            let userCart;
            if (req.user) {
                userCart = await Cart.findOne({ user: req.user._id});
            }
            let cart;
            if (
                (req.user && !userCart && req.session.cart) ||
                (!req.user && req.session.cart)
            ) {
                cart = await new Cart(req.session.cart);
            } else if (!req.user || !userCart) {
                cart = new Cart({});
            } else {
                cart = userCart;
            }

            // add the product to the cart
            const product = await Product.findById(productId);
            const itemIndex = cart.items.findIndex((p) => p.productId == productId);
            if (itemIndex > -1) {
                // if product exist in cart, update quantity
                cart.items[itemIndex].quantity++;
                cart.items[itemIndex].price = cart.items[itemIndex].quantity * product.price;
                cart.totalQty++;
                cart.totalCost += product.price;
            } else {
                // if product does not exist in cart, find it in the db to retrieve its price and add new item
                cart.items.push({
                    productId: productId,
                    quantity: 1,
                    price: product.price,
                    name: product.name,
                });
                cart.totalQty++;
                cart.totalCost += product.price;
            }

            // if the user is logged in, store the user's id and save cart to db
            if (req.user) {
                cart.user = req.user._id;
                await cart.save();
            }
            req.session.cart = cart;
            req.flash('success_msg', 'Item added to the cart');
            res.redirect(req.headers.referer);
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    // cart contents
    cartContent: async function (req, res) {
        try {
            // find the cart, whether in session or in db based on the user state
            let cartUser;
            if (req.user) {
                cartUser = await Cart.findOne({ user: req.user._id});
            }
            // if user is signed in and has cart, load user's cart
            if (req.user && cartUser) {
                req.session.cart = cartUser;
                return res.render('pages/cart', {
                    cart: cartUser,
                    title: 'Cart',
                    products: await productsFromCart(cartUser),
                });
            }
            // if there is no cart in session and user is not logged in, cart is empty
            if (!req.session.cart) {
                return res.render('pages/cart', {
                    cart: null,
                    title: 'Cart',
                    products: null,
                });
            }
            // load the session' cart
            return res.render('pages/cart', {
                cart: req.session.cart,
                title: 'Cart',
                products: await productsFromCart(req.session.cart),
            });
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    },
    // remove each row
    remove: async function(req, res, next) {
        const productId = req.params.id;
        let cart;
        try {
            if (req.user) {
                cart = await Cart.findOne({ user: req.user._id });
            } else if (req.session.cart) {
                cart = await new Cart (req.session.cart);
            }
            //
            let itemIndex = cart.items.findIndex((p) => p.productId == productId);
            if (itemIndex > -1) {
                // find the prodcut to find it's price
                cart.totalQty -= cart.items[itemIndex].quantity;
                cart.totalCost -= cart.items[itemIndex].price;
                await cart.items.remove({ _id: cart.items[itemIndex]._id });
            }
            req.session.cart = cart;
            // save the cart it only if user is logged in
            if (req.user) {
                await cart.save();
            }
            // delete cart if quantity is 0
            if (cart.totalQty <= 0) {
                req.session.cart = null;
                await Cart.findByIdAndRemove(cart._id);
            }
            res.redirect(req.headers.referer);
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    }
};

// create products array to store the info of each product in the cart
async function productsFromCart(cart) {
    let products = [];
    for (const item of cart.items) {
        let foundProduct = ( await Product.findById(item.productId)).toObject();
        foundProduct['quantity'] = item.quantity;
        foundProduct['totalPrice'] = item.price;
        products.push(foundProduct);
    }
    return products;
}