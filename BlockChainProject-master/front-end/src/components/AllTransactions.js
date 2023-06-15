import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const { ethers } = require("ethers");

const AllTransactions = ({state}) => {
 // const [tableData, setTableData] = useState([]);
  const [processedOrderDetail, setProcessedOrderDetail] = useState([]);
  useEffect(() => {
    console.log(state);
     fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/productsid');
      const data = await response.json();
     // setTableData(data);
      console.log(data);
  
      // Call the order function for each product ID
      const { contract} = state;
      const gasLimit = 500000; // Set the desired gas limit
      // await contractWithSigner.acceptOrder(orderId);
      const orderDetailsPromises = data.map(async (productId) => {
        const orderDetails = await contract.orders(productId, {
          gasLimit: ethers.BigNumber.from(gasLimit), // Set the manual gas limit
        });
        return orderDetails;
      });
  
      const orderDetails = await Promise.all(orderDetailsPromises);
  
      console.log("Order details:", orderDetails);
  
      // Process and store the order details for each product ID
      const processedOrderDetails = orderDetails.map((details) => ({
        orderId: details[0].toNumber(),
        productId: details[1].toNumber(),
        quantity: details[2].toNumber(),
        dispatchTime: details[3].toNumber(),
        buyer: details[4],
        seller: details[5],
        dispatched: details[6],
        rejected: details[7],
      }));
  
      console.log("Processed Order details:", processedOrderDetails);
      setProcessedOrderDetail(processedOrderDetails);
      // alert('Transaction details fetched successfully');
    } catch (error) {
      alert("Thoda refresh kro chl je ga.");
      //console.error('Error fetching data:', error);
    }
  };
  const acceptOrder = async (orderId) => {
    try {
      const { contract } = state;
      await contract.acceptOrder(orderId);
      fetchData();
      alert('kam hogaya');
    } catch (error) {
      alert('Khud hi khareed rha he khud hi bech rha he?');
      console.error('Error accepting order:', error);
    }
  };
  const rejectOrder = async (orderId) => {
    try {
      const { contract } = state;
      await contract.rejectOrder(orderId);
      fetchData();
      alert('Order Rejected successfully');
    } catch (error) {
      alert('Aise to ni hota');
      console.error('Error accepting order:', error);
    }
  };
  // Function to handle rejecting an order

  // Function to handle dispatching an order
  const dispatchOrder = async (orderId,quantity) => {
    try {
      const { contract } = state;
      await contract.dispatchOrder(orderId);
      fetchData();
      alert('Order Dispatched successfully');
  
      // Hit the URL to update the product quantity
 // Replace with the actual product ID
      const url = `http://localhost:3001/api/products/${orderId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });
      
      if (response.ok) {
        const updatedProduct = await response.json();
        console.log(updatedProduct); // Display the updated product information
        alert("Quantity Updated in DataBase");
      } else {
        console.error('Error updating product quantity:', response.status);
      }
    } catch (error) {
      alert('Khud hi khareed rha he khud hi dispatch kr rha he?');
      console.error('Error dispatching order:', error);
    }
  };
  
  

  return (
    <div style={{ height: '100vh' }}>
      <h1>Details</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Dispatch Time</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Dispatched</th>
            <th>Accepted</th>
            <th>Rejected</th>
            <th>Action</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processedOrderDetail.map((row) =>
            row.orderId !== 0 && (
              <tr key={row.orderId}>
                <td>{row.orderId}</td>
                <td>{row.productId}</td>
                <td>{row.quantity}</td>
                <td>{row.dispatchTime}</td>
                <td>{row.buyer}</td>
                <td>{row.seller}</td>
                <td>{row.dispatched ? 'Yes' : 'No'}</td>
                <td>{row.seller !== "0x0000000000000000000000000000000000000000" ? 'Yes' : 'No'}</td>
                <td>{row.rejected ? 'Yes' : 'No'}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => acceptOrder(row.orderId)}
                    disabled={row.seller !== "0x0000000000000000000000000000000000000000"}
                  >
                    Accept
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger" //hui hui hui
                    onClick={() => rejectOrder(row.orderId)}
                    disabled={row.rejected}
                  >
                    Reject
                  </Button>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => dispatchOrder(row.orderId, row.quantity)}
                    disabled={row.dispatched}
                  >
                    Dispatched
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Link to={'/addtransaction'}>
        <Button>Add Transaction</Button>
      </Link>
    </div>
  );
};  

export default AllTransactions;