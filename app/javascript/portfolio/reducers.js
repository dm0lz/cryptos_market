
const initialState = {
  portfolio_assets: [],
  portfolio_assets_loading: false,
  selected_portfolio_asset: undefined,
  is_add_asset_modal_visible: false,
  is_edit_asset_modal_visible: false,
  errors: {},
  edit_errors: {},
  //selected_time_range: '7d'
};

export default function PortfolioReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'PORTFOLIO_ASSETS_FETCHED':
      return {
        ...state,
        portfolio_assets: action.payload.portfolio_assets,
        portfolio_assets_loading: false
      }
    case 'SHOW_ADD_ASSET_MODAL':
      return {
        ...state,
        is_add_asset_modal_visible: action.payload,
        errors: {}
      }
    case 'SHOW_EDIT_ASSET_MODAL':
      return {
        ...state,
        is_edit_asset_modal_visible: action.payload,
        edit_errors: {}
      }
    case 'SET_SELECTED_PORTFOLIO_ASSET':
      return {
        ...state,
        selected_portfolio_asset: action.payload
      }
    case 'ADDED_ASSET_TO_PORTFOLIO':
      return {
        ...state,
        portfolio_assets: state.portfolio_assets.concat(action.payload.data)
      }
    case 'EDITED_PORTFOLIO_ASSET':
      return {
        ...state,
        portfolio_assets: state.portfolio_assets.map((asset) => (asset.symbol === action.payload.data.symbol) ? action.payload.data : asset)
        //state.markets.map(market => (market.id === action.payload.market_id) ? action.payload : market)
      }
    case 'ADD_ASSET_ERROR':
      return {
        ...state,
        errors: action.payload.errors
      }
    case 'EDIT_ASSET_ERROR':
      return {
        ...state,
        edit_errors: action.payload.errors
      }
    case 'REMOVED_ASSET_FROM_PORTFOLIO':
      let portfolio_asset_selected = undefined
      if(state.portfolio_assets.length < 2){
        portfolio_asset_selected = undefined
      }else{
        portfolio_asset_selected = state.portfolio_assets.filter((asset) => asset.symbol !== action.payload)[0].symbol
      }
      return {
        ...state,
        portfolio_assets: state.portfolio_assets.filter((asset) => asset.symbol !== action.payload),
        selected_portfolio_asset: portfolio_asset_selected
      }
    case 'PORTFOLIO_ASSETS_LOADING_SET':
      return {
        ...state,
        portfolio_assets_loading: action.payload
      }
    // case 'TIME_RANGE_SELECTED':
    //   return {
    //     ...state,
    //     selected_time_range: action.payload
    //   }
    default:
      return state
  }
}
