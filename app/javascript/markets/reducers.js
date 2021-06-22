//import update from 'immutability-helper'

export const MARKETS_FETCHED = 'MARKETS_FETCHED'
export const RECEIVED_TICKER = 'RECEIVED_TICKER'

const initialState = {
  markets: [],
  charts_data: {},
  current_page: 0,
  is_markets_loading: true,
  current_tab: {},
  markets_infos: {},
  markets_stats: {}
};

export default function MarketsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'MARKETS_FETCHED':
      return {
        ...state,
        markets: state.markets.concat(action.payload.markets),
        current_page: action.payload.page_nb,
        is_markets_loading: false,
        markets_stats: action.payload.markets_stats
      }
    case 'MARKETS_INFOS_FETCHED':
      return {
        ...state,
        markets_infos: action.payload.markets_infos
      }
    case 'MARKET_SEARCH_FETCHED':
      return {
        ...state,
        //markets: state.markets.concat(action.payload.markets),
        markets: action.payload.markets,
        is_markets_loading: false,
        markets_stats: action.payload.markets_stats,
        current_page: action.payload.page_nb
      }
    case 'CLICK_MARKET_SEARCH_FETCHED':
      return {
        ...state,
        //markets: state.markets.concat(action.payload.markets),
        markets: action.payload.markets,
        is_markets_loading: false,
        markets_stats: action.payload.markets_stats,
        current_page: action.payload.page_nb
      }
    case 'SCROLL_MARKET_SEARCH_FETCHED':
      let market_items = state.markets.concat(action.payload.markets)
      let uniq_market_items = [];
      market_items.filter((item) => {
        var i = uniq_market_items.findIndex(x => x.id == item.id)
        if(i <= -1){
              uniq_market_items.push(item)
        }
        return null
      })
      return {
        ...state,
        markets: uniq_market_items,
        //markets: action.payload.markets,
        is_markets_loading: false,
        markets_stats: action.payload.markets_stats,
        current_page: action.payload.page_nb
      }
    case 'RECEIVED_TICKER':
      // Here we should update just one pair instead of the whole market
      return {
        ...state,
        markets: state.markets.map(market => (market.id === action.payload.market_id) ? action.payload : market)
      }
    case 'MARKETS_LOADING':
      return {
        ...state,
        is_markets_loading: action.payload
      }
    case 'HOCL_FETCHED':
      return {
        ...state,
        charts_data: {
          ...state.charts_data,
          [action.payload.market_name]: action.payload.charts_data
        }
      }
    case 'SET_TAB':
      return {
        ...state,
        current_tab: {
          ...state.current_tab,
          [action.payload.market_id]: action.payload.tab
        }
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        current_page: action.payload
      }
    default:
      return state;
  }
}
