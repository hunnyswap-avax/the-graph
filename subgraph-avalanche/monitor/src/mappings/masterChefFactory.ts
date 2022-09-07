import { PairCreated as PairCreatedEvent } from '../../generated/MasterChefFactory/MasterChefFactory'
import { getLpPool, getMasterChef, getMasterChefFactory, getSymbol } from '../enitites'

export function onPairCreated(event: PairCreatedEvent): void {
  getMasterChefFactory();
  let masterChef = getMasterChef();
  let lpPool = getLpPool(event.params.pair)
  lpPool.masterChef = masterChef.id;
  lpPool.isInit = true;
  lpPool.token0 = event.params.token0;
  lpPool.token1 = event.params.token1;
  const token0 = getSymbol(event.params.token0);
  const token1 = getSymbol(event.params.token1);
  lpPool.token0Symbol = token0;
  lpPool.token1Symbol = token1;
  lpPool.name = token0 + "-" + token1;
  lpPool.pid = event.params.param3;
  lpPool.save()
}