import axios from "axios";

export const tokens_fetched = (slpTokens) => {
  return {
    type: "SLP_TOKENS_FETCHED",
    payload: slpTokens,
  };
};

export const ohlc_fetched = (ohlcData) => {
  return {
    type: "TOKEN_OHLC_FETCHED",
    payload: ohlcData,
  };
};

export const fetch_tokens = (page_nb) => {
  return (dispatch) => {
    axios
      .get(
        "https://slpdb.fountainhead.cash/q/ewogICJ2IjogMywKICAicSI6IHsKICAgICJkYiI6IFsKICAgICAgInQiCiAgICBdLAogICAgImZpbmQiOiB7fSwKICAgICJzb3J0IjogewogICAgICAidG9rZW5TdGF0cy5hcHByb3hfdHhuc19zaW5jZV9nZW5lc2lzIjogLTEKICAgIH0sCiAgICAibGltaXQiOiAxMDAsCiAgICAic2tpcCI6IDAKICB9Cn0=",
        { responseType: "json" }
      )
      .then((response) => {
        const tokensArr = response.data.t;
        const tokens = tokensArr.map((token) => {
          return {
            name: token.tokenDetails.name,
            symbol: token.tokenDetails.symbol,
            transactionsNumber: token.tokenStats.approx_txns_since_genesis,
            genesisId: token.tokenDetails.tokenIdHex,
          };
        });
        dispatch(
          tokens_fetched({
            slpTokens: tokens,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchOhlc = (symbolId, symbol) => {
  return (dispatch) => {
    const startDate = new Date(new Date().setDate(new Date().getDate() - 180))
      .toISOString()
      .split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];
    axios
      .get(
        "https://api.coinpaprika.com/v1/coins/" +
          symbolId +
          "/ohlcv/historical?start=" +
          startDate +
          "&end=" +
          endDate,
        { responseType: "json" }
      )
      .then((response) => {
        let json_arr = response.data;
        let arr = [];
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time_close),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume || 0,
          };
          arr.push(obj);
        });
        let obj = {};
        obj.symbol = symbol;
        obj.ohlcData = arr;

        dispatch(
          ohlc_fetched({
            tokensOhlc: obj,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
