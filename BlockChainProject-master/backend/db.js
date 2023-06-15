const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const cors = require('cors'); // Assuming the model is in a separate file

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/Inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Define your routes here

    // Example route
    app.get('/', (req, res) => {
      res.send('Hello, Express!');
    });

    // Create a new product
    app.post('/api/products', (req, res) => {
      const newProduct = req.body;
      console.log("In post function");
    
      const product = Product(newProduct);
      console.log(product);
    
      product.save()
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.error('Error saving product:', error);
          res.status(500).send('Failed to save product');
        });
    });
    app.get('/api/totalRecords', async (req, res) => {
      try {
        const count = await Product.countDocuments({});
        res.json({ count });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving total records' });
      }
    });
    
    app.get('/api/productsid', async (req, res) => {
      try {
        const products = await Product.find({});
        const productIds = products.map(product => product.id);
        res.json(productIds);
      } catch (error) {
        console.error('Error retrieving products:', error);
        res.sendStatus(500);
      }
    });
    
    app.get('/api/products', async (req, res) => {
        try {
          const products =await Product.find({});
          res.json(products);
        } catch (error) {
          console.error('Error retrieving products:', error);
          res.sendStatus(500);
        }
      });
      // Assuming you already have the required imports and server setup
      app.get('/api/lowproducts', async (req, res) => {
        try {
          const products = await Product.find({ quantity: { $lt: 10 } });
          res.json(products);
        } catch (error) {
          console.error('Error retrieving products:', error);
          res.sendStatus(500);
        }
      });
      app.get('/api/lowproductscount', async (req, res) => {
        try {
          const products = await Product.find({ quantity: { $lt: 10 } });
          const count = products.length;
          console.log(count);
          res.json({ count});
        } catch (error) {
          console.error('Error retrieving products:', error);
          res.sendStatus(500);
        }
      });
      
      
// Update the quantity of a product
app.patch('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

Product.findOne({ id: productId })
  .then((product) => {
    if (product) {
      console.log(product.name); // Display the product's name

      // Add the previous quantity to the updated quantity
      const updatedQuantity = product.quantity + quantity;

      // Update the product quantity in the database
      Product.findOneAndUpdate({ id: productId }, { quantity: updatedQuantity }, { new: true })
        .then((updatedProduct) => {
          if (updatedProduct) {
            console.log(updatedProduct.name); // Display the updated product's name
            console.log(updatedProduct.quantity); // Display the updated quantity
            res.status(200).json(updatedProduct);
          } else {
            console.log('Product not found');
            res.status(404).json({ error: 'Product not found' });
          }
        })
        .catch((error) => {
          console.error('Error updating product quantity:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
    } else {
      console.log('Product not found');
      res.status(404).json({ error: 'Product not found' });
    }
  })
  .catch((error) => {
    console.error('Error finding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

const getProductBuyRate = async (productId) => {
  try {
    const product = await Product.findOne({ id: productId });
    if (product) {
      console.log("Mil gai product")
      console.log(product.buyrate)
      return product.buyrate;
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error finding product:', error);
    throw new Error('Internal server error');
  }
};


// Endpoint for retrieving buy rate
app.get('/api/products/:id/buyrate', (req, res) => {
  const productId = req.params.id;

  getProductBuyRate(productId)
    .then((buyrate) => {
      console.log("bas arhi hai product")
      res.status(200).json({ buyrate });
    })
    .catch((error) => {
      console.error('Error retrieving buy rate:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });