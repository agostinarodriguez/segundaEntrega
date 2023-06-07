import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import __dirname__ from './utils.js'
import viewsRouter from './routes/views.router.js';

const app = express();

mongoose.connect('mongodb+srv://magostina:freyja1663@coderhouse.lhvtebh.mongodb.net/?retryWrites=true&w=majority');
app.engine('handlebars', handlebars.engine());

app.set('views', __dirname__ + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.listen(8080, () => {
  console.log('Listening on PORT 8080');
});
