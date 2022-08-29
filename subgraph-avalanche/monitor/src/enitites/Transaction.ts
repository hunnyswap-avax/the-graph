import { Address, Bytes } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO, TRADING_CHEF_ADDRESS } from '../../../packages/constants/index.template'

import { Transaction } from '../../generated/schema'


export function getTransaction(address: string): Transaction {
  let transaction = Transaction.load(address)

  // If no Transaction, create one
  if (transaction === null) {
    transaction = new Transaction(address)
    transaction.blockNumber = BIG_INT_ZERO
    transaction.timestamp = BIG_INT_ZERO
    transaction.amountInXOXO = BIG_DECIMAL_ZERO
    transaction.from = TRADING_CHEF_ADDRESS
    transaction.to = ADDRESS_ZERO.toHex()
    transaction.save() 
  }

  return transaction as Transaction
}