// Import necessary libraries
import React, { useState } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
import GiftCardNFTABI from "../../hardhat/artifacts/contracts/GiftCardNFT.sol/GiftCardNFT.json";


// Replace with your contract address
const contractAddress = '0x2772D4B0d461B832EE76c930182959e1378dDd76';

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
  const [image, setImage] = useState('');
  const [txHash, setTxHash] = useState<string>('');

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
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Mint NFT</button>
      </form>
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  );
}

export default App;
