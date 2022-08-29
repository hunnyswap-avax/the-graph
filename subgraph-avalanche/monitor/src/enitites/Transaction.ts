import { Address, Bytes } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO } from '../../../packages/constants/index.template'

import { Transaction } from '../../generated/schema'


export function getTransaction(address: Bytes = ADDRESS_ZERO): Transaction {
  let transaction = Transaction.load(address.toHex())

  // If no Transaction, create one
  if (transaction === null) {
    const transaction = new Transaction(address.toHex())
      transaction.blockNumber = BIG_INT_ZERO
    transaction.timestamp = BIG_INT_ZERO
    transaction.amountInXOXO = BIG_DECIMAL_ZERO
      
    transaction.save() 
  }

  return transaction as Transaction
}