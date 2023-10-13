## Governance Protocol Client App

This is a demo portfolio frontend project of a DAO / Governance Protocol. That connects to the protocol through a Node/Nest.js API to optimise communication with the blockchain.

### Features

- Proposals list: Home page shows the latest proposals
- Connect your wallet and see your account's balance.
- Create NEW proposals by clicking the **New Proposal** button.
- Vote on proposals
- Click on a proposal to view stats:
  - **Proposal status**:
    - **_Pending_**: proposal created, voting is not available (awaiting for VOTING_DELAY_PERIOD)
    - **_Active_**: users can vote
    - **_Success_**: the votes reached minimum quorum so the porposal will be queued and executed
    - **_Executed_**: proposal changes added to the governed contract
    - **_Defeated_**: proposal reached deadline without recahing the minimum quorum (QUORUM_PERCENTAGE is set to 10% in the protocol)
    - **_Canceled_**: proposal canceled by its proposer
  - **Votes amounts** measured in **voting power** (Governance Token allocation in each voter's wallet)
  - **Block Deadline**: last block to be mined before voting period finishes
  - **Voting control** buttons

<img src='./public/readme-banner.png' />

## Getting Started

> **Hint:**<br />
> The protocol is currently deployed on the Sepolia Testnet ('sepolia').
> Setting up testing environments locally can be somewhat challenging.<br />
> Therefore, I recommend using the existing deployment or another
> real testnet to interact with the app without any issues.

**IMPORTANT:** The client app connects to the blockchian through a service, so first it's necessary to set up and run the Nest.js server API `dao-protocol` (repository)

Create environment variables.

```
# .env

NEXT_PUBLIC_API_URL=<SERVER_API_URL>
NEXT_PUBLIC_NETWORK=<NETWORK_NAME>
```

Install packages:

```bash
npm install
# or
yarn
```

## Extra steps for Local network

When running protocol/client apps in a local environment, a few extra steps are needed.

Set up network in `.env` file

```bash
# .env
NETWORK="hardhat"
```

### **Set up MetaMask** Account:

When running the local hardhat blockchain (`npx hardhat node` in new terminal), the protocol will be deployed in a local hardhat blockchain, by one of the fake accounts created (Account #0). This account will allocate all governance tokens, which should be distributed among the other accounts (community members).
The accounts list will appear in the terminal process. You should copy the pryvate key of **Account #0**

It will look like this

```bash
# ...
# ... previous deployment logs
Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

# ...
# ...and so on (it creates 20 fake accounts)
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Optionally, `NETWORK` can be overrided at command line level

```bash
# example

NETWORK=sepolia yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
