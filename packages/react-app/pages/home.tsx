import React from 'react';

const home = () => {
    return ( 
        <div className="home">
            <div className="section-one">
                <div className="container-one">
                    <h1 className='headerOne'>Welcome to C CHAIN BUDGET!</h1>
                    <h2>Unlock Rewards for your Savings Goals</h2>
                    <p>Whether you are saving for the long term or the short term, our platform has rewards waiting for you. 
                        Set specific savings goals, such as a dream vacation or an emergency fund, and watch your progress.
                    </p>
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

            <div className="section-three">
                <div className="container-three">
                    <h1>Referral Program</h1>
                    <p>Invite friends to join C CHAIN BUDGET and earn rewards for each referral. 
                        Track your referral status and the rewards earned from referrals on your dashboard.
                    </p>
                    <h2>Reward Tiers</h2>
                    <p>Our tiered reward system ensures that as you accumulate more points, you unlock higher value rewards. 
                        Start with lower-value rewards and work your way up to exclusive high-value offers.
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

export default home;