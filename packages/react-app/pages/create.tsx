// Import necessary libraries
import React, { useState } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
// import GiftCardNFTABI from './GiftCardNFT.json'; // Replace with actual ABI file
import GiftCardNFTABI from "../../hardhat/contracts/abi/GiftCardNFT.json";


// Replace with your contract address
const contractAddress = '0x2772D4B0d461B832EE76c930182959e1378dDd76';

// Initialize ethers.js provider
let provider;
if (typeof window !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
}
const signer = provider?.getSigner();

// Create instance of the contract
const contract = new ethers.Contract(contractAddress, GiftCardNFTABI, signer);

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleMint = async () => {
    try {
      const tx = await contract.safeMint(title, description, image);
      await tx.wait();
      setTxHash(tx.hash);
      console.log('Transaction Hash:', tx.hash);
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>Mint a Gift Card NFT</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleMint(); }}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </label>
        <br />
        {image && <img src={image} alt="NFT Preview" className="image-preview" />}
        <button type="submit" className="mint-button">Submit</button>
      </form>
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  );
}

export default App;
