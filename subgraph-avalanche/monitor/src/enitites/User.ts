import { Address } from '@graphprotocol/graph-ts'
import { ADDRESS_ZERO, BIG_DECIMAL_ZERO } from '../../../packages/constants/index.template'

import { User } from '../../generated/schema'


export function getUser(address: Address): User {
  let user = User.load(address.toHex())

  // If no user, create one
  if (user === null) {
    user = new User(address.toHex())
    user.totalRewardsClaimed = BIG_DECIMAL_ZERO
    user.lastClaimed = ADDRESS_ZERO.toHex()
    user.save() 
  }

  return user as User
}