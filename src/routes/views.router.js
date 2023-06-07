import {Router} from 'express';
import product from '../models/products.js'


const router = Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Segunda Entrega'});
});


router.get('/product', async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, query, category, availability } = req.query;
  
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
      };
  
      const filter = {};
  
      if (query) {
        filter.tipo = query;
      }
  
      if (category) {
        filter.categoria = category;
      }
  
      if (availability) {
        filter.disponibilidad = availability;
      }
  
      const sortOptions = {};
  
      if (sort) {
        sortOptions.precio = sort === 'asc' ? 1 : -1;
      }
  
      const products = await product.paginate(filter, options, sortOptions);
  
      const response = {
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `/product?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}&category=${category}&availability=${availability}`
          : null,
        nextLink: products.hasNextPage
          ? `/product?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}&category=${category}&availability=${availability}`
          : null,
      };
  
      res.json(response);
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  });
  
  
export default router;



