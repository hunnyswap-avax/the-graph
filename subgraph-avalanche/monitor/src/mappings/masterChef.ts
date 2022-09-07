import { Address } from '@graphprotocol/graph-ts';
import { ADDRESS_ZERO, BIG_DECIMAL_1E18, BIG_DECIMAL_ZERO, BIG_INT_ONE } from '../../../packages/constants/index.template';
import { Deposit as DepositEvent,
    Withdraw as WithdrawEvent,
} from '../../generated/MasterChef/MasterChef'
import { LpPool, MasterChef } from '../../generated/schema';
import { Transfer as TransferEvent
} from '../../generated/templates/LpToken/LpToken'
import {  getMasterChef, getMasterChefFactory, getTransactionMasterChef, getUserMasterChef } from '../enitites'

export function onDeposit(event: DepositEvent): void {
  getMasterChefFactory();
  let masterChef = getMasterChef();
  let transactionMasterChef = getTransactionMasterChef(event.transaction.hash.toHex());
  let userMasterChef = getUserMasterChef(event.params.user);
  if (event.params.amount.equals(BIG_INT_ONE)) {
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

}
export function onWithdraw(event: WithdrawEvent): void {
    getMasterChefFactory();
    let masterChef = getMasterChef();
    let transactionMasterChef = getTransactionMasterChef(event.transaction.hash.toHex());
    let userMasterChef = getUserMasterChef(event.params.user);
    if (event.params.amount.equals(BIG_INT_ONE)) {
      transactionMasterChef.type = "HARVEST";
    } else {
      const amount = event.params.amount.toBigDecimal().div(BIG_DECIMAL_1E18);
      transactionMasterChef.type = "WITHDRAW";
      transactionMasterChef.lpTokenAmount = amount;
      userMasterChef.totalWithdrawn = userMasterChef.totalWithdrawn.plus(amount)
    }
    transactionMasterChef.userMasterChef = userMasterChef.id;
    transactionMasterChef.timestamp = event.block.timestamp;
    masterChef.recentTimestamp = event.block.timestamp;
    masterChef.recentTransactionMasterChef = transactionMasterChef.id;
}

export function onTransfer(event: TransferEvent): void {
    getMasterChefFactory();
    const masterChef = MasterChef.load(event.address.toHex());
    if(masterChef === null) {
        return
    }
    const value = event.params.value.divDecimal(BIG_DECIMAL_1E18)
    let transactionMasterChef = getTransactionMasterChef(event.transaction.hash.toHex());
    let userMasterChef = getUserMasterChef(event.params.to);
    if (event.params.from.toHex() == masterChef.id) {
        userMasterChef.totalHarvest = userMasterChef.totalHarvest.plus(value);
    }
    transactionMasterChef.harvestAmount = transactionMasterChef.harvestAmount.plus(value);
    transactionMasterChef.timestamp = event.block.timestamp;
    masterChef.recentTimestamp = event.block.timestamp;
    masterChef.recentTransactionMasterChef = transactionMasterChef.id;
}