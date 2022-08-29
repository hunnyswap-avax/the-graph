import { BIG_DECIMAL_1E18, BIG_INT_ONE, TRADING_CHEF_ADDRESS } from '../../../packages/constants/index.template'
import { Transfer as TransferEvent } from '../../generated/TradingChef/ERC20'
import { getAvaxPrice } from '../pricing'
import { getBundle } from '../enitites/Bundle'
import { getUser } from '../enitites/User'
import { getTradingChef} from '../enitites/TradingChef'
import { getTransaction} from '../enitites/Transaction'

export function onTransfer(event: TransferEvent): void {
  // update ETH price now that reserves could have changed
  const bundle = getBundle()
  // Pass the block so we can get accurate price data before migration
  bundle.avaxPrice = getAvaxPrice()
    bundle.save()
  // We returned null for some reason, we should silently bail without creating this pair
  if (event.params.from.toHex().toLowerCase() != TRADING_CHEF_ADDRESS.toHex().toLowerCase()) {
    return
  }
    const amountClaimed = event.params.value.toBigDecimal().div(BIG_DECIMAL_1E18)  
  let transaction = getTransaction(event.transaction.hash.toHex())
   transaction.blockNumber = event.block.number
    transaction.amountInXOXO = amountClaimed
    transaction.timestamp = event.block.timestamp
    transaction.to = event.params.to.toHex()
    let tradingChef = getTradingChef()
    tradingChef.lastClaimed = transaction.id
    tradingChef.timestamp = event.block.timestamp
    tradingChef.totalRewardsClaimed = tradingChef.totalRewardsClaimed.plus(amountClaimed)
    // Now it's safe to save
    let user = getUser(event.params.to);
    user.totalRewardsClaimed = user.totalRewardsClaimed.plus(amountClaimed)
    user.lastClaimed = transaction.id

    transaction.save()
    tradingChef.save()
    user.save()
}