import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO,  BIG_INT_ZERO,  MASTER_CHEF_ADDRESS,  MASTER_CHEF_FACTORY_ADDRESS} from '../../../packages/constants/index.template'

import { LpPool } from '../../generated/schema'

export function getLpPool(address:Address): LpPool {
  let lpPool = LpPool.load(address.toHex())

  // If no user, create one
  if (lpPool === null) {
    lpPool = new LpPool(address.toHex())
    lpPool.masterChef = MASTER_CHEF_ADDRESS.toHex()
    lpPool.isInit = false
    lpPool.name = "NULL-NULL"
    lpPool.token0 = ADDRESS_ZERO
    lpPool.token1 = ADDRESS_ZERO
    lpPool.token0Symbol = "NULL"
    lpPool.token1Symbol = "NULL" 
    lpPool.pid = BIG_INT_ZERO 
    lpPool.recentTransactionMasterChef = ADDRESS_ZERO.toHex();
    lpPool.save() 
  }

  return lpPool as LpPool
}