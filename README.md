# Welcome to Bloxchange
![Black and Purple Modern Virtual Twitter Header](https://user-images.githubusercontent.com/54351909/202466660-240dc66b-da74-4c73-9689-9153d0e4cd76.png)


### What is our main idea?
<p>BloXchange is a P2P marketplace which lets users to buy and sell their used products on top of the blockchain. </p>
<br>
Users can pay in MATIC for the products they buy and uses the Escrow Contract for the payment.
<br>


---

### Which features does bloXchange offer?

- Buy any old product from the marketplace
- Sell your used products 
- File a dispute if there is something wrong with the product

---

### How did we manage the project?

We Aditya, Dhrumi and Pawan met online on Twitter and thought of participating in a hackathon together and found Chainlink Hackathon could be the best to team up and work.

We brainstormed on what could we build and came up on the idea of making a P2P marketplace to buy and sell goods. We thought for the name of the project and came up with the name bloXchange.

We made a github repository, a notion doc for building the flow of our Dapp and a whatsapp group for the communications.

Dhrumi, after doing a course of ReactJS directly participated in this hack and it has been a great learning curve for her creating medium level projects. 
Pawan got more efficient in writing the subgraphs and Aditya got to learn how to integrate subgraphs and became more confident in integrating the smart contract with the frontend.

---

## Technologies used in Bloxchange

We have used several technologies to build this decentralized autonomous organization:

### IPFS/Web3.storage

All Data storage and querying is done via IPFS with help of Web3.storage SDKs and docs on the website.
**Web3.Storage** is used for storing all sort of Data including user profile, grants request and researches on **IPFS**, done with the help of the SDK provided and stored in JSON format.
The querying of the data is done with CID Gateway links and then rendered in Frontend. The CIDs are stored in contract to avoid data tampering. We take the input of the data from the user , pack it in JSON file and then upload the files IPFS via web3.storage.

Website is currently up and working on the provided link of vercel and can be tested according to the docs provided on the website.

### Biconomy

We have used Biconomy Gasless transactions to support meta transactions in our Dapp.

### LightHouse

Lighthouse is a perpetual file storage protocol that allows the ability to pay once for your files and store them long term. While traditionally, users need to recurrently keep track and pay for the file storage after every fixed interval of time, Lighthouse manages this for them and makes sure that user files are stored forever. 

It has been used to encrypt and decrypt the profile so a user profile can only be accessed by ownself and the sellers a user is buying from.


### Polygon

Our smart contract has been deployed on the Polygon Mumbai Testnet and so our infrastructure and interactions run on Polygon. 
---

## Smart Contracts

You can find the smart contract under [/packages/backend/contracts](https://github.com/adiig7/bloXchange/tree/main/packages/backend/contracts).

They conttact has been currently published on Polygon Mumbai Testnet due to testing and presentational reasons.

<br />

---

## Frontend

We have used ReactJS and TailwindCSS for the frontend.

All the frontend code is available under [/packages/frontend](https://github.com/adiig7/bloXchange/tree/main/packages/frontend).
<br />

### Frontend folders in our project:

**components** - You can find all the relevant code for frontend inside the components folder

<br />

### Other important files:

**.gitignore** - lets GitHub ignore several files like sensible data

---

## Backend

In our backend folder you can find everything that’s working behind the scenes of Bloxchange!
<br /><br /><br />

### Backend folders in our project:

**contracts** - Solidity Smart Contracts

**scripts** - deployment scripts for the Smart Contracts
<br /><br /><br />

---

### Developers

### Dhrumi Shah

**Frontend Developer**

Loves and hates CSS Simulatenously. Worked on making the frontend for the Bloxchange.

---

### Pawan Paudel

<img width="150px" src="https://raw.githubusercontent.com/pawanpaudel93/portfolio/main/public/img/me.png" />


**Blockchain Developer**

Worked on writing the smart contracts and the subgraph.

---

### Aditya Gupta

![aditya_gupta](https://user-images.githubusercontent.com/11206675/184015293-d9fc4e74-9a6a-49e7-be93-f0c7d1ebac32.jpg)

**Full Stack Web3 Developer**

Worked on making the frontend pages as well as integrating the smart contracts withe the frontend

---
