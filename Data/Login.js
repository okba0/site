// Login.js
import { Schema, model, models } from "mongoose";

const loginSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Lütfen kullanıcı adı ekleyin'],
        maxlength: [15, 'Max length is 15'],
    },
    mail: {
        type: String,
        required: [true, 'Lütfen e-posta ekleyin'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Lütfen bir şifre ekleyin'],
        maxlength: [20, 'Max length is 20'],
    },type: {
        type: String,
        required: [true, 'Lütfen  tür ekleyin'],
    },Gender: {
        type: String,
        required: [true, 'Lütfen cinsiyet seç'],
    },Phone: {
        type: Number,
        required: [true, 'Lütfen telefon numarası ekleyin'],
    },image: {
        type: String,
        default: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
    },
});

export default models.Login || model('Login', loginSchema);
