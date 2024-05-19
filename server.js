const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subcategory');
const itemRouter = require('./routes/item');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/menu_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/categories', categoryRouter);
app.use('/subcategories', subCategoryRouter);
app.use('/items', itemRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
