import Web3 from "web3";
import TeebNFT from "./contracts/TeebNFT.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [TeebNFT],
  events: {
    TeebNFT: ["AdminAdded", "AdminRemoved", "DoctorAdded", "DoctorRemoved"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
