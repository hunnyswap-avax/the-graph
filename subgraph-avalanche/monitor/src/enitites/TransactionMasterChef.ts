import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO, MASTER_CHEF_ADDRESS } from '../../../packages/constants/index.template'

import { TransactionMasterChef } from '../../generated/schema'

export function getTransactionMasterChef(address:string = ADDRESS_ZERO.toHex()): TransactionMasterChef {
  let transactionMasterChef = TransactionMasterChef.load(address)

  // If no user, create one
  if (transactionMasterChef === null) {
    transactionMasterChef = new TransactionMasterChef(address)
    transactionMasterChef.masterChef = MASTER_CHEF_ADDRESS.toHex()
    transactionMasterChef.lpToken = ADDRESS_ZERO.toHex()
    transactionMasterChef.type = "NONE"
    transactionMasterChef.lpTokenAmount = BIG_DECIMAL_ZERO
    transactionMasterChef.token0Amount = BIG_DECIMAL_ZERO
    transactionMasterChef.token1Amount = BIG_DECIMAL_ZERO
    transactionMasterChef.harvestAmount = BIG_DECIMAL_ZERO
    transactionMasterChef.timestamp = BIG_INT_ZERO
    transactionMasterChef.userMasterChef = ADDRESS_ZERO.toHex()
    transactionMasterChef.save() 
  }

  return transactionMasterChef as TransactionMasterChef
}