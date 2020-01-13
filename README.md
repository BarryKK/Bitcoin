
<p align="center"> 
  <img src="https://user-images.githubusercontent.com/19600132/72232345-8dc85000-35fb-11ea-9b3c-b385c18406cf.jpg">
</p>

# BitCoin

> 此项目用于学习基本区块链知识，Javascript练习以及翻译练习  <br /> 
> 原文地址：https://github.com/Savjee/SavjeeCoin#create-a-blockchain-instance

## 特性
* 区块链核实（验证最长链，防止私自更改）
* 生成钱包
* 交易签署 （生成私钥/公钥）

## library
* elliptic -  生成用户私钥/公钥
* crypto-js - 使用SHA256算法加密交易记录

## 生成密钥对
crypto-js库可以使用户创建自己的公钥与私钥，公钥就成为了用户的交易地址，私钥用于加密交易。
```javascript
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.genKeyPair();
```
myKey对象包括了公钥与私钥：
```javascript
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));
```
建立Blockchain实例
```javascript
const {Blockchain, Transaction} = require('savjeecoin');

const myChain = new Blockchain();
```
添加交易
```javascript
//从“我的钱包”转出100个比特币到toAddress
const tx = new Transaction(myKey.getPublic('hex'), 'toAddress', 100);
tx.signTransaction(myKey);

myChain.addTransaction(tx);
```
为了完成这次交易，我们需要采出一个新的“块”。我们将自己钱包的地址传入这个方法，从而接受挖矿奖励。
```javascript
myChain.minePendingTransactions(myKey.getPublic('hex'));
```
