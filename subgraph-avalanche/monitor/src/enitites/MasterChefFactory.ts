import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO, MASTER_CHEF_FACTORY_ADDRESS, NULL_CALL_RESULT_VALUE, XOXO_TOKEN_ADDRESS } from '../../../packages/constants/index.template'

import { MasterChefFactory } from '../../generated/schema'
import { ERC20 } from '../../generated/TradingChef/ERC20'
import { ERC20SymbolBytes } from '../../generated/TradingChef/ERC20SymbolBytes'

export function getMasterChefFactory(address:Address = MASTER_CHEF_FACTORY_ADDRESS): MasterChefFactory {
  let masterChefFactory = MasterChefFactory.load(address.toHex())

  // If no user, create one
  if (masterChefFactory === null) {
    masterChefFactory = new MasterChefFactory(address.toHex())
    masterChefFactory.save() 
  }

  return masterChefFactory as MasterChefFactory
}