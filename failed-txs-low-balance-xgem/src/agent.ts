import BigNumber from 'bignumber.js'
import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
  getEthersProvider,
  ethers,
  getTransactionReceipt
} from "forta-agent";

export const ABI = `[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" } ]`
export const PAYOUT = "0x2e0f4805a0aa06ef7dbf98802e7b60f78bffb514" // XGEM payout contract
export const MIN_BALANCE = "1000000000000000000000000" // 1000000 XGEM
export const XGEM = "0x02649c1ff4296038de4b9ba8f491b42b940a8252" //  XGEM address on polygon
export const WALLET = "0x36Be77ebD06AF739227644A23Eb5014f4cd8A7fE" // admin wallet to set merkle root
export const MIN_BALANCE_MATIC = "5000000000000000000" // 5 MATIC
let BLOCK_INTERVAL = 1;

const ethersProvider = getEthersProvider()

function provideHandleTransaction(
): HandleTransaction {
  return async function handleTransaction(txEvent: TransactionEvent) {
    // report finding if a failed transaccion ocur
    const findings: Finding[] = [];

    if (txEvent.to === PAYOUT){
    const receipt =  await getTransactionReceipt(txEvent.hash);
    if (!receipt.status) {
        findings.push(
        Finding.fromObject({
          name: "Failed Txn Detection  <@U039M5TLF61> <@U03JC8YLANP> <@U03EBF13R0W>",
          description: `Failed Transactions are detected at payout contract (${PAYOUT}) `,
          alertId: "NETHFORTA-3",
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
          metadata: {
            address: JSON.stringify(txEvent.from),
            transactions: JSON.stringify(txEvent.hash)
          }
        }));
      }
    }
    BLOCK_INTERVAL = BLOCK_INTERVAL -1;
    if (BLOCK_INTERVAL === 0) { 
      BLOCK_INTERVAL = 400002;
      const erc20Contract = new ethers.Contract(XGEM, ABI, ethersProvider)
    const PAYOUTBalance = new BigNumber((await erc20Contract.balanceOf(PAYOUT, {blockTag:txEvent.blockNumber})).toString())
    if (PAYOUTBalance.isLessThan(MIN_BALANCE) && BLOCK_INTERVAL === 400002 ){
    findings.push(
      Finding.fromObject({
        name: "Minimum PAYOUT contract Balance <@U032PFCL2JW> <@U03JC8YLANP> <@U03EBF13R0W>",
        description: `PAYOUT contract XGEM balance (${PAYOUTBalance.toString()}) below threshold (1000000 XGEM) at payout contract (${PAYOUT})`,
        alertId: "FORTA-6",
        severity: FindingSeverity.Info,
        type: FindingType.Suspicious,
        metadata: {
          balance: PAYOUTBalance.toString()
        } 
      }
    ))}
    const walletBalance = new BigNumber((await ethersProvider.getBalance(WALLET, txEvent.blockNumber)).toString())
    if (walletBalance.isLessThan(MIN_BALANCE_MATIC) && BLOCK_INTERVAL  === 400002 ){
    findings.push(
      Finding.fromObject({
        name: "Minimum wallet Balance <@U032PFCL2JW> <@U03JC8YLANP> <@U03EBF13R0W>",
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
}
    return findings;
  };
}




export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction()
};
