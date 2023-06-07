import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    tipo: { type: String, required: true },
    disponibilidad: { type: Boolean, default: true },
  });

productSchema.plugin(mongoosePaginate);
const product = mongoose.model('product', productSchema);


export default product;
