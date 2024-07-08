import PrimaryButton from "@/components/Button";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/contexts/useWeb3";
import Cars from '@/components/images';
import ImgSectionOne from '@/images/background/sectionOne.jpeg';

import Home from "./home";

export default function index() {
    return (
        <div>
            <Home />
        </div>
    );
}