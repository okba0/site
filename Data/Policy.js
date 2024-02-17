import { Schema, model, models } from "mongoose";

const PolicySchema = new Schema({
    username: {
        type: String,
        required: [true, 'Kullanıcı Adı Ekle'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Tarih Ekle'],
    },
    product: {
        type: String,
        required: [true, 'Ürün Ekle'],
    },
    adder: {
        type: String,
        required: [true, 'Ekleyen kişi adını Ekle'],
    },
    plate: {
        type: String,
        required: [true, 'Açıklama Ekle']
    },
    url: {
        type: String,
        required: [true]
    }
});

export default models.Policy || model('Policy', PolicySchema);
