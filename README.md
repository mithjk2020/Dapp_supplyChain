# Clone the repository
git clone https://github.com/mithjk2020/Dapp_supplyChain.git
cd Dapp_supplyChain

npm install

# Deploy contracts to the local network (Ganache)
truffle migrate --network development

truffle migrate --reset --network development

# Navigate to the frontend and install dependencies
cd ../myapp
npm install

npm start

# Compile contracts
truffle compile

# Test contracts
truffle test

