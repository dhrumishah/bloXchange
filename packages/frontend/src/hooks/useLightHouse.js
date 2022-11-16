import lighthouse from '@lighthouse-web3/sdk';
import contracts from "../../contracts/hardhat_contracts.json";
import { NETWORK_ID as chainId } from "../config";
import axios from "axios"


export default function useLightHouse(address, signer) {
  const marketplaceAddress =
    contracts[chainId][0].contracts.EscrowMarketplace.address;

  const signMessage = async () => {
    const res = await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`);
    const message = res.data;
    const signedMessage = await signer.signMessage(message);
    return ({
      message: message,
      signedMessage: signedMessage,
      address: address
    });
  }

  const encryptionSignature = async () => {
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
  }

  const accessControl = async (cid) => {
    const publicKey = address;

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Mumbai",
        method: "canAccessProfile",
        standardContractType: "Custom",
        contractAddress: marketplaceAddress,
        returnValueTest: {
          comparator: "==",
          value: "true"
        },
        parameters: [address, ":userAddress"],
        inputArrayType: ["address", "address"],
        outputType: "bool"
      }
    ];

    const aggregator = null;

    const signedMessage = await encryptionSignature();
    /*
      accessCondition(publicKey, cid, fileEncryptionKey, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions, in this example we used and
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    // // Display response
    console.log(response);
    /*
      shared
    */
  }


  /* Upload with encryption */
  const uploadEncrypted = async (e) => {
    // Get bearer token
    const signingResponse = await signMessage();
    const accessToken = (await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
      publicKey: signingResponse.address,
      signedMessage: signingResponse.signedMessage
    })).data.accessToken;

    const publicKey = signingResponse.address;

    /*
       uploadEncrypted(e, publicKey, accessToken)
       - e: js event
       - publicKey: wallets public key
       - accessToken: token to upload
       - signedMessage: message signed by owner of publicKey
    */
    const encryptionSig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      publicKey,
      accessToken,
      encryptionSig
    );
    /*
      output:
        {
          Name: "main-qimg-6282220880e320c7889fec27a20e2eee-lq.jpg",
          Size: "44561",
          Hash: "QmcnzVoLcFcLzwUyjgtVmf2JQbPL5gbffNhjQFxre8aYvU"
        }
      Note: Hash in response is CID.
    */
    console.log(response)
    await accessControl(response.Hash);
    return response.Hash;
  }

  /* Decrypt */
  const decrypt = async (cid) => {
    // Fetch file encryption key
    const signedMessage = await encryptionSignature();
    const publicKey = address;

    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of file to decrypt
          publicKey: public key of user who has access of file or owner
          signedMessage: message signed by owner of publicKey
    */
    const key = (await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    )).data.key;

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of file to decrypt
          key: key to decrypt file
          mimeType: default null, mime type of file
    */

    const decrypted = await lighthouse.decryptFile(cid, key, "application/json");

    return JSON.parse(await decrypted.text());
  }

  return {
    uploadEncrypted,
    decrypt
  }
};
