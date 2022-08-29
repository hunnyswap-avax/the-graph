import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO, TRADING_CHEF_ADDRESS } from '../../../packages/constants/index.template'

import { TradingChef } from '../../generated/schema'


export function getTradingChef(address:Address = TRADING_CHEF_ADDRESS): TradingChef {
  let tradingChef = TradingChef.load(address.toHex())

  // If no user, create one
  if (tradingChef === null) {
    const tradingChef = new TradingChef(address.toHex())
    tradingChef.totalRewardsClaimed = BIG_DECIMAL_ZERO
    tradingChef.lastClaimed = ADDRESS_ZERO.toHex()
    tradingChef.timestamp = BIG_INT_ZERO
    tradingChef.save() 
  }

  return tradingChef as TradingChef
}