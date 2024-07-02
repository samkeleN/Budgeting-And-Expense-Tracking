// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CarRental {
    struct Reservation {
        address renter;
        string carType;
        uint256 pickUpDate;
        uint256 dropOffDate;
        bool confirmed;
        bool canceled;
    }

    Reservation[] public reservations;
    uint256 public reservationCount;
    mapping(address => uint256) public rewards;

    event CarBooked(address indexed renter, string carType, uint256 pickUpDate, uint256 dropOffDate);
    event ReservationConfirmed(uint256 indexed reservationId);
    event ReservationCanceled(uint256 indexed reservationId);
    event RewardsEarned(address indexed renter, uint256 amount);

    constructor() {
        reservationCount = 0;
    }

    function bookCar(
        string memory _carType,
        uint256 _pickUpDate,
        uint256 _dropOffDate
    ) external {
        require(bytes(_carType).length > 0, "Car type is required");
        require(_pickUpDate < _dropOffDate, "Pick-up date must be before drop-off date");

        reservations.push(Reservation(msg.sender, _carType, _pickUpDate, _dropOffDate, false, false));
        reservationCount++;
        rewards[msg.sender] += 10; // Earn rewards for booking
        emit CarBooked(msg.sender, _carType, _pickUpDate, _dropOffDate);
        emit RewardsEarned(msg.sender, 10);
    }

    function confirmReservation(uint256 _reservationId) external {
        require(_reservationId < reservations.length, "Invalid reservation ID");
        Reservation storage reservation = reservations[_reservationId];
        require(msg.sender == reservation.renter, "Only the renter can confirm");
        require(!reservation.canceled, "Reservation is canceled");

        reservation.confirmed = true;
        emit ReservationConfirmed(_reservationId);
    }

    function cancelReservation(uint256 _reservationId) external {
        require(_reservationId < reservations.length, "Invalid reservation ID");
        Reservation storage reservation = reservations[_reservationId];
        require(msg.sender == reservation.renter, "Only the renter can cancel");
        require(!reservation.canceled, "Reservation is already canceled");

        reservation.canceled = true;
        emit ReservationCanceled(_reservationId);
    }

    function getReservation(uint256 _reservationId)
        external
        view
        returns (
            address renter,
            string memory carType,
            uint256 pickUpDate,
            uint256 dropOffDate,
            bool confirmed,
            bool canceled
        )
    {
        require(_reservationId < reservations.length, "Invalid reservation ID");
        Reservation storage reservation = reservations[_reservationId];
        return (
            reservation.renter,
            reservation.carType,
            reservation.pickUpDate,
            reservation.dropOffDate,
            reservation.confirmed,
            reservation.canceled
        );
    }

    function getRewards() external view returns (uint256) {
        return rewards[msg.sender];
    }
}