import { Schema, model, models } from "mongoose";

const OffersSchema = new Schema({
    insured: {
        type: String,
        required: [true, 'Sıgortalı Adı Ekle'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Tarih Ekle'],
    },
    identity: {
        type: Number,
        required: [true, 'TC kimlik Ekle'],
    },
    licenseserial: {
        type: String,
        required: [true, 'Ruhsat Seri Ekle'],
    },
    plate: {
        type: String,
        required: [true, 'Plaka Ekle']
    },
    description: {
        type: String,
        required: [true, 'Açıklama Ekle']
    },
    product: {
        type: String,
        required: [true, 'Açıklama Ekle']
    },
    url: {
        type: String
    }
});

export default models.Offers || model('Offers', OffersSchema);
