import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Order from './components/Order';
import Details from './components/Details';
import Header from './components/Header';
import AddProduct from './components/AddProduct';
import './App.css'; 
import LowDetails from './components/LowDetails';
import AllTransactions from './components/AllTransactions';
import AddTransaction from './components/AddTransaction';
const { ethers } = require("ethers");
const abi = require("./contracts/Inventory.json");

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xb041c7e69de165bAF401E01Ae96ef9065761684C";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return ( 
       <div>
      <Header />        
      <Router>
        <div>
          <Routes>
              <Route path='/' element={<Dashboard/>} />     
              <Route path='/order' element={<Order/>} />
              <Route path='/details' element={<Details/>} /> 
              <Route path='/lowdetails' element={<LowDetails/>} /> 
              <Route path='/addproduct' element={<AddProduct/>} /> 
              <Route path='/alltransactions' element={<AllTransactions state={state} />} /> 
              <Route path="/addtransaction" element={<AddTransaction state={state}/>}/>
          </Routes>
        </div>
        
       </Router>
       </div>
  );
};
export default App;
