import { BigDecimal } from "@graphprotocol/graph-ts"
import { AVAX_USD_DATA_FEEDS_ADDRESS, BIG_DECIMAL_ZERO } from "../../packages/constants/index.template"
import { AggregatorV3 as AggregatorV3Contract } from '../generated/TradingChef/AggregatorV3'

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