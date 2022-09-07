import { Address, BigInt } from '@graphprotocol/graph-ts';
import { ADDRESS_ZERO, BIG_DECIMAL_1E18,  BIG_INT_ZERO, MASTER_CHEF_ADDRESS } from '../../../packages/constants/index.template';
import { Deposit as DepositEvent,
    Withdraw as WithdrawEvent,
} from '../../generated/MasterChef/MasterChef' 
import { MasterChef as MasterChefContract } from '../../generated/MasterChef/MasterChef';
 
import {  getMasterChef, getMasterChefFactory, getTransactionMasterChef, getUserMasterChef } from '../enitites'

export function getPoolAddressByPid(number: BigInt): Address {
    const contract = MasterChefContract.bind(MASTER_CHEF_ADDRESS)
  
    // try types uint8 for decimals
  
    const decimalResult = contract.try_poolInfo(number)
  
    if (!decimalResult.reverted) {
        let decimalValue = decimalResult.value.value0
        return decimalValue
    }
  
    return ADDRESS_ZERO
  }
export function onDeposit(event: DepositEvent): void {
  getMasterChefFactory();
  let masterChef = getMasterChef();
  let transactionMasterChef = getTransactionMasterChef(event.transaction.hash.toHex());
  let userMasterChef = getUserMasterChef(event.params.user);
  if (event.params.amount.equals(BIG_INT_ZERO)) {
    transactionMasterChef.type = "HARVEST";
  } else {
    const amount = event.params.amount.toBigDecimal().div(BIG_DECIMAL_1E18);
    transactionMasterChef.type = "DEPOSIT";
    transactionMasterChef.lpTokenAmount = amount;
    userMasterChef.totalDeposited = userMasterChef.totalDeposited.plus(amount)
  }
  transactionMasterChef.userMasterChef = userMasterChef.id;
  transactionMasterChef.timestamp = event.block.timestamp;
  masterChef.recentTimestamp = event.block.timestamp;
  masterChef.recentTransactionMasterChef = transactionMasterChef.id;
  const lpToken = getPoolAddressByPid(event.params.pid);
  if (lpToken.notEqual(ADDRESS_ZERO)) {
    transactionMasterChef.lpToken = lpToken.toHex();
  }
  transactionMasterChef.save();
  userMasterChef.save();
  masterChef.save(); 
}
export function onWithdraw(event: WithdrawEvent): void {
    getMasterChefFactory();
    let masterChef = getMasterChef();
    let transactionMasterChef = getTransactionMasterChef(event.transaction.hash.toHex());
    let userMasterChef = getUserMasterChef(event.params.user);

    const amount = event.params.amount.toBigDecimal().div(BIG_DECIMAL_1E18);
    transactionMasterChef.type = "WITHDRAW";
    transactionMasterChef.lpTokenAmount = amount;
    userMasterChef.totalWithdrawn = userMasterChef.totalWithdrawn.plus(amount)

    transactionMasterChef.userMasterChef = userMasterChef.id;
    transactionMasterChef.timestamp = event.block.timestamp;
    masterChef.recentTimestamp = event.block.timestamp;
    masterChef.recentTransactionMasterChef = transactionMasterChef.id;
    const lpToken = getPoolAddressByPid(event.params.pid);
    if (lpToken.notEqual(ADDRESS_ZERO)) {
        transactionMasterChef.lpToken = lpToken.toHex();
    }
    transactionMasterChef.save();
    userMasterChef.save();
    masterChef.save();
}
