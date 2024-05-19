const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    description: String,
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
