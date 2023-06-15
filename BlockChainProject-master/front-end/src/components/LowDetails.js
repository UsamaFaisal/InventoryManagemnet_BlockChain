import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const LowDetails = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/lowproducts');
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <h1>Details</h1>

      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Buy Rate</th>
            <th>Description</th>
            <th>Expiry Date</th>
            <th>Sell Rate</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.buyrate}</td>
              <td>{row.description}</td>
              <td>{row.expirydate}</td>
              <td>{row.sellrate}</td>
              <td>{row.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/addproduct'}>
        <Button>Add Product</Button>
      </Link>
    </div>
  );
};

export default LowDetails;