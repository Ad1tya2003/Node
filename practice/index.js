const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res) =>{
    res.send("Hello from node API and nodemon yay mongodb connected");
});

app.post('/api/products', async (req,res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async(req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error)
    {
        res.status(500).json({message: error.message});
    }
})

app.get('/api/products/:id', async  (req,res) =>{
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
})

app.put('/api/products/:id', async (req,res) =>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product)
        {
            return res.status(501).json({message : "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error)
    {
        res.status(500).json({message : error.message});
    }
})

app.delete('/api/products/:id', async (req,res) =>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        (!product)
        {
            return res.status(501).json({message : "Product not found"});
        }
        res.status(200).json({message : "Product deleted successhully"});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
})
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
mongoose.connect("mongodb+srv://sa28d047:aditya786@etp.nnyzvij.mongodb.net/?retryWrites=true&w=majority&appName=etp")
.then(() => {
    console.log("MongoDB connected succesfully");
})
.catch(() =>{
    console.log("Connection Failed");
});

