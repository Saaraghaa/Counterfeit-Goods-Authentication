module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganache's default address
      port: 7545, // Ganache's default port
      network_id: "5777", // Match Ganache's network ID
    },
  },
  compilers: { 
      solc: {
        version: "^0.8.0", 
      }
    }
}; 

const LuxuryGoods = artifacts.require("LuxuryGoods"); 

module.exports = function (deployer) {
  deployer.deploy(LuxuryGoods);
};
