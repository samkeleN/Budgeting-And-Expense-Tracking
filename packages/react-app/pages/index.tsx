import PrimaryButton from "@/components/Button";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/contexts/useWeb3";
import ImgSectionOne from '@/images/background/sectionOne.jpeg';

import Home from "./home";

export default function index() {
    // const {
    //     address, 
    //     getUserAddress,
    //     sendCUSD,
    //     mintMinipayNFT,
    //     getNFTs,
    //     signTransaction,
    // } = useWeb3();
    // const [cUSDLoading, setCUSDLoading] = useState(false);
    // const [nftLoading, setNFTLoading] = useState(false);
    // const [signingLoading, setSigningLoading] = useState(false);
    // const [userOwnedNFTs, setUserOwnedNFTs] = useState<string[]>([]);
    // const [tx, setTx] = useState<any>(undefined);

    // useEffect(() => {
    //     getUserAddress();
    // }, []);

    // useEffect(() => {
    //     const getData = async () => {
    //         const tokenURIs = await getNFTs();
    //         setUserOwnedNFTs(tokenURIs);
    //     };
    //     if (address) {
    //         getData();
    //     }
    // }, [address]);

    // async function sendingCUSD() {
    //     if (address) {
    //         setCUSDLoading(true);
    //         try {
    //             const tx = await sendCUSD(address, "0.1");
    //             setTx(tx);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setCUSDLoading(false);
    //         }
    //     }
    // }

    // async function signMessage() {
    //     setSigningLoading(true);
    //     try {
    //         await signTransaction();
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setSigningLoading(false);
    //     }
    // }

    // async function mintNFT() {
    //     setNFTLoading(true);
    //     try {
    //         await mintMinipayNFT();
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setNFTLoading(false);
    //     }
    // }

    return (
        <div>
            <Home />
        </div>
    );
}
