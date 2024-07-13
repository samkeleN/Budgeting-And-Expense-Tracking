// Import necessary libraries
import React, { useState } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
import GiftCardNFTABI from "../../hardhat/artifacts/contracts/GiftCardNFT.sol/GiftCardNFT.json";

// Replace with your contract address
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Initialize ethers.js provider
let provider;
if (typeof window !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
}
const signer = provider?.getSigner();

// Create instance of the contract
const contract = new ethers.Contract(contractAddress, GiftCardNFTABI.abi, signer);

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [txHash, setTxHash] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleMint = async () => {
    try {
      if (!title || !description || !imageUrl) {
        setErrorMessage('Please fill in all fields.');
        return;
      }

      const tx = await contract.safeMint(title, description, imageUrl);
      await tx.wait();
      setTxHash(tx.hash);
      console.log('Transaction Hash:', tx.hash);
    } catch (error: any) {
      console.error('Error minting NFT:', error);
      setErrorMessage(`Error minting NFT: ${error.message}`);
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
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <br />
        {imageUrl && <img src={imageUrl} alt="NFT Preview" className="image-preview" />}
        <button type="submit" className="mint-button">Submit</button>
      </form>
      {txHash && <p>Transaction Hash: {txHash}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default App;