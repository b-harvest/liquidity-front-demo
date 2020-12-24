import { defaultBech32Config } from "@chainapsis/cosmosjs/core/bech32Config";

export const currencies = [
  {
    coinDenom: "ATOM/AMMpooltocken",
    coinMinimalDenom: "cosmos1gph6pt8ymatjdc8vgtg5w20704u5ym08hpz020",
    coinDecimals: 6
  },
  {
    coinDenom: "ATOM/IRISpooltocken",
    coinMinimalDenom: "cosmos1a0ruh6svwn893vfpzemv4f7mkvs5at8p333ade",
    coinDecimals: 6
  },
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
    coinDenom: "AMM",
    coinMinimalDenom: "uamm",
    coinDecimals: 6
  },
];

export const stakingCurrency = {
  coinDenom: "STAKE",
  coinMinimalDenom: "stake",
  coinDecimals: 6
};

export const chainInfo = {
  rpc: "https://dev.bharvest.io/rpc",
  rest: "https://dev.bharvest.io/rest",
  chainId: "HarvestAMM",
  chainName: "HarvestAMM",
  stakeCurrency: stakingCurrency,
  bip44: {
    coinType: 118
  },
  bech32Config: defaultBech32Config("cosmos"),
  currencies: [stakingCurrency].concat(currencies),
  feeCurrencies: [
    {
      coinDenom: "STAKE",
      coinMinimalDenom: "stake",
      coinDecimals: 6
    }
  ],
  features: ["stargate"]
};
