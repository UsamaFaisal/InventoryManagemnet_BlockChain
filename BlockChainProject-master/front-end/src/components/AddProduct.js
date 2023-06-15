import React, { useState } from 'react';
import { Row,Col, Button} from 'react-bootstrap';
export default function AddProduct() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    buyrate: '',
    description: '',
    expirydate: '',
    sellrate: '',
    quantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
   
    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response=>{
     
        // Handle the response from the server
        console.log('Product created:', response);
        alert("Product is added in database!!");
      })
        // Reset the form
      
      
      .catch(error => {
        console.error('Error creating product:', error);
      });
      setFormData({
        id: '',
        name: '',
        buyrate: '',
        description: '',
        expirydate: '',
        sellrate: '',
        quantity: ''
      });
  
  };

  return (
                <div className="form-box">
  <h5>Add Product</h5>
  <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
  <div className="row">
    <div className="col">
      <label htmlFor="id">ID</label>
      <input
        type="text"
        id="id"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        placeholder="Enter ID"
        style={{ width: '100%', padding: '0.5rem 0.8rem' }}
      />
    </div>
    <div className="col">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter Name"
        style={{ width: '100%', padding: '0.5rem 0.8rem' }}
      />
    </div>
  </div>

  <Row>
    <Col>
      <label htmlFor="buyrate">Buy Rate</label>
      <input
        type="text"
        id="buyrate"
        name="buyrate"
        value={formData.buyrate}
        onChange={handleInputChange}
        placeholder="Enter Buy Rate"
        style={{ width: '100%', padding: '0.5rem 0.8rem' }}
      />
      </Col>
      <Col>
  
      <label htmlFor="sellrate">Sell Rate</label>
      <input
        type="text"
        id="sellrate"
        name="sellrate"
        value={formData.sellrate}
        onChange={handleInputChange}
        placeholder="Enter Sell Rate"
        style={{ width: '100%', padding: '0.5rem 0.8rem' }}
      />

    </Col>
 </Row>

  <label htmlFor="description">Description</label>
  <textarea
    id="description"
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Enter Description"
    style={{ width: '100%', padding: '0.5rem 0.8rem', height: '120px' }}
  ></textarea>

  <label htmlFor="expirydate">Expiry Date</label>
  <input
  type="date"
  id="expirydate"
  name="expirydate"
  value={formData.expirydate}
  onChange={handleInputChange}
  style={{ width: '100%', padding: '0.5rem 0.8rem' }}
/>


  <label htmlFor="quantity">Quantity</label>
  <input
    type="text"
    id="quantity"
    name="quantity"
    value={formData.quantity}
    onChange={handleInputChange}
    placeholder="Enter Quantity"
    style={{ width: '100%', padding: '0.5rem 0.8rem' }}
  />

  <Button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
    Submit
  </Button>
</form>
  </div>
  );
}