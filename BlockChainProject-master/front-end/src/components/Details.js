import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Details = () => {
  const [tableData, setTableData] = useState([]);
  const totalQuantity = tableData.reduce((acc, row) => acc + row.quantity, 0);
  const totalStockPrice = tableData.reduce((acc, row) => acc + (row.quantity * row.buyrate), 0);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const increaseQuantity = (id) => {
    setTableData((prevData) => {
      return prevData.map((row) => {
        if (row.id === id && row.quantity > 0) {
          const updatedQuantity = row.quantity + 1;
          const updatedRow = { ...row, quantity: updatedQuantity };
          
          // Update the quantity in the backend
          fetch(`http://localhost:3001/api/products/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: updatedQuantity }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to update quantity in the backend');
              }
            })
            .catch((error) => {
              console.error('Error updating quantity in the backend:', error);
            });
  
          return updatedRow;
        }
        return row;
      });
    });
  };

  const decreaseQuantity = (id) =>  { setTableData((prevData) => {
    return prevData.map((row) => {
      if (row.id === id && row.quantity > 0) {
        const updatedQuantity = row.quantity - 1;
        const updatedRow = { ...row, quantity: updatedQuantity };
        
        // Update the quantity in the backend
        fetch(`http://localhost:3001/api/products/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: updatedQuantity }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to update quantity in the backend');
            }
          })
          .catch((error) => {
            console.error('Error updating quantity in the backend:', error);
          });

        return updatedRow;
      }
      return row;
    });
  });
};
const isExpired = (expiryDate) => {
  const currentDate = new Date();
  const productExpiryDate = new Date(expiryDate);
  return productExpiryDate < currentDate;
};
const getRowStyle = (expiryDate) => {
  const currentDate = new Date();
  const expirationDate = new Date(expiryDate);

  if (isExpired(expiryDate)) {
    return { backgroundColor: 'lightcoral' };
  } else {
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference <= 10) {
      return { backgroundColor: 'lightblue' };
    }
  }

  return {}; // Default style
};

  return (
    <div style={{ height: '100vh' }}>
    <div className="d-flex justify-content-center mt-4">
  <div className="d-flex align-items-center flex-column mr-5">
    <div style={style.quantityBox}>
      {totalQuantity}
    </div>
    <div className="mt-2">
      <span className="font-weight-bold">TOTAL STOCK IN HAND</span>
    </div>
  </div>
  <div className="d-flex align-items-center flex-column mx-5">
    <div style={style.stockPriceBox}>
      {totalStockPrice}pkr
    </div>
    <div className="mt-2">
      <span className="font-weight-bold">TOTAL STOCK PRICE</span>
    </div>
  </div>
</div>
      <h1>Details</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Buy Rate</th>
            <th>Description</th>
            <th>Expiry Date</th>
            <th>Sell Rate</th>
            <th>Quantity</th>
            <th>Stock Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
             <tr key={row.id} style={getRowStyle(row.expirydate)}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.buyrate} PKR</td>
              <td>{row.description}</td>
              <td>{row.expirydate}</td>
              <td>{row.sellrate} PKR</td>
              <td>{row.quantity}</td>
              <td>{row.buyrate*row.quantity} PKR</td>
              <td>
              <Button variant="primary" onClick={() => increaseQuantity(row.id)}>+  </Button>
              <Button variant="danger" onClick={() => decreaseQuantity(row.id)}> -</Button>
              
              </td>
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
const style = {
  quantityBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    backgroundColor: '#2196f3',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px',
   
  },
  stockPriceBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    width: '100px',
    height: '50px',
    backgroundColor: '#4caf50',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
  expiredrow: {
    backgroundColor: '#ff0000', /* Red background color */
    color: '#ffffff', /* White text color */
  }
};

export default Details;