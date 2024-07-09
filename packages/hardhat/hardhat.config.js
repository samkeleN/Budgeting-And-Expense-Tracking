require("@nomiclabs/hardhat-waffle");
require("dotenv").config(); // Make sure this line is present to load the .env file

module.exports = {
    solidity: "0.8.20",
    networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.ALFAJORES_PRIVATE_KEY].filter(Boolean), // Ensure this matches your .env variable
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.CELO_PRIVATE_KEY].filter(Boolean), // Ensure this matches your .env variable
    },
  },
};