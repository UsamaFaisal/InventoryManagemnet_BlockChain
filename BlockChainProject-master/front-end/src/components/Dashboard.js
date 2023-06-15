import React,{ useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import { Button } from 'react-bootstrap'; // Import from a specific package providing the button component
import './Dashboard.css'
import {
  CDBProgress,
} from "cdbreact";
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
const Dashboard = () => {
  const [ProductCount, setProductCount] = useState(0);
  const progressValue = ProductCount > 0 ? (ProductCount / 100) * 100 : 0;
  const [lowProductCount, setlowProductCount] = useState(0);
  const lowprogressValue = lowProductCount > 0 ? (lowProductCount / 100) * 100 : 0;

  useEffect(() => {
    const fetchTotalRecords = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/totalRecords');
        
        const data = await response.json();
        setProductCount(data.count);
        console.log(data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalRecords();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lowproductscount');
        const data = await response.json();
        setlowProductCount(data.count);
        console.log(data.count);
      } catch (error) {
        console.error('Error retrieving low product count:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  return (
    <div className='dashborad d-flex'>
    <div>
      <Sidebar />
    </div>
    <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
      {/* <Navbar /> */}
      <div style={{ height: "100%" }}>
      <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
          <div className="d-flex card-section">
            <div className="cards-container">
              <div className="card-bg w-100 border d-flex flex-column">
                <div className="p-4 d-flex flex-column h-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="m-0 h5 font-weight-bold text-dark head">Total Products</h4>
                    <div className="py-1 px-2 bg-grey rounded-circle"><i className="fas fa-box-open"></i></div>
                  </div>
                  <h4 className="my-4 text-right text-dark h2 font-weight-bold">{ProductCount}</h4>
                      <CDBProgress value={progressValue} height={8} colors="primary"></CDBProgress>
                  
                  <p className="mt-3 text-success small">
                    <i className="fas fa-angle-up p-0"></i> {progressValue}%
                    <span style={{ fontSize: "0.95em" }} className="ml-2 font-weight-bold text-muted"> Since last month</span>
                  </p>
                  <NavLink to="/details" className={`mt-auto text-decoration-none`}>
                    <p className="c-p mb-0 text-dark font-weight-bold details">
                      More Details 
                      <i className="fas fa-arrow-right ml-1"></i>
                    </p>
                  </NavLink>
                </div>
              </div>
              <div className="card-bg w-100 border d-flex flex-column p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="h5 font-weight-bold text-dark head">Low Stock Products</h6>
                  <div className="rounded-circle bg-grey px-2 py-1"><i className="fas fa-exclamation-circle"></i></div>
                </div>
                <h4 className="my-4 text-right text-dark h2 font-weight-bold">{lowProductCount}</h4>
                      <CDBProgress value={lowprogressValue} height={8} colors="primary"></CDBProgress>
                  
                  <p className="mt-3 text-success small">
                    <i className="fas fa-angle-up p-0"></i> {lowprogressValue}%
                    <span style={{ fontSize: "0.95em" }} className="ml-2 font-weight-bold text-muted"> Since last month</span>
                  </p>
                <NavLink to="/lowdetails" className={`mt-auto text-decoration-none`}>
                  <p className="c-p mb-0 text-dark font-weight-bold details">
                    More Details 
                    <i className="fas fa-arrow-right ml-1"></i>
                  </p>
                </NavLink>
              </div>
              <div className="card-bg w-100 border d-flex flex-column p-4">
                <div className="d-flex align-items-center justify-content-between ml-3">
                  <h6 className="h5 font-weight-bold text-dark head">Team Members</h6>
                  <div className="ml-auto rounded-circle bg-grey py-1 px-2"><i className="fas fa-user"></i></div>
                </div>
                <div className="d-flex mt-2 ">
                  <img alt="panelImage" src={img1} className="pane-image" size="md" />
                  <div>
                    <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>SOHAIB RUMI</h6>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <img alt="panelImage" src={img2} className="pane-image" size="md" />
                  <div>
                    <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>MINAHIL SHAHID</h6>
                  </div>
               </div>
                <div className="d-flex mt-2 ">
                  <img alt="panelImage" src={img3} className="pane-image" size="md" />
                  <div>
                    <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>ABDUL REHMAN</h6>
                  </div>
                </div>
                <div className="d-flex mt-2 ">
                  <img alt="panelImage" src={img4} className="pane-image" size="md" />
                  <div>
                    <h6 className="mb-0 mt-3" style={{ fontWeight: "600" }}>USAMA FAISAL</h6>
                  </div>
                </div>
                {/* <p className="c-p text-dark mb-0 font-weight-bold details">
                  More Details
                  <i className="fas fa-arrow-right ml-1"></i>
                </p> */}
              </div>
              <div className="card-bg w-100 d-flex flex-column border d-flex flex-column" style={{gridRow: "span 2"}}>
                <div className="p-4 d-flex flex-column h-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="m-0 h5 font-weight-bold text-dark head">Total Transactions</h4>
                    <div className="px-2 py-1 bg-grey rounded-circle"><i className="fas fa-exchange-alt"></i></div>
                  </div>
                  <div className="mt-5 d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="m-0 h1 font-weight-bold text-dark">Transaction</h4>
                      <p className="text-success small">
                        <i className="fas fa-angle-up p-0"></i> 2 %
                      </p>
                    </div>
                    <div className="text-right d-flex flex-column justify-content-between">
                      <div className="d-flex align-items-center justify-content-between text-primary">
                        <span style={{ fontSize: "3em", margin: "-2rem 0px -1.5rem 0px" }}>&#8226;</span>
                        <span className="small">May</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between text-warning">
                        <span style={{ fontSize: "3em", margin: "-2rem 0px -1.5rem 0px" }}>&#8226;</span>
                        <span className="small ml-2">June</span>
                      </div>
                    </div>
                  </div>
                  <NavLink to="/alltransactions" className={`mt-auto text-decoration-none`}>
                    <p className="c-p mb-0 text-dark font-weight-bold details">
                      More Details 
                      <i className="fas fa-arrow-right ml-1"></i>
                    </p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
