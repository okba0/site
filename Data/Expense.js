// Expense.js
import { Schema, model, models } from "mongoose";

const ExpenseSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Kullanıcı Adı Ekle'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Tarih Ekle'],
    },
    amount: {
        type: Number,
        required: [true, 'Tutar Ekle'],
    },
    description: {
        type: String,
        required: [true, 'Açıklama Ekle']
    },
    approval: {
        type: Boolean,
        default: false
    }
});

export default models.Expense || model('Expense', ExpenseSchema);
