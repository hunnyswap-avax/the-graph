import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO, MASTER_CHEF_ADDRESS, MASTER_CHEF_FACTORY_ADDRESS, NULL_CALL_RESULT_VALUE, TRADING_CHEF_ADDRESS, XOXO_TOKEN_ADDRESS } from '../../../packages/constants/index.template'

import { MasterChef } from '../../generated/schema'

export function getMasterChef(address:Address = MASTER_CHEF_ADDRESS): MasterChef {
  let masterChef = MasterChef.load(address.toHex())

  // If no user, create one
  if (masterChef === null) {
    masterChef = new MasterChef(address.toHex())
    masterChef.masterChefFactory = MASTER_CHEF_FACTORY_ADDRESS.toHex()
    masterChef.recentTimestamp = BIG_INT_ZERO
    masterChef.recentTransactionMasterChef = ADDRESS_ZERO.toHex()
    masterChef.save() 
  }

  return masterChef as MasterChef
}