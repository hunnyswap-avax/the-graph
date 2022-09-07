import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, MASTER_CHEF_FACTORY_ADDRESS } from '../../../packages/constants/index.template'

import { UserMasterChef } from '../../generated/schema'

export function getUserMasterChef(address:Address): UserMasterChef {
  let userMasterChef = UserMasterChef.load(address.toHex())

  // If no user, create one
  if (userMasterChef === null) {
    userMasterChef = new UserMasterChef(address.toHex())
    userMasterChef.masterChefFactory = MASTER_CHEF_FACTORY_ADDRESS.toHex()
    userMasterChef.totalDeposited = BIG_DECIMAL_ZERO
    userMasterChef.totalWithdrawn = BIG_DECIMAL_ZERO
    userMasterChef.totalHarvest = BIG_DECIMAL_ZERO 
    userMasterChef.recentTransactionMasterChef = ADDRESS_ZERO.toHex()
    userMasterChef.save() 
  }

  return userMasterChef as UserMasterChef
}