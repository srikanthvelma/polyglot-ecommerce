const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// ======================
// MongoDB Connection
// ======================
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo-product:27017/products';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// ======================
// Product Schema
// ======================
const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number
});
const Product = mongoose.model('Product', productSchema);

// ======================
// Seed Data
// ======================
async function seedProducts() {
    const count = await Product.countDocuments();
    if (count === 0) {
        const dataPath = path.join(__dirname, '..', 'seed-data.json');
        const seedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        await Product.insertMany(seedData);
        console.log("Seed data inserted");
    }
}
seedProducts();

// ======================
// Routes
// ======================
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/products/:id', async (req, res) => {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
});

// ======================
// Server Start
// ======================
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});
