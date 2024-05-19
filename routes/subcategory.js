const express = require('express');
const router = express.Router();
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

// Create SubCategory
router.post('/:categoryId', async (req, res) => {
    const subCategory = new SubCategory(req.body);
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        subCategory.category = category;
        const savedSubCategory = await subCategory.save();
        category.subCategories.push(savedSubCategory);
        await category.save();
        res.status(201).json(savedSubCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All SubCategories
router.get('/', async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get SubCategory by ID
router.get('/:id', getSubCategory, (req, res) => {
    res.json(res.subCategory);
});

// Get SubCategories by Category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ category: req.params.categoryId });
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Edit SubCategory
router.patch('/:id', getSubCategory, async (req, res) => {
    if (req.body.name != null) {
        res.subCategory.name = req.body.name;
    }
    if (req.body.image != null) {
        res.subCategory.image = req.body.image;
    }
    if (req.body.description != null) {
        res.subCategory.description = req.body.description;
    }
    if (req.body.taxApplicable != null) {
        res.subCategory.taxApplicable = req.body.taxApplicable;
    }
    if (req.body.tax != null) {
        res.subCategory.tax = req.body.tax;
    }
    try {
        const updatedSubCategory = await res.subCategory.save();
        res.json(updatedSubCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get SubCategory
async function getSubCategory(req, res, next) {
    let subCategory;
    try {
        subCategory = await SubCategory.findById(req.params.id);
        if (subCategory == null) {
            return res.status(404).json({ message: 'Cannot find subcategory' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subCategory = subCategory;
    next();
}

module.exports = router;
