//import update from 'immutability-helper'

export const ASSETS_FETCHED = 'ASSETS_FETCHED'

const initialState = {
  assets: [],
  assets_stats: {},
  assets_chart_data: {},
  current_page: 0,
  is_assets_loading: true,
  current_tab: {},
  selected_time_range: '7d'
};

export default function AssetsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'ASSETS_FETCHED':
      return {
        ...state,
        assets: state.assets.concat(action.payload.assets),
        current_page: action.payload.page_nb,
        is_assets_loading: false,
        assets_stats: action.payload.assets_stats
      }
    case 'ASSETS_ORDERED_FETCHED':
      // let assets = []
      // if(action.payload.page_nb === 0 || action.payload.page_nb === 1){
      //   assets = action.payload.assets
      // }else{
      //   assets = state.assets.concat(action.payload.assets)
      // }
      return {
        ...state,
        assets: action.payload.assets,
        current_page: action.payload.page_nb,
        is_assets_loading: false,
        assets_stats: action.payload.assets_stats
      }
    case 'ASSET_SEARCH_FETCHED':
      return {
        ...state,
        assets: action.payload.assets,
        is_assets_loading: false
      }
    case 'ASSETS_LOADING':
      return {
        ...state,
        is_assets_loading: action.payload
      }
    case 'ASSETS_OHCL_FETCHED':
      return {
        ...state,
        assets_chart_data: {
          ...state.assets_chart_data,
          [action.payload.market_name]: action.payload.charts_data
        }
      }
    case 'TIME_RANGE_SELECTED':
      return {
        ...state,
        selected_time_range: action.payload
      }

    default:
      return state
  }
}
