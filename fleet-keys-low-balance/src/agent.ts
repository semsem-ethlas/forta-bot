import BigNumber from "bignumber.js";
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

export const ABI = `[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "type": "function" } ]`;
export const WMATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"; //  WMATIC address on polygon
export const MIN_BALANCE_MATIC = "5000000000000000000"; // 5 MATIC
export const prod_fleet_key_0 = "0x7F44a7aCEe16f4818F9992B6F460B1F03E1A1f56"; // fleet_keys
export const prod_fleet_key_1 = "0xEb09cA0555c52ba72A9f90df4036A792004a1701"; // fleet_keys
export const prod_fleet_key_2 = "0x18220cA10Bb57Ae1346869407eB68314467065F6"; // fleet_keys
export const prod_fleet_key_3 = "0x9Ae73b45142994a0D804a4a3E79Aa29CB0153cEc"; // fleet_keys
export const prod_fleet_key_4 = "0xEFfb442428c605FddF96eac48a9E4A175F7E9d5e"; // fleet_keys
export const prod_fleet_key_5 = "0x69B8eD0c27BAB4018e8F00f6986a28f095A27255"; // fleet_keys
export const prod_fleet_key_6 = "0x0F5C670940514243Aa87979e546F69d764979C94"; // fleet_keys
export const prod_fleet_key_7 = "0xEE9bF38e56f33b7eEFF35bfA07B4AC134FC45B97"; // fleet_keys
export const prod_fleet_key_8 = "0x3874F87774404DE033BC4eD655DBC441d27e3024"; // fleet_keys
export const stage_fleet_key_0 = "0x434007C622B12d34B9e2AF32631b987FD3645F26"; // fleet_keys
export const stage_fleet_key_1 = "0x4a61AA9cA3122199FbC4b9f8FbD43e4a869E70B5"; // fleet_keys
export const stage_fleet_key_2 = "0x2Da4573998Af6b0d3e911038DA91168B038a39fA"; // fleet_keys
export const stage_fleet_key_3 = "0xA154da0C34F40E43C89c9beaC3622C263f7D992d"; // fleet_keys
export const stage_fleet_key_4 = "0xdd84c6E3A508fcFAE261b2355ACf83DEcd15f2De"; // fleet_keys
export const stage_fleet_key_5 = "0x30f90d64e11FB530e504Efb13fc66851882D4053"; // fleet_keys
export const stage_fleet_key_6 = "0x33b6BE3256fd36d8FAC7f68fe7cac6652049dF4C"; // fleet_keys
export const stage_fleet_key_7 = "0x39e7806d91CE361CfF9C81a44F8967a89968fa5C"; // fleet_keys
export const stage_fleet_key_8 = "0xBC55F54409Dbc048c18cf1ee9c1Ccf8fb65B2B51"; // fleet_keys
export const MIN_BALANCE_pink_panther = "20000000000000000000"; // 20 MATIC or WMATIC
export const stage_pink_panther_1 = "0xEBDD4C4d5394B4A576737d6290CBf4495fe46442"; // WMATIC Gas allowance key to fund NFT transfer for pink panther
export const stage_pink_panther_2 = "0x8B81415D2e54497887938fA0e114fd6683750C3f"; // Key to fund NFT mint for pink panther
export const stage_pink_panther_3 = "0x3F2217849Db98024e538F76D19108e1cC77A5F43"; // Backup Key to fund NFT mint for pink panther
export const prod_pink_panther1 = "0xfC587834673552395FC2a1505e9C3F409563b7Bc"; // WMATIC Gas allowance key to fund NFT transfer for pink panther
export const prod_pink_panther2 = "0x471c68B2D48D018d708ae477b33115834d5deC6C"; // Key to fund NFT mint for pink panther
export const prod_pink_panther3 = "0xb517088aD6e840C2EEEeD9e843E2ddC8869e5614"; // Backup Key to fund NFT mint for pink panther

let BLOCK_INTERVAL = 1;

const ethersProvider = getEthersProvider();

