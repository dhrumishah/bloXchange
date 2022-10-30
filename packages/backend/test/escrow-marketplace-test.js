const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('EscrowMarketplace', function () {
  let exchange;
  const title = "Old Fan"
  const description = "A working 1 year old fan"
  const price = ethers.utils.parseEther("0.1")
  const quantity = 1
  const images = ["https://w3s.link/ipfs/bafkreif356lzpsm27ibnq7y4f7thhezhhupdwsfoaiiz2dqpfu3uciol3i"]

  beforeEach(async () => {
    await deployments.fixture(["all"])
    exchange = await ethers.getContract("EscrowMarketplace")
  })

  it("Should create a new item", async function () {
    const tx = await exchange.createItem(title, description, price, quantity, images)
    await tx.wait()

    const totalItems = await exchange.totalItems()
    expect(totalItems).equal(1);
  });

  it("Should create a new item and order it", async function () {
    const itemId = 0;
    const orderId = 0;
    const [_, buyer] = await ethers.getSigners()
    // seller create a item to sell
    let tx = await exchange.createItem(title, description, price, quantity, images)
    await tx.wait()
    // buyer order that item
    tx = await exchange.connect(buyer).orderItem(itemId, 1, { value: price })
    await tx.wait()
    expect(await exchange.totalOrders()).equal(1);
    // seller performs the shipping
    tx = await exchange.performShipping(orderId);
    await tx.wait()
    const buyerPreviousBalance = await buyer.getBalance()
    // buyer confirms the delivery
    tx = await exchange.connect(buyer).confirmDelivery(orderId);
    await tx.wait()
    const buyerAfterBalance = await buyer.getBalance()
    expect(buyerPreviousBalance.sub(buyerAfterBalance).lte(price)).equal(true);
  });
});
