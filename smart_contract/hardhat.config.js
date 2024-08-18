
require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity: "0.8.0",
  networks:{
    sepolia:{
      url: `https://eth-sepolia.g.alchemy.com/v2/hMkKTFQ4CF2OwZiAsu6VCAOwPC0znLqz`,
      accounts:[`b58d4b8c170385033a35217ebd8e54b235a2b029743ff5b4d2adb47a5d57f3c9`]
    }
  }
};

