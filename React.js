npx create-react-app luxury-goods-app
cd luxury-goods-app

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import LuxuryGoodsContract from "./contracts/LuxuryGoods.json"; // Update with correct path

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = LuxuryGoodsContract.networks[networkId];
          const instance = new web3Instance.eth.Contract(
            LuxuryGoodsContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(instance);
        } else {
          console.error("Please install MetaMask!");
        }
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
      }
    };

    connectToBlockchain();
  }, []); 

  return (
    <div>
      <h1>Luxury Goods Authentication</h1>
      {/* Your app's content goes here */}
    </div>
  );
}

export default App;


const registerProduct = async () => {
  try {
    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const brand = document.getElementById("brand").value;

    await contract.methods
      .registerProduct(productId, productName, brand)
      .send({ from: accounts[0] }); // Assuming the first account is the manufacturer

    console.log("Product registered successfully!");
  } catch (error) {
    console.error("Error registering product:", error);
  }
}; 
