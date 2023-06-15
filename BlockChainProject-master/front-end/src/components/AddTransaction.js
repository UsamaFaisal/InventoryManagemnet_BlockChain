import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
const { ethers } = require("ethers");
const AddTransaction = ({ state }) => {
  const [productIds, setProductIds] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    buyrate: '',
    quantity: '',
    dispatchtime: '',
  });

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/productsid');
        const data = await response.json();
        setProductIds(data);
      } catch (error) {
        console.error('Error retrieving product IDs:', error);
      }
    };

    fetchProductIds();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProductSelection = async (event) => {
    const selectedProductId = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: selectedProductId,
    }));

    try {
      const response = await fetch(`http://localhost:3001/api/products/${selectedProductId}/buyrate`);
      const data = await response.json();
      const buyRate = data.buyrate;
      setFormData((prevFormData) => ({
        ...prevFormData,
        buyrate: buyRate,
      }));
    } catch (error) {
      console.error('Error retrieving buy rate:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.dispatchtime || !formData.buyrate || !formData.quantity ) {
      alert('Form to pora fill krlo.');
      return;
    }
    try {
      const { contract } = state;
      const { id,  buyrate,quantity,dispatchtime } = formData;
      // placeOrder(uint256 _productId,uint256 buyrate, uint256 _quantity, uint256 _dispatchTime)
      const gasLimit = 500000; // Set the desired gas limit
      await contract.placeOrder(id, buyrate, quantity, dispatchtime, {
        value: ethers.utils.parseUnits((buyrate*quantity).toString(), "wei").toString(), // Set the value to 1 ETH in wei
        gasLimit: ethers.BigNumber.from(gasLimit), // Set the manual gas limit
      });

      alert('Transaction added successfully');
      console.log("Transaction added successfully");
    } catch (error) {
      alert('error');
      console.log(error);
    }
    setFormData({
      id: "",
      dispatchtime:"",
      quantity: "",
      buyrate: "",
    });
  };

  return (
    <div className="form-box">
      <h5>Add Transaction</h5>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="row">
          <div className="col">
            <label htmlFor="id">ID</label>
            <select
              id="id"
              name="id"
              value={formData.id}
              onChange={handleProductSelection}
              style={{ width: '100%', padding: '0.5rem 0.8rem' }}
            >
              <option value="">Select Product ID</option>
              {productIds.map((productId) => (
                <option key={productId} value={productId}>
                  {productId}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Row>
          <Col>
            <label htmlFor="dispatchtime">Dispatch Time</label>
            <input
              type="number"
              id="dispatchtime"
              name="dispatchtime"
              value={formData.dispatchtime}
              onChange={handleInputChange}
              placeholder="Write Dispatch Time"
              style={{ width: '100%', padding: '0.5rem 0.8rem' }}
            />
          </Col>
        </Row>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Enter Quantity"
          style={{ width: '100%', padding: '0.5rem 0.8rem' }}
        />
        <label htmlFor="buyrate">Buy Rate</label>
        <input
          type="number"
          id="buyrate"
          name="buyrate"
          value={formData.buyrate}
          onChange={handleInputChange}
          placeholder="buy rate"
          style={{ width: '100%', padding: '0.5rem 0.8rem' }}
          readOnly // Make the input field read-only
        />
        <Button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddTransaction;
