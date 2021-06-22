
const initialState = {
  exchanges: [],
  exchanges_loading: false
};

export default function ExchangesReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'EXCHANGES_FETCHED':
      return {
        ...state,
        exchanges: action.payload.exchanges,
        exchanges_loading: false
      }
    case 'EXCHANGES_LOADING_SET':
      return {
        ...state,
        exchanges_loading: action.payload
      }

    default:
      return state
  }
}
