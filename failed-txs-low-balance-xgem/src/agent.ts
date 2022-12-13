import BigNumber from 'bignumber.js'
import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
  BlockEvent,
  HandleBlock,
  getEthersProvider,
  ethers
} from "forta-agent";
import FailureCounter from "./failure.counter";

export const HIGH_FAILURE_THRESHOLD: number = 0;
export const TIME_INTERVAL: number = 1; // 1 min
export const INTERSTING_PROTOCOLS: string[] = [
  "0x2e0f4805a0aa06ef7dbf98802e7b60f78bffb514"
];
export const ABI = `[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" } ]`
export const PAYOUT = "0x2e0f4805a0aa06ef7dbf98802e7b60f78bffb514" // XGEM payout contract
export const MIN_BALANCE = "5000000000000000000000000" // 1000000 XGEM
export const XGEM = "0x02649c1ff4296038de4b9ba8f491b42b940a8252" //  XGEM address on polygon
let BLOCK_INTERVAL = 0;
export const WALLET = "0x36Be77ebD06AF739227644A23Eb5014f4cd8A7fE" // admin wallet to set merkle root
export const MIN_BALANCE_MATIC = "50000000000000000000" // 5 MATIC
let BLOCK_INTERVAL1 = 0;

const ethersProvider = getEthersProvider()

const failureCounter: FailureCounter = new FailureCounter(
  TIME_INTERVAL,
  HIGH_FAILURE_THRESHOLD + 5
);

export const createFinding = (addr: string, txns: string[]): Finding =>
  Finding.fromObject({
    name: "Failed Txn Detection  @semsem @Mohan @Manuka Yasas",
    description: `Failed Transactions are detected at payout contract (${PAYOUT}) `,
    alertId: "NETHFORTA-3",
    type: FindingType.Suspicious,
    severity: FindingSeverity.High,
    metadata: {
      count: txns.length.toString(),
      address: addr,
      transactions: JSON.stringify(txns)
    }
  });

function provideHandleTransaction(
  counter: FailureCounter,
  protocols: string[]
): HandleTransaction {
  return async function handleTransaction(txEvent: TransactionEvent) {
    // report finding if a high volume of failed transaccion ocur within a defined time interval
    const findings: Finding[] = [];

    if (txEvent.type) return findings;

    const involvedProtocols = protocols.filter(
      (addr) => txEvent.addresses[addr.toLowerCase()]
    );
    involvedProtocols.forEach((addr) => {
      const amount = counter.failure(addr, txEvent.hash, txEvent.timestamp);
      if (amount > HIGH_FAILURE_THRESHOLD) {
        findings.push(createFinding(addr, counter.getTransactions(addr)));
      }
    });

    return findings;
  };
}


function provideHandleBlock(ethersProvider: ethers.providers.JsonRpcProvider): HandleBlock {
  return async function handleBlock(blockEvent: BlockEvent) {
    // report finding if specified PAYOUT balance falls below threshold
    const findings: Finding[] = []

    const erc20Contract = new ethers.Contract(XGEM, ABI, ethersProvider)
    const PAYOUTBalance = new BigNumber((await erc20Contract.balanceOf(PAYOUT, {blockTag:blockEvent.blockNumber})).toString())
    const walletBalance = new BigNumber((await ethersProvider.getBalance(WALLET, blockEvent.blockNumber)).toString())
    BLOCK_INTERVAL = BLOCK_INTERVAL -1;
    if (BLOCK_INTERVAL < 0) BLOCK_INTERVAL = 0;
    BLOCK_INTERVAL1 = BLOCK_INTERVAL1 -1;
    if (BLOCK_INTERVAL1 < 0) BLOCK_INTERVAL1 = 0;
    if (PAYOUTBalance.isLessThan(MIN_BALANCE) && BLOCK_INTERVAL == 0 ){
      BLOCK_INTERVAL = 4000;
    findings.push(
      Finding.fromObject({
        name: "Minimum PAYOUT contract Balance @Nick @Mohan @Manuka Yasas",
        description: `PAYOUT contract XGEM balance (${PAYOUTBalance.toString()}) below threshold (1000000 XGEM) at payout contract (${PAYOUT})`,
        alertId: "FORTA-6",
        severity: FindingSeverity.Info,
        type: FindingType.Suspicious,
        metadata: {
          balance: PAYOUTBalance.toString()
        } 
      }
    ))}
    else if (walletBalance.isLessThan(MIN_BALANCE_MATIC) && BLOCK_INTERVAL1 == 0 ){
      BLOCK_INTERVAL1 = 4000;
    findings.push(
      Finding.fromObject({
        name: "Minimum wallet Balance @Nick @Mohan @Manuka Yasas",
        description: `wallet MATIC balance (${walletBalance.toString()}) below threshold (5 MATIC) at wallet (${WALLET})`,
        alertId: "FORTA-6",
        severity: FindingSeverity.Info,
        type: FindingType.Suspicious,
        metadata: {
          balance: walletBalance.toString()
        }
      }
    ))
  }
    return findings;
  }
}



export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(failureCounter, INTERSTING_PROTOCOLS),
  provideHandleBlock,
  handleBlock: (provideHandleBlock(ethersProvider))
};
