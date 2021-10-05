const { Schema, model, Types } = require('mongoose');

const categorySchema = new Schema({
    name:{type: String, required: true },
    createdAt: { type: Date, required: false, default: Date.now }
})

const Category = model('categories', categorySchema);

module.exports = Category;