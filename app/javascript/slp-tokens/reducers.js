//import update from 'immutability-helper'

export const ASSETS_FETCHED = "ASSETS_FETCHED";

const initialState = {
  slpTokens: [],
  tokensOhlc: {},
};

export default function AssetsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SLP_TOKENS_FETCHED":
      return {
        ...state,
        slpTokens: state.slpTokens.concat(action.payload.slpTokens),
      };
    case "TOKEN_OHLC_FETCHED":
      return {
        ...state,
        tokensOhlc: {
          ...state.tokensOhlc,
          [action.payload.tokensOhlc.symbol]:
            action.payload.tokensOhlc.ohlcData,
        },
      };

    default:
      return state;
  }
}
