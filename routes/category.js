const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create Category
router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All Categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Category by Name or ID
router.get('/:id', getCategory, (req, res) => {
    res.json(res.category);
});

// Edit Category
router.patch('/:id', getCategory, async (req, res) => {
    if (req.body.name != null) {
        res.category.name = req.body.name;
    }
    if (req.body.image != null) {
        res.category.image = req.body.image;
    }
    if (req.body.description != null) {
        res.category.description = req.body.description;
    }
    if (req.body.taxApplicable != null) {
        res.category.taxApplicable = req.body.taxApplicable;
    }
    if (req.body.tax != null) {
        res.category.tax = req.body.tax;
    }
    if (req.body.taxType != null) {
        res.category.taxType = req.body.taxType;
    }
    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get Category
async function getCategory(req, res, next) {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.category = category;
    next();
}

module.exports = router;
