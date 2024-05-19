const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

// Create Item
router.post('/:parentType/:parentId', async (req, res) => {
    const { parentType, parentId } = req.params;
    const item = new Item(req.body);
    try {
        let parent;
        if (parentType === 'subcategory') {
            parent = await SubCategory.findById(parentId);
            if (!parent) {
                return res.status(404).json({ message: 'SubCategory not found' });
            }
            item.subCategory = parent;
        } else if (parentType === 'category') {
            parent = await Category.findById(parentId);
            if (!parent) {
                return res.status(404).json({ message: 'Category not found' });
            }
            item.category = parent;
        } else {
            return res.status(400).json({ message: 'Invalid parent type' });
        }
        const savedItem = await item.save();
        parent.items.push(savedItem);
        await parent.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All Items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Item by ID
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Get Items by Category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const items = await Item.find({ category: req.params.categoryId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Items by SubCategory
router.get('/subcategory/:subCategoryId', async (req, res) => {
    try {
        const items = await Item.find({ subCategory: req.params.subCategoryId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Edit Item
router.patch('/:id', getItem, async (req, res) => {
    if (req.body.name != null) {
        res.item.name = req.body.name;
    }
    if (req.body.image != null) {
        res.item.image = req.body.image;
    }
    if (req.body.description != null) {
        res.item.description = req.body.description;
    }
    if (req.body.taxApplicable != null) {
        res.item.taxApplicable = req.body.taxApplicable;
    }
    if (req.body.tax != null) {
        res.item.tax = req.body.tax;
    }
    if (req.body.baseAmount != null) {
        res.item.baseAmount = req.body.baseAmount;
    }
    if (req.body.discount != null) {
        res.item.discount = req.body.discount;
    }
    if (req.body.totalAmount != null) {
        res.item.totalAmount = req.body.totalAmount;
    }
    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Search Items by Name
router.get('/search/:name', async (req, res) => {
    try {
        const items = await Item.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get Item
async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.item = item;
    next();
}

module.exports = router;
