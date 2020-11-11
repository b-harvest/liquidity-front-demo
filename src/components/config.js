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
