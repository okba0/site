import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
    adress: {
        type: String,
        required: [true, 'Sıgortalı Adı Ekle'],
    },
    image: {
        type: String,
        required: [true, 'Tarih Ekle'],
    },
    number: {
        type: Number,
        required: [true, 'TC kimlik Ekle'],
    },
    name: {
        type: String,
        required: [true, 'Ruhsat Seri Ekle'],
    },
    site: {
        type: String,
        required: [true, 'Plaka Ekle']
    }
});

export default models.Company || model('Company', CompanySchema);
