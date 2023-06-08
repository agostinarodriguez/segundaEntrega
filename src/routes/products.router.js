import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/products.js';

const router = express.Router();


//obtener productos
router.get('/', async (req, res) => {
  try{
    const products = await Product.find();
    res.json({ status: 'success', data:products });
console.log('Products:', products);

  }catch(error){
    res.status(500).json({ status: 'error', error: error.message });
  }
});


//crear producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, tipo, disponibilidad } = req.body

    const newProduct = await Product.create({
      nombre,
      precio,
      tipo,
      disponibilidad,
    })

    res.status(201).json({ status: 'success', data: newProduct });
  } catch(error) {
    res.status(500).json({status: 'error', error: error.message});
  }
})

router.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      //eliminar producto
      await Product.findByIdAndDelete(productId);
      res.json({status: 'success', message: 'Producto eliminado'});
    } catch (error) {
      res.status(500).json({status: 'error', error:error.message });
    }
  });


export default router;
