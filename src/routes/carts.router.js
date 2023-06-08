/*
import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

const router = express.Router();

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cid);
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products = cart.products.filter(
      (product) => product.product.toString() !== req.params.pid
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// PUT /api/carts/:cid
router.put('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products = req.body.products;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    const product = cart.products.find(
      (product) => product.product.toString() === req.params.pid
    );
    if (product) {
      product.quantity = req.body.quantity;
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
*/
import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/products.js';

const router = express.Router();

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Realizar operaciones para eliminar el producto del carrito
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Actualizar el carrito completo
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { products } = req.body;

    // Realizar operaciones para actualizar el carrito en la base de datos
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { products },
      { new: true }
    );

    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    // Realizar operaciones para actualizar la cantidad del producto en el carrito
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, 'products.product': productId },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    );

    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Realizar operaciones para eliminar todos los productos del carrito
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true }
    );

    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Obtener un carrito específico y listar los productos completos mediante un "populate"
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Obtener el carrito y realizar el "populate" para obtener los productos completos
    const cart = await Cart.findById(cartId).populate('products.product');

    res.json({ status: 'success', data: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
