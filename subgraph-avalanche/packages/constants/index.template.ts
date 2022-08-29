import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts/common/numbers'

export const NULL_CALL_RESULT_VALUE = '0x0000000000000000000000000000000000000000000000000000000000000001'

export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')

export const BIG_DECIMAL_1E6 = BigDecimal.fromString('1e6')

export const BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export const BIG_DECIMAL_1E18 = BigDecimal.fromString('1e18')

export const BIG_DECIMAL_ZERO = BigDecimal.fromString('0')

export const BIG_DECIMAL_ONE = BigDecimal.fromString('1')

export const BIG_INT_ONE = BigInt.fromI32(1)

export const BIG_INT_TWO = BigInt.fromI32(2)

export const BIG_INT_ONE_HUNDRED = BigInt.fromI32(100)

export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400)

export const BIG_INT_ZERO = BigInt.fromI32(0)

export const LOCKUP_POOL_NUMBER = BigInt.fromI32(29)

export const LOCKUP_BLOCK_NUMBER = BigInt.fromI32(10959148)

export const MASTER_CHEF_START_BLOCK = BigInt.fromI32(10750000)

export const UNISWAP_SUSHI_ETH_PAIR_FIRST_LIQUDITY_BLOCK = BigInt.fromI32(10750005)

export const ACC_SUSHI_PRECISION = BigInt.fromString('1000000000000')

export const BENTOBOX_DEPOSIT = 'deposit'

export const BENTOBOX_TRANSFER = 'transfer'

export const BENTOBOX_WITHDRAW = 'withdraw'

export const KASHI_PAIR_MEDIUM_RISK_TYPE = 'medium'

export const PAIR_ADD_COLLATERAL = 'addCollateral'

export const PAIR_REMOVE_COLLATERAL = 'removeCollateral'

export const PAIR_ADD_ASSET = 'addAsset'

export const PAIR_REMOVE_ASSET = 'removeAsset'

export const PAIR_BORROW = 'borrow'

export const PAIR_REPAY = 'repay'

export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString(
  '3000'
)
export const DAI = "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"
export const USDC = "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664"
export const USDT = "0xc7198437980c041c805a1edcba50c1ce5db95118"

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('5')

export const FACTORY_ADDRESS = Address.fromString(
  "0x0c6A0061F9D0afB30152b8761a273786e51bec6d"
)

export const XOXO_TOKEN_ADDRESS = Address.fromString(
  "0xf9430ad8da4af7fb4091c57fe523af1236ff5b2c"
)

export const AVAX_USD_DATA_FEEDS_ADDRESS = Address.fromString(
  "0x0A77230d17318075983913bC2145DB16C7366156"
)

export const XOXO_USDT_PAIR_ADDRESS = Address.fromString(
  "0xB02972A9Fd0F9d3FddD6e8885fDea380FF304473"
)

export const XOXO_USDC_PAIR_ADDRESS = Address.fromString(
  "0xB02972A9Fd0F9d3FddD6e8885fDea380FF304473"
)
export const USDT_ADDRESS = Address.fromString(
  "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
)
export const USDC_ADDRESS = Address.fromString(
  "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"
)

export const NATIVE = Address.fromString(
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
)
export const TRADING_CHEF_ADDRESS = Address.fromString("0x84a301c93c528079a8c149cc89c9eaa0630f445d")
export const USDC_AVAX_PAIR = "0xb02972a9fd0f9d3fddd6e8885fdea380ff304473"

export const USDT_AVAX_PAIR = "0x86f721db310be07f45faff6f9162421be88548d1"
export const USDTe_AVAX_PAIR = "0x53bebbaf1f98aafd787d9bbda1a7713f46df1f8b"

// export const WHITELIST: string[] = [
//   "0xb02972a9fd0f9d3fddd6e8885fdea380ff304473", // WAVAX-USDC
//   "0xa27d1a59849d772a42ab3fcfa45c6542f9f039e2", // sAVAX-WAVAX
//   "0x9dc2ec8710dc09e304cc11dbb816e51b2360de6e", // USDC-ETH
//   "0x86f721db310be07f45faff6f9162421be88548d1", // USDt-WAVAX
//   "0x71c2f300076e7bcfcdc8238a5be0ffd07ef99ea5", // WETH.e-WAVAX
//   "0x5c2fcd829f2f65b95147a2e65fb05c75dac95c0f", // WAVAX-XOXO
//   "0x53bebbaf1f98aafd787d9bbda1a7713f46df1f8b", // WAVAX-USDT.e
//   "0x50927db18f0a9b98de8c5a334fb9282ed81a0acb", // WAVAX-ETH
//   "0x4e268a8870178425c1d46b93443c3ada867229f9", // USDC-WAVAX
//   "0x4ab2d6d8f8f8e92215214f149295ff7b3728a015", // BNB-WAVAX
//   "0x369b7ebe3227de2e479b6d364b892b8a768bc77b", // USDt-USDT.e
//   "0x22da7a452df1837aba2b4ee9bb03b5af72575859", // WBTC.e-WAVAX
// ]
export const WHITELIST: string[] = [
  "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
  "0xf9430ad8da4af7fb4091c57fe523af1236ff5b2c",
  "0xc7198437980c041c805a1edcba50c1ce5db95118",
  "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
  "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
  "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
  "0x50b7545627a5162f82a992c33b87adc75187b218",
  "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
  "0x2b2c81e08f1af8835a78bb2a90ae924ace0ea4be",
  "0x71c2f300076e7BCfcdc8238a5BE0FFD07Ef99Ea5",
  "0x264c1383ea520f73dd837f915ef3a732e204a493"
]