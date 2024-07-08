import React from 'react';
import ALO from '@/images/alo.png';

const Home = () => {
    return ( 
        <div className="home">
            <div className="section-one">
                <div className="container-one">
                    <div className="text-content">

                    <h1>Protect your relationships, memories, and thoughtful messages by converting them to NFTs</h1>
                    <br />
                    <p>Imagine a world where your most cherished moments and heartfelt messages are preserved forever as digital assets. With our platform, you can safeguard your personal treasures and share them with loved ones in a unique and meaningful way.</p>
                    <br />
                    <button className="get-started-button">Get Started</button>
                    </div>
                    <img src= {ALO.src} alt="picture" className="right-image" />
                </div>
            </div>
            <div className="section-two">
                <div className="container-two">
                    <h1 className='headerOne'>Overview</h1>
                    <h2>Smart Budgeting System</h2>
                    <p>Our budgeting system allows you to allocate different percentages of your income to various categories. 
                        Stay under budget and earn reward points, which can be redeemed for NFTs once you reach a certain number 
                        of points. If you go over budget, a 5% penalty will be applied to your account.
                    </p>
                </div>
            </div>
            <div className="section-four">
                <div className="container-four">
                    <p>Join us today and start turning your budgeting into an exciting and rewarding experience 
                        with C CHAIN BUDGET!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
