import "hardhat/types/network";

type Deployments = {
  fixture: () => Promise<void>;
}

declare module "hardhat/types/network" {
  interface NetworkConnection<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the ChainTypeT must be declared in the interface but in this scenario it's not used
    ChainTypeT extends ChainType | string = DefaultChainType,
  > {
    deployments: {
      createFixture: <T>(fixture: (fixtureArgs: {deployments: Deployments}) => Promise<T>) => () => Promise<T>,
      get: (name: string) => Promise<{address: string}>
    };
  }
}
