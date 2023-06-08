import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/products.js';

const router = express.Router();

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

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

router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { products } = req.body;

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

router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

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

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    const cart = await Cart.findById(cartId).populate('products.product');

    res.json({ status: 'success', data: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
