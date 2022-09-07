import { ADDRESS_ZERO, BIG_DECIMAL_1E18, BIG_INT_ONE, MASTER_CHEF_ADDRESS, XOXO_TOKEN_ADDRESS } from "../../../packages/constants/index.template";
import {TransactionMasterChef } from "../../generated/schema";
import { Transfer as TransferEvent } from "../../generated/templates/LpToken/LpToken";
import { getLpPool, getMasterChef, getMasterChefFactory, getTransactionMasterChef, getUserMasterChef } from "../enitites";

export function onTransferMasterChef(event: TransferEvent): void {
    if(event.transaction.from.toHex() == ADDRESS_ZERO.toHex()) {
        return
    }
    getMasterChefFactory(); 
    let transactionMasterChef = TransactionMasterChef.load(event.transaction.hash.toHex());
    if (transactionMasterChef === null) {
        return
    }
    let lpPool = getLpPool(event.address);
    let userMasterChef = getUserMasterChef(event.params.to);
    let masterChef = getMasterChef();
    const value = event.params.value.toBigDecimal().div(BIG_DECIMAL_1E18)
    if (event.params.from.equals(MASTER_CHEF_ADDRESS)
    ) {
        userMasterChef.totalHarvest = userMasterChef.totalHarvest.plus(value);
        transactionMasterChef.harvestAmount = transactionMasterChef.harvestAmount.plus(value);
    }
    transactionMasterChef.timestamp = event.block.timestamp;
    masterChef.recentTimestamp = event.block.timestamp;
    masterChef.recentTransactionMasterChef = transactionMasterChef.id;
    lpPool.recentTransactionMasterChef = transactionMasterChef.id;
    transactionMasterChef.lpToken = event.address.toHex();
    userMasterChef.save();
    transactionMasterChef.save();
    lpPool.save();
    masterChef.save();
}