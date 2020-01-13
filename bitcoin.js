const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

//Private key: 8d5d937adf65eabf51305c423da2e7cf0199b84a67288402bd01238bfb78db16
//Public key: 04408b669242ab18671a16dcc4eec1a4b2e76157b7f94c3a8a128edc9bb93d3223f6708749c8a57b6529505835b83211e801cdac0d756d5a5aabf34ebf490c002999

const myKey = ec.keyFromPrivate(
  "8d5d937adf65eabf51305c423da2e7cf0199b84a67288402bd01238bfb78db16"
);
const myWalletAddress = myKey.getPublic("hex");

let savjeeCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "PUBLIC KEY GOES HERE", 10);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

console.log("\n Staring the miner...");
savjeeCoin.minePendingTransactions(myWalletAddress);
console.log(
  "\n Balance of xavier is",
  savjeeCoin.getBalanceOfAddress(myWalletAddress)
);

savjeeCoin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid?", savjeeCoin.isChainValid());
