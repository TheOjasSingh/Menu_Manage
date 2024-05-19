const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    description: String,
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Item', ItemSchema);
