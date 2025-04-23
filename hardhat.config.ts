import dotenv from "dotenv";
import HardhatMocha from "@nomicfoundation/hardhat-mocha";
import HardhatEthers from "@nomicfoundation/hardhat-ethers";
dotenv.config();
const {
    NODE_URL,
    INFURA_KEY,
    MNEMONIC,
    ETHERSCAN_API_KEY,
    PK,
    SOLIDITY_VERSION,
    SOLIDITY_SETTINGS,
    HARDHAT_ENABLE_ZKSYNC = "0",
    HARDHAT_CHAIN_ID = 31337,
} = process.env;
const defaultSolidityVersion = "0.7.6";
const primarySolidityVersion = SOLIDITY_VERSION || defaultSolidityVersion;
const soliditySettings = SOLIDITY_SETTINGS ? JSON.parse(SOLIDITY_SETTINGS) : undefined;

export default {
    plugins: [HardhatMocha, HardhatEthers],
    solidity: {
        compilers: [{ version: primarySolidityVersion, settings: soliditySettings }, { version: defaultSolidityVersion }],
    },
    paths: {
        artifacts: "build/artifacts",
        cache: "build/cache",
        deploy: "src/deploy",
        sources: "contracts",
    },
};
