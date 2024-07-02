// Import dependencies from web3.js and truffle artifacts
const Web3 = require('web3');
const { assert } = require('chai');
const { artifacts } = require('hardhat');
const { expect } = require('chai');

// Import artifacts
const CarRental = artifacts.require('CarRental');

// Initialize web3 with Ganache provider
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Define tests
contract('CarRental', (accounts) => {
    let carRentalInstance;

    before(async () => {
        carRentalInstance = await CarRental.deployed();
    });

    it('should book a car', async () => {
        const carType = "SUV";
        const pickUpDate = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
        const dropOffDate = pickUpDate + (3 * 86400); // 3 days later

        await carRentalInstance.bookCar(carType, pickUpDate, dropOffDate, { from: accounts[0] });

        const reservation = await carRentalInstance.getReservation(0);

        assert.equal(reservation.renter, accounts[0], "Renter should be the first account");
        assert.equal(reservation.carType, carType, "Car type should match booked type");
        assert.equal(reservation.pickUpDate.toNumber(), pickUpDate, "Pick-up date should match booked date");
        assert.equal(reservation.dropOffDate.toNumber(), dropOffDate, "Drop-off date should match booked date");
        assert.equal(reservation.confirmed, false, "Reservation should not be confirmed initially");
        assert.equal(reservation.canceled, false, "Reservation should not be canceled initially");
    });

    it('should confirm a reservation', async () => {
        await carRentalInstance.confirmReservation(0, { from: accounts[0] });

        const reservation = await carRentalInstance.getReservation(0);

        assert.equal(reservation.confirmed, true, "Reservation should be confirmed after confirmation");
    });

    it('should cancel a reservation', async () => {
        await carRentalInstance.cancelReservation(0, { from: accounts[0] });

        const reservation = await carRentalInstance.getReservation(0);

        assert.equal(reservation.canceled, true, "Reservation should be canceled after cancellation");
    });

    it('should earn rewards', async () => {
        const rewardsBefore = await carRentalInstance.getRewards({ from: accounts[0] });

        assert.equal(rewardsBefore.toNumber(), 10, "Initial rewards should be 10 tokens");

        const carType = "Compact";
        const pickUpDate = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
        const dropOffDate = pickUpDate + (2 * 86400); // 2 days later

        await carRentalInstance.bookCar(carType, pickUpDate, dropOffDate, { from: accounts[1] });

        const rewardsAfter = await carRentalInstance.getRewards({ from: accounts[1] });

        assert.equal(rewardsAfter.toNumber(), 20, "Rewards should increase by 10 after booking another car");
    });
});
