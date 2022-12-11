import BigNumber from 'bignumber.js'
import {
  BlockEvent,
  Finding,
  HandleBlock,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
  ethers,
  getEthersProvider,
  keccak256
} from "forta-agent";
import { createAddress } from "forta-agent-tools/lib/tests.utils";

export const SWAP_EVENT = "event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)";
export const UNISWAP_V3_FACTORY_ADDRESS = "0x1f98431c8ad98523631ae4a59f267346ea31f984";

//Hash of the UniswapV3Pool contract init code, used for address
const initCodeHash = "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";

//cache to store the information of a pool (token0, token1, fee, realPoolAddressOrNot) and reduce the number of network calls
const cache = new Map<string, [string, string, string, string]>([]);


export const provideHandleTx = (factory: string, theProvider: ethers.providers.Provider) => async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  // filter the transaction logs for swap events
  const swapEvents = txEvent.filterLog(
    SWAP_EVENT
  );

  const provider = theProvider;
  
  //for each swap event detected
  for(let i = 0; i < swapEvents.length; i++) {
    let token0: string = "0x0000000000000000000000000000000000000000";
    let token1: string = "0x0000000000000000000000000000000000000000";
    let fee: string = "0";
    const MIN_BALANCE = "5000000000000000000000000" 

    // extract swap event arguments
    const { sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick } = swapEvents[i].args;

    const possiblePoolAddress = swapEvents[i].address.toLowerCase();
    
    const poolContract = new ethers.Contract(possiblePoolAddress, [
      'function token0() public view returns (address)',
      'function token1() public view returns (address)',
      'function fee() public view returns (uint24)'
    ], provider);
    //if the pool is not in the cache, get its token0, token1, fee
    if(!cache.has(possiblePoolAddress)) { 
      try {
        token0 = await poolContract.token0({blockTag: txEvent.blockNumber,});
        token1 = await poolContract.token1({blockTag: txEvent.blockNumber,});
        fee = await poolContract.fee({blockTag: txEvent.blockNumber,});
        cache.set(possiblePoolAddress, [token0, token1, fee, "0x1111111111111111111111111111111111111111"]);
      }   catch (e) {cache.set(possiblePoolAddress, [token0, token1, fee, "0xe000000000000000000000000000000000000000"]); }
    }
    else if(cache.get(possiblePoolAddress)![3] == possiblePoolAddress) {
      token0 = cache.get(possiblePoolAddress)![0];
      token1 = cache.get(possiblePoolAddress)![1];
      fee = cache.get(possiblePoolAddress)![2];
    }
    //if the pool is not in the cache, confirm it's a uniswap pool
    if(cache.get(possiblePoolAddress)![3] == "0x1111111111111111111111111111111111111111") {

      //pre-compute the theoretical pool address using token0, token1, fee as salt
      const salt = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address", "address", "uint24"], [token0, token1, fee]));
      const pool = ethers.utils.getCreate2Address(UNISWAP_V3_FACTORY_ADDRESS, salt, initCodeHash).toLowerCase();
      
      if(possiblePoolAddress == pool){
        cache.set(possiblePoolAddress, [token0, token1, fee, possiblePoolAddress]);
      }
      else {
        cache.set(possiblePoolAddress, [token0, token1, fee, "0xe000000000000000000000000000000000000000"]);
      }
    }
    
    // if a Uniswap V3 swap is detected, report it
    const amount2 = await new BigNumber((- amount0).toString())
    if ((cache.get(possiblePoolAddress)![3] == possiblePoolAddress) && amount2.isGreaterThanOrEqualTo(MIN_BALANCE)) {
      findings.push(
        Finding.fromObject({
          name: "Uniswap V3 Swap",
          description: `Swap detected in pool: ${possiblePoolAddress.toLowerCase()}`,
          alertId: "UNISWAP-1",
          protocol: "uniswap v3",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          metadata: {
            sender: sender.toLowerCase(),
            recipient: recipient.toLowerCase(),
            pool: possiblePoolAddress.toLowerCase(),
            token0: token0.toLowerCase(),
            token1: token1.toLowerCase(),
            fee: fee.toString(),
            amount0: amount0.toString(),
            amount1: amount1.toString(),
          },
        })
      );

    }
  }


  return findings;
};

// const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
//   const findings: Finding[] = [];
//   // detect some block condition
//   return findings;
// }

export default {
  handleTransaction: provideHandleTx(UNISWAP_V3_FACTORY_ADDRESS, getEthersProvider()),
  // handleBlock
};
