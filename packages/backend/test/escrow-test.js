const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('Escrow', function () {
  let exchange;
  const title = "Old Fan"
  const description = "A working 1 year old fan"
  const price = ethers.utils.parseEther("0.1")
  const quantity = 1
  const images = ["https://w3s.link/cid"]

  beforeEach(async () => {
    await deployments.fixture(["all"])
    exchange = await ethers.getContract("Escrow")
  })

  it("Should create a new item", async function () {
    const tx = await exchange.createItem(title, description, price, quantity, images)
    await tx.wait()

    const item = await exchange.getItem(0)
    expect(item.itemId).equal(0);
  });

  it("Should create a new item and order it", async function () {
    const [_, buyer] = await ethers.getSigners()
    let tx = await exchange.createItem(title, description, price, quantity, images)
    await tx.wait()

    tx = await exchange.connect(buyer).orderItem(0, 1, { value: price })
    await tx.wait()
    expect(await exchange.totalOrders()).equal(1);
  });
});
