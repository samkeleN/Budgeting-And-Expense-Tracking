// ViewNFTs.tsx

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import GiftCardNFTAbi from "../../hardhat/artifacts/contracts/GiftCardNFT.sol/GiftCardNFT.json"; // Import the ABI JSON file

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface Giftcard {
  title: string;
  description: string;
  image: string;
  owner: string;
}

const ViewNFTs: React.FC = () => {
  const [giftcards, setGiftcards] = useState<Giftcard[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []); // Request account access if needed
        const signer = provider.getSigner(); // Get signer for transactions
        const contract = new ethers.Contract(contractAddress, GiftCardNFTAbi.abi, signer);
  
        // Assuming totalSupply is a method in your contract, call it here
        const totalSupply = await contract.totalSupply();
        console.log("Total Supply:", totalSupply.toString());
        
        // Additional logic to fetch NFTs...
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };
  
    fetchNFTs();
  }, []);

  return (
    <div>
      <h1>Minted NFTs</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {giftcards.map((giftcard, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{giftcard.title}</h2>
            <p>{giftcard.description}</p>
            <img src={giftcard.image} alt={giftcard.title} style={{ maxWidth: "200px" }} /> 
            <img src={giftcard.image} alt={giftcard.title} style={{ maxWidth: "100px" }} />
          <p>Owner: {giftcard.owner}</p>
        </div>
      ))}
    </div>
  </div>
);
};

export default ViewNFTs;