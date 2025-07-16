import { reactive } from "vue";

export const store = reactive({
  rates: {
    usdbrl: 0,
    eurbrl: 0,
    eurusd: 0,
    usdbrlChange: 0,
    eurbrlChange: 0,
    eurusdChange: 0,

    btc: 0,
    btcusd: 0,
    btcusdChange: 0,

    eth: 0,
    ethusd: 0,
    ethusdChange: 0,

    us02y: 0,
    us02yChange: 0,
    us02yChangePercent: 0,

    us10y: 0,
    us10yChange: 0,
    us10yChangePercent: 0,

    us20y: 0,
    us20yChange: 0,
    us20yChangePercent: 0,

    us30y: 0,
    us30yChange: 0,
    us30yChangePercent: 0,
  },
});
