import { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema({
    Product: {
        type: String,
        required: [true, 'Ürün Ekle'],
    },date: {
        type: Date,
        default: Date.now,
        required: [true, 'Tarih Ekle'],
    },
});

export default models.Products || model('Products', ProductsSchema);
