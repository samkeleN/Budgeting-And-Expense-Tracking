// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers.js
import GiftCardNFTABI from "../../hardhat/artifacts/contracts/GiftCardNFT.sol/GiftCardNFT.json";

// Replace with your contract address
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Initialize ethers.js provider
let provider: ethers.providers.Web3Provider | undefined;
if (typeof window !== 'undefined' && window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
}

const signer = provider?.getSigner();

// Create instance of the contract
const contract = new ethers.Contract(contractAddress, GiftCardNFTABI.abi, signer);

function NFTCollection() {
  const [nfts, setNfts] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        if (!signer) {
          setError('Signer is not available');
          return;
        }
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        const nftPromises = [];

        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const giftcard = await contract.getGiftcard(tokenId);
          nftPromises.push(giftcard);
        }

        const nftData = await Promise.all(nftPromises);
        setNfts(nftData);
      } catch (error: any) {
        console.error('Error fetching NFTs:', error);
        setError(`Error fetching NFTs: ${error.message || error}`);
      }
    };

    fetchNFTs();
  }, [signer]);

  return (
    <div className="NFTCollection">
      <h1>My NFT Collection</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="nft-grid">
        {nfts.map((nft, index) => (
          <div key={index} className="nft-card">
            <img src={nft.image} alt={nft.title} />
            <h2>{nft.title}</h2>
            <p>{nft.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTCollection;