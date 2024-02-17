import { Schema, model, models } from "mongoose";

const PapersSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Şirket Adı Ekle'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Tarih Ekle'],
    },
    papername: {
        type: String,
        required: [true, 'Evrak Adı Ekle'],
    },
    adder: {
        type: String,
        required: [true, 'Ekleyen kişi adını Ekle'],
    },
    description: {
        type: String,
        required: [true, 'Açıklama Ekle']
    },
    url: {
        type: String
    }
});

export default models.Papers || model('Papers', PapersSchema);
