import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO, BIG_INT_ZERO, NULL_CALL_RESULT_VALUE, TRADING_CHEF_ADDRESS, XOXO_TOKEN_ADDRESS } from '../../../packages/constants/index.template'

import { TradingChef } from '../../generated/schema'
import { ERC20 } from '../../generated/MasterChef/ERC20'
import { ERC20SymbolBytes } from '../../generated/MasterChef/ERC20SymbolBytes' 

export function getTradingChef(address:Address = TRADING_CHEF_ADDRESS): TradingChef {
  let tradingChef = TradingChef.load(address.toHex())

  // If no user, create one
  if (tradingChef === null) {
    tradingChef = new TradingChef(address.toHex())
    tradingChef.totalRewardsClaimed = BIG_DECIMAL_ZERO
    tradingChef.lastClaimed = ADDRESS_ZERO.toHex()
    tradingChef.timestamp = BIG_INT_ZERO
    tradingChef.tokenAddress = XOXO_TOKEN_ADDRESS
    tradingChef.tokenSymbol = getSymbol(XOXO_TOKEN_ADDRESS)
    tradingChef.save() 
  }

  return tradingChef as TradingChef
}

export function getSymbol(address: Address): string {

  const contract = ERC20.bind(address)
  const contractSymbolBytes = ERC20SymbolBytes.bind(address)

  // try types string and bytes32 for symbol
  let symbolValue = 'unknown'
  const symbolResult = contract.try_symbol()
  if (symbolResult.reverted) {
    const symbolResultBytes = contractSymbolBytes.try_symbol()
    if (!symbolResultBytes.reverted) {
      // for broken pairs that have no symbol function exposed
      if (symbolResultBytes.value.toHex() != NULL_CALL_RESULT_VALUE) {
        symbolValue = symbolResultBytes.value.toString()
      }
    }
  } else {
    symbolValue = symbolResult.value
  }

  return symbolValue
}

export function getDecimals(address: Address): BigInt {
  const contract = ERC20.bind(address)

  // try types uint8 for decimals

  const decimalResult = contract.try_decimals()

  if (!decimalResult.reverted) {
      let decimalValue = decimalResult.value
      return BigInt.fromI32(decimalValue)
  }

  return BigInt.zero()
}