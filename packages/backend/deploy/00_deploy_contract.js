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

  const Escrow = await deploy('Escrow', {
    args,
    from: deployer,
    log: true,
    waitConfirmations: isDevelopmentNetwork ? 0 : 6,
  });
  log(`Deployed Escrow at ${Escrow.address}`);
  if (!isDevelopmentNetwork) {
    try {
      log(`Waiting for Escrow contract to be mined for verification...`);
      await run("verify:verify", {
        address: Escrow.address,
        constructorArguments: args,
      });
    } catch (e) {
      log(`Escrow contract verification failed: ${e}`);
    }
  }
};
module.exports.tags = ['all', 'exchange'];
