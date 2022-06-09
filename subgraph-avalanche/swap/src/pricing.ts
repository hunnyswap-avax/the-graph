import { 
  ADDRESS_ZERO,
  AVAX_USD_DATA_FEEDS_ADDRESS,
  BIG_DECIMAL_ONE,
  BIG_DECIMAL_ZERO,
  FACTORY_ADDRESS,
  MINIMUM_LIQUIDITY_THRESHOLD_ETH,
  NATIVE,
  USDC_AVAX_PAIR,
  USDTe_AVAX_PAIR,
  USDT_AVAX_PAIR,
  WHITELIST,
  XOXO_USDC_PAIR_ADDRESS,
} from '../../packages/constants/index.template'
import { Address, BigDecimal, log } from '@graphprotocol/graph-ts'
import { Pair, Token } from '../generated/schema'

import { Factory as FactoryContract } from '../generated/templates/Pair/Factory'
import { AggregatorV3 as AggregatorV3Contract } from '../generated/Factory/AggregatorV3'
// export const uniswapFactoryContract = FactoryContract.bind(Address.fromString("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"))

export const factoryContract = FactoryContract.bind(FACTORY_ADDRESS)

export function getXoXoPrice(): BigDecimal {
  const pair = Pair.load(XOXO_USDC_PAIR_ADDRESS.toHexString())

  if (pair) {
    return pair.token1Price
  }

  return BIG_DECIMAL_ZERO
}

export function getAvaxPrice(): BigDecimal {
  const contract = AggregatorV3Contract.bind(AVAX_USD_DATA_FEEDS_ADDRESS)
  let amount:BigDecimal
  const amountResult = contract.try_latestRoundData()
  if (!amountResult.reverted) {
      amount = amountResult.value.value1.toBigDecimal()
      return amount.div(BigDecimal.fromString('100000000'))
  }
  return BIG_DECIMAL_ZERO
  // let usdcPair = Pair.load(USDC_AVAX_PAIR) // usdc is token0
  // let usdtPair = Pair.load(USDT_AVAX_PAIR) // usdt is token1
  // let usdtePair = Pair.load(USDTe_AVAX_PAIR) // usdt is token1

  // // all 3 have been created
  // if (usdcPair !== null && usdtPair !== null && usdtePair !== null) {
  //   let totalLiquidityETH = usdcPair.reserve0.plus(usdtPair.reserve1).plus(usdtePair.reserve0).plus(usdtPair.reserve1)
  //   if (totalLiquidityETH.notEqual(BIG_DECIMAL_ZERO)) {
  //     let usdcWeight = usdcPair.reserve0.div(totalLiquidityETH)
  //     let usdtWeight = usdtPair.reserve1.div(totalLiquidityETH)
  //     let usdteWeight = usdtePair.reserve0.div(totalLiquidityETH)
  //     return usdcPair.token1Price.times(usdcWeight)
  //       .plus(usdtPair.token0Price.times(usdtWeight)).plus(usdtePair.token1Price.times(usdteWeight))
      
  //   }
  //   return BIG_DECIMAL_ZERO
  //   // dai and USDC have been created
  // } else if (usdtPair !== null && usdcPair !== null) {
  //   let totalLiquidityETH = usdtPair.reserve1.plus(usdcPair.reserve0)
  //   if (totalLiquidityETH.notEqual(BIG_DECIMAL_ZERO)) {
  //     let usdcWeight = usdcPair.reserve0.div(totalLiquidityETH)
  //     let usdtWeight = usdtPair.reserve1.div(totalLiquidityETH)
  //     return usdcPair.token1Price.times(usdcWeight).plus(usdtPair.token0Price.times(usdtWeight))
  //   // USDC is the only pair so far
  //   }
  //   return BIG_DECIMAL_ZERO
  // } else if (usdcPair !== null) {
  //   return usdcPair.token1Price
  // } else {
  //   return BIG_DECIMAL_ZERO
  // }
}
export function findAvaxPerToken(token: Token): BigDecimal {
  // if (Address.fromString(token.id) == NATIVE) {
  //   return BIG_DECIMAL_ONE
  // }
  // // loop through whitelist and check if paired with any
  // for (let i = 0; i < whitelist.length; ++i) {
  //   let pairAddress = factoryContract.try_getPair(Address.fromString(token.id), Address.fromString(whitelist[i]))
  //   if (!pairAddress.reverted) {
  //     if (pairAddress.value.notEqual(ADDRESS_ZERO)) {
  //       let pair = Pair.load(pairAddress.value.toHexString())
  //       if (pair === null) return BIG_DECIMAL_ZERO
  //       if (pair.token0 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
  //         let token1 = Token.load(pair.token1)
  //         return pair.token1Price.times(token1!.derivedAVAX as BigDecimal) // return token1 per our token * Eth per token 1
  //       }
  //       if (pair.token1 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
  //         let token0 = Token.load(pair.token0)
  //         return pair.token0Price.times(token0!.derivedAVAX as BigDecimal) // return token0 per our token * ETH per token 0
  //       }
  //     }
  //   }
  // }
  // return BIG_DECIMAL_ZERO // nothing was found return 0
  if (Address.fromString(token.id) == NATIVE) {
    return BIG_DECIMAL_ONE
  }
  for (let i = 0; i < WHITELIST.length; ++i) {
      let pairAddress = factoryContract.try_getPair(Address.fromString(token.id), Address.fromString(WHITELIST[i]))
      if (!pairAddress.reverted || pairAddress.value.notEqual(ADDRESS_ZERO)) {
      const pair = Pair.load(pairAddress.value.toHexString())
      if (pair !== null) {
        if (pair.token0 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
          const token1 = Token.load(pair.token1)

          return pair.token1Price.times(token1!.derivedAVAX) // return token1 per our token * Eth per token 1
        }

        if (pair.token1 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
          const token0 = Token.load(pair.token0)
          return pair.token0Price.times(token0!.derivedAVAX) // return token0 per our token * ETH per token 0
        }
      }
    }
  }

  return BIG_DECIMAL_ZERO // nothing was found return 0
}