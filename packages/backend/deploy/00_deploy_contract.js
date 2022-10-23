// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = [0, 0];
  await deploy('Escrow', {
    args: args,
    from: deployer,
    log: true,
  });
};
module.exports.tags = ['all', 'exchange'];
