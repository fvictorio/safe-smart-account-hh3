import dotenv from "dotenv";
import HardhatMocha from "@nomicfoundation/hardhat-mocha";
import HardhatEthers from "@nomicfoundation/hardhat-ethers";
import HardhatTypechain from "@nomicfoundation/hardhat-typechain";
import HardhatEthesrChaiMatchers from "@nomicfoundation/hardhat-ethers-chai-matchers";
import { HardhatPlugin } from "hardhat/types/plugins";
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

const HardhatDeployStub: HardhatPlugin = {
    id: "hardhat-deploy",
    hookHandlers: {
        network: async () => {
            return {
                newConnection: async (context, next) => {
                    const connection = await next(context)
                    connection.deployments = {createFixture: () => () => {
                        throw new Error("not implemented")
                    }} as any;
                    return connection;
                }
            }
        }
    }
}

export default {
    plugins: [HardhatEthesrChaiMatchers, HardhatMocha, HardhatEthers, HardhatTypechain, HardhatDeployStub],
    solidity: {
        compilers: [{ version: primarySolidityVersion, settings: soliditySettings }, { version: defaultSolidityVersion }],
        dependenciesToCompile: ["@safe-global/mock-contract/contracts/MockContract.sol"]
    },
    paths: {
        artifacts: "build/artifacts",
        cache: "build/cache",
        deploy: "src/deploy",
        sources: "contracts",
    },
};
