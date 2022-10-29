// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const isDevelopmentNetwork =
    network.name === "hardhat" || network.name === "localhost";
  const platformFee = 0;
  const arbitratorFee = 0;
  const trustedForwarderAddress = process.env.TRUSTED_FORWARDER_ADDRESS;
  const args = [trustedForwarderAddress, platformFee, arbitratorFee];

  const EscrowMarketplace = await deploy('EscrowMarketplace', {
    args,
    from: deployer,
    log: true,
    waitConfirmations: isDevelopmentNetwork ? 0 : 6,
  });
  log(`Deployed EscrowMarketplace at ${EscrowMarketplace.address}`);
  if (!isDevelopmentNetwork) {
    try {
      log(`Waiting for EscrowMarketplace contract to be mined for verification...`);
      await run("verify:verify", {
        address: EscrowMarketplace.address,
        constructorArguments: args,
      });
    } catch (e) {
      log(`EscrowMarketplace contract verification failed: ${e}`);
    }
  }
};
module.exports.tags = ['all', 'exchange'];
