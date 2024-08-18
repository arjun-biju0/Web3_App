
# Sperax Submission

This repository contains the source code for the Sperax Submission. It includes a frontend client and a smart contract deployed on the Ethereum Sepolia testnet.


# Demo

Live Demo link to the project

https://delightful-mooncake-296cfb.netlify.app/


# Prerequisites

- Node.js and npm installed
- Hardhat (for smart contract deployment)
- MetaMask extension (for interacting with the dApp)

# Installation

### 1. **Clone the repository:**
   ```
   git clone https://github.com/arjun-biju0/Sperax_submission.git
   ```
### 2. **Navigate to the project directory:**
   ```
   cd Sperax_submission
   ```

### 3. **Frontend Setup**
```
cd client
npm install
npm run dev
```



### 4. **Smart Contract Setup**
Navigate to the smart_contract directory and Install dependencies
```
cd ../smart_contract
npm install

```
Compile the smart contract
```
npx hardhat compile
```
Deploy the smart contract to the Sepolia testnet

```
npx hardhat run scripts/deploy.js --network sepolia

```







