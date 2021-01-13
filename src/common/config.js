import { defaultBech32Config } from "@chainapsis/cosmosjs/core/bech32Config";

export const currencies = [
  {
    coinDenom: "SCRT",
    coinMinimalDenom: "uscrt",
    coinDecimals: 6
  },
  {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6
  },
  {
    coinDenom: "IRIS",
    coinMinimalDenom: "uiris",
    coinDecimals: 6
  },
  {
    coinDenom: "BAND",
    coinMinimalDenom: "uband",
    coinDecimals: 6
  },
  {
    coinDenom: "KAVA",
    coinMinimalDenom: "ukava",
    coinDecimals: 6
  },
  {
    coinDenom: "LUNA",
    coinMinimalDenom: "uluna",
    coinDecimals: 6
  },
  {
    coinDenom: "USDT",
    coinMinimalDenom: "uusdt",
    coinDecimals: 6
  },
];

export const stakingCurrency = {
  coinDenom: "ATOM",
  coinMinimalDenom: "uatom",
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
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6
    }
  ],
  features: ["stargate"]
};