function provideHandleTransaction(): HandleTransaction {
  return async function handleTransaction(txEvent: TransactionEvent) {
    // report finding if a failed transaccion ocur
    const findings: Finding[] = [];
    var hours = new Date().getUTCHours();
    var minutes = new Date().getUTCMinutes();
    var seconds = new Date().getUTCSeconds();
    console.log("hours: " + hours);
    console.log(BLOCK_INTERVAL);
    BLOCK_INTERVAL = BLOCK_INTERVAL - 1;
    if (BLOCK_INTERVAL === 0) {
      BLOCK_INTERVAL = 418000;
    }
    if (BLOCK_INTERVAL === 418000) {
      const walletBalance_prod_fleet_key_0 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_0, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_0.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 418000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_0.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_0})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_0.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 417000) {
      const walletBalance_prod_fleet_key_1 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_1, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_1.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 417000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_1.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_1})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_1.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 416000) {
      const walletBalance_prod_fleet_key_2 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_2, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_2.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 416000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_2.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_2})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_2.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 415000) {
      const walletBalance_prod_fleet_key_3 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_0, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_3.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 415000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_3.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_3})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_3.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 414000) {
      const walletBalance_prod_fleet_key_4 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_4, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_4.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 414000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_4.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_4})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_4.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 413000) {
      const walletBalance_prod_fleet_key_5 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_5, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_5.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 413000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_5.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_5})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_5.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 412000) {
      const walletBalance_prod_fleet_key_6 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_6, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_6.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 412000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_6.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_6})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_6.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 411000) {
      const walletBalance_prod_fleet_key_7 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_7, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_7.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 411000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_7.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_7})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_7.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 410000) {
      const walletBalance_prod_fleet_key_8 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_8, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_fleet_key_8.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 410000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_fleet_key_8.toString()
            )}) below threshold (5 MATIC) at wallet (${prod_fleet_key_8})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_fleet_key_8.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 409000) {
      const walletBalance_stage_fleet_key_0 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_0, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_0.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 409000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_0.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_0})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_0.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 408000) {
      const walletBalance_stage_fleet_key_1 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_1, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_1.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 408000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_1.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_1})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_1.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 407000) {
      const walletBalance_stage_fleet_key_2 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_2, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_2.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 407000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_2.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_2})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_2.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 406000) {
      const walletBalance_stage_fleet_key_3 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_3, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_3.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 406000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_3.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_3})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_3.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 405000) {
      const walletBalance_stage_fleet_key_4 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_4, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_4.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 405000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_4.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_4})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_4.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 404000) {
      const walletBalance_stage_fleet_key_5 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_5, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_5.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 404000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_5.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_5})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_5.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 403000) {
      const walletBalance_stage_fleet_key_6 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_6, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_6.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 403000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_6.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_6})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_6.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 402000) {
      const walletBalance_stage_fleet_key_7 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_7, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_7.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 402000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_7.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_7})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_7.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 401000) {
      const walletBalance_stage_fleet_key_8 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_8, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_fleet_key_8.isLessThan(MIN_BALANCE_MATIC) &&
        BLOCK_INTERVAL === 401000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum fleet_key wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_fleet_key_8.toString()
            )}) below threshold (5 MATIC) at wallet (${stage_fleet_key_8})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_fleet_key_8.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 400000) {
      const walletBalance_stage_pink_panther_2 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_pink_panther_2, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_pink_panther_2.isLessThan(MIN_BALANCE_pink_panther) &&
        BLOCK_INTERVAL === 400000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum pink panther wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_pink_panther_2.toString()
            )}) below threshold (20 MATIC) at wallet (${stage_pink_panther_2})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_pink_panther_2.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 399000) {
      const walletBalance_stage_pink_panther_3 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_pink_panther_3, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_stage_pink_panther_3.isLessThan(MIN_BALANCE_pink_panther) &&
        BLOCK_INTERVAL === 399000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum pink panther wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_pink_panther_3.toString()
            )}) below threshold (20 MATIC) at wallet (${stage_pink_panther_3})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_pink_panther_3.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 398000) {
      const walletBalance_prod_pink_panther2 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_pink_panther2, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_pink_panther2.isLessThan(MIN_BALANCE_pink_panther) &&
        BLOCK_INTERVAL === 398000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum pink panther wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_pink_panther2.toString()
            )}) below threshold (20 MATIC) at wallet (${prod_pink_panther2})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_pink_panther2.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 397000) {
      const walletBalance_prod_pink_panther3 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_pink_panther3, txEvent.blockNumber)
        ).toString()
      );
      if (
        walletBalance_prod_pink_panther3.isLessThan(MIN_BALANCE_pink_panther) &&
        BLOCK_INTERVAL === 397000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum pink panther wallet Balance <@U038711QCNT>",
            description: `wallet MATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_pink_panther3.toString()
            )}) below threshold (20 MATIC) at wallet (${prod_pink_panther3})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_pink_panther3.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 396000) {
      const erc20Contract = new ethers.Contract(WMATIC, ABI, ethersProvider);
      const walletBalance_prod_pink_panther1 = new BigNumber(
        (
          await erc20Contract.balanceOf(prod_pink_panther1, {
            blockTag: txEvent.blockNumber
          })
        ).toString()
      );
      if (
        walletBalance_prod_pink_panther1.isLessThan(MIN_BALANCE_pink_panther) &&
        BLOCK_INTERVAL === 396000
      ) {
        findings.push(
          Finding.fromObject({
            name: "production Minimum pink panther wallet Balance <@U038711QCNT>",
            description: `wallet WMATIC balance (${ethers.utils.formatEther(
              walletBalance_prod_pink_panther1.toString()
            )}) below threshold (20 MATIC) at wallet (${prod_pink_panther1})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_prod_pink_panther1.toString()
            }
          })
        );
      }
    }
    if (BLOCK_INTERVAL === 395000) {
      const erc20Contract = new ethers.Contract(WMATIC, ABI, ethersProvider);
      const walletBalance_stage_pink_panther_1 = new BigNumber(
        (
          await erc20Contract.balanceOf(stage_pink_panther_1, {
            blockTag: txEvent.blockNumber
          })
        ).toString()
      );
      if (
        walletBalance_stage_pink_panther_1.isLessThan(MIN_BALANCE_pink_panther) &&
        BLOCK_INTERVAL === 395000
      ) {
        findings.push(
          Finding.fromObject({
            name: "stage Minimum pink panther wallet Balance <@U038711QCNT>",
            description: `wallet WMATIC balance (${ethers.utils.formatEther(
              walletBalance_stage_pink_panther_1.toString()
            )}) below threshold (20 MATIC) at wallet (${stage_pink_panther_1})`,
            alertId: "FORTA-6",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata: {
              balance: walletBalance_stage_pink_panther_1.toString()
            }
          })
        );
      }
    }
    if (hours == 2 && minutes == 0 && seconds == 0) {
      console.log("hours: " + hours);
      console.log("minutes: " + minutes);
      console.log("seconds: " + seconds);
      const walletBalance_prod_fleet_key_0 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_0, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_1 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_1, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_2 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_2, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_3 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_0, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_4 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_4, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_5 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_5, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_6 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_6, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_7 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_7, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_fleet_key_8 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_fleet_key_8, txEvent.blockNumber)
        ).toString()
      );
      const walletBalance_prod_pink_panther2 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_pink_panther2, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_prod_pink_panther3 = new BigNumber(
        (
          await ethersProvider.getBalance(prod_pink_panther3, txEvent.blockNumber)
        ).toString()
      );
      const erc20Contract = new ethers.Contract(WMATIC, ABI, ethersProvider);
      const walletBalance_prod_pink_panther1 = new BigNumber(
        (
          await erc20Contract.balanceOf(prod_pink_panther1, {
            blockTag: txEvent.blockNumber
          })
        ).toString()
      );

      findings.push(
        Finding.fromObject({
          name: "<!here> production fleet_keys & pink_panther Balance",
          description: `fleet_key_0 (${prod_fleet_key_0}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_0.toString()
          )})
          fleet_key_1 (${prod_fleet_key_1}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_1.toString()
          )})
          fleet_key_2 (${prod_fleet_key_2}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_2.toString()
          )})
          fleet_key_3 (${prod_fleet_key_3}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_3.toString()
          )})
          fleet_key_4 (${prod_fleet_key_4}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_4.toString()
          )})
          fleet_key_5 (${prod_fleet_key_5}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_5.toString()
          )})
          fleet_key_6 (${prod_fleet_key_6}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_6.toString()
          )})
          fleet_key_7 (${prod_fleet_key_7}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_7.toString()
          )})
          fleet_key_8 (${prod_fleet_key_8}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_fleet_key_8.toString()
          )})
          pink_panther_1 (${prod_pink_panther1}) WMATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_pink_panther1.toString()
          )})
          pink_panther_2 (${prod_pink_panther2}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_pink_panther2.toString()
          )})
          pink_panther_3 (${prod_pink_panther3}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_prod_pink_panther3.toString()
          )}) `,
          alertId: "prod-1",
          severity: FindingSeverity.Info,
          type: FindingType.Suspicious,
          metadata: {
            balance: walletBalance_prod_pink_panther1.toString()
          }
        })
      );
    }
    if (hours == 2 && minutes == 10 && seconds == 0) {
      console.log("hours: " + hours);
      console.log("minutes: " + minutes);
      console.log("seconds: " + seconds);
      const walletBalance_stage_fleet_key_0 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_0, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_1 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_1, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_2 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_2, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_3 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_3, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_4 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_4, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_5 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_5, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_6 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_6, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_7 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_7, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_fleet_key_8 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_fleet_key_8, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_pink_panther_2 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_pink_panther_2, txEvent.blockNumber)
        ).toString()
      );

      const walletBalance_stage_pink_panther_3 = new BigNumber(
        (
          await ethersProvider.getBalance(stage_pink_panther_3, txEvent.blockNumber)
        ).toString()
      );

      const erc20Contract = new ethers.Contract(WMATIC, ABI, ethersProvider);
      const walletBalance_stage_pink_panther_1 = new BigNumber(
        (
          await erc20Contract.balanceOf(stage_pink_panther_1, {
            blockTag: txEvent.blockNumber
          })
        ).toString()
      );

      findings.push(
        Finding.fromObject({
          name: "<!here> staging fleet_keys & pink_panther Balance",
          description: `fleet_key_0 (${stage_fleet_key_0}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_0.toString()
          )})
          fleet_key_1 (${stage_fleet_key_1}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_1.toString()
          )})
          fleet_key_2 (${stage_fleet_key_2}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_2.toString()
          )})
          fleet_key_3 (${stage_fleet_key_3}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_3.toString()
          )})
          fleet_key_4 (${stage_fleet_key_4}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_4.toString()
          )})
          fleet_key_5 (${stage_fleet_key_5}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_5.toString()
          )})
          fleet_key_6 (${stage_fleet_key_6}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_6.toString()
          )})
          fleet_key_7 (${stage_fleet_key_7}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_7.toString()
          )})
          fleet_key_8 (${stage_fleet_key_8}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_fleet_key_8.toString()
          )})
          pink_panther_1 (${stage_pink_panther_1}) WMATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_pink_panther_1.toString()
          )})
          pink_panther_2 (${stage_pink_panther_2}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_pink_panther_2.toString()
          )})
          pink_panther_3 (${stage_pink_panther_3}) MATIC balance (${ethers.utils.formatEther(
            walletBalance_stage_pink_panther_3.toString()
          )}) `,
          alertId: "stage-1",
          severity: FindingSeverity.Info,
          type: FindingType.Suspicious,
          metadata: {
            balance: walletBalance_stage_pink_panther_1.toString()
          }
        })
      );
    }
    return findings;
  };
}

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction()
};
