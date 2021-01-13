import { defaultBech32Config } from "@chainapsis/cosmosjs/core/bech32Config";

export const currencies = [
  {
    coinDenom: "SCRTS",
    coinMinimalDenom: "uscrtswap",
    coinDecimals: 6
  },
  {
    coinDenom: "ATOMS",
    coinMinimalDenom: "uatomswap",
    coinDecimals: 6
  },
  {
    coinDenom: "IRISS",
    coinMinimalDenom: "uirisswap",
    coinDecimals: 6
  },
  {
    coinDenom: "BANDS",
    coinMinimalDenom: "ubandswap",
    coinDecimals: 6
  },
  {
    coinDenom: "KAVAS",
    coinMinimalDenom: "ukavaswap",
    coinDecimals: 6
  },
  {
    coinDenom: "LUNAS",
    coinMinimalDenom: "ulunaswap",
    coinDecimals: 6
  },
  {
    coinDenom: "USDTS",
    coinMinimalDenom: "uusdtswap",
    coinDecimals: 6
  },
];

export const stakingCurrency = {
  coinDenom: "ATOMS",
  coinMinimalDenom: "uatomswap",
  coinDecimals: 6
};

export const chainInfo = {
  rpc: "https://dev.bharvest.io/rpc",
  rest: "https://dev.bharvest.io/rest",
  chainId: "swap-testnet-2001",
  chainName: "Swap Testnet",
  stakeCurrency: stakingCurrency,
  bip44: {
    coinType: 118
  },
  bech32Config: defaultBech32Config("cosmos"),
  currencies: [stakingCurrency].concat(currencies),
  feeCurrencies: [
    {
      coinDenom: "ATOMS",
      coinMinimalDenom: "uatomswap",
      coinDecimals: 6
    }
  ],
  features: ["stargate"]
};
