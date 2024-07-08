import { useEffect, useState } from "react";
import { ethers } from "ethers";
import GiftCardNFT from "../../hardhat/contracts/abi/GiftCardNFT.json";

const contractAddress = "0x2772D4B0d461B832EE76c930182959e1378dDd76";

interface Giftcard {
  id: number;
  title: string;
  description: string;
  image: string;
  owner: string;
}

const Home = () => {
  const [giftcards, setGiftcards] = useState<Giftcard[]>([]);

  useEffect(() => {
    const fetchGiftcards = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, GiftCardNFT, provider);
        try {
          const giftcardCount = await contract.balanceOf(provider.getSigner().getAddress());
          const promises: Promise<Giftcard>[] = [];
          for (let i = 0; i < giftcardCount.toNumber(); i++) {
            promises.push(
              contract.getGiftcard(i).then((giftcard: Giftcard) => ({
                ...giftcard,
                id: i,
              }))
            );
          }
          const data = await Promise.all(promises);
          setGiftcards(data);
        } catch (error) {
          console.error("Error fetching giftcards:", error);
        }
      }
    };

    fetchGiftcards();
  }, []);

  return (
    <div>
      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mt-8">Gift Cards</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {giftcards.map((giftcard) => (
            <div key={giftcard.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{giftcard.title}</h2>
              <p>{giftcard.description}</p>
              <img src={giftcard.image} alt={giftcard.title} className="w-full h-48 object-cover mt-2" />
              <p className="mt-2">Owner: {giftcard.owner}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
