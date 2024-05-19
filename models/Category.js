const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    description: String,
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    taxType: String,
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model('Category', CategorySchema);
