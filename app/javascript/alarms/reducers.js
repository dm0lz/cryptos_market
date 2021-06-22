
const initialState = {
  alarms: [],
  is_create_alarm_modal_visible: false,
  is_edit_alarm_modal_visible: false,
  errors: {},
  selected_alarm: {},
  assets_infos: [],
  toggle_alarm_error: {},
  alarms_loading: false
};

export default function PortfolioReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'SHOW_CREATE_ALARM_MODAL':
      return {
        ...state,
        is_create_alarm_modal_visible: action.payload,
        errors: {},
        toggle_alarm_error: {}
      }
    case 'ASSETS_INFOS_FETCHED':
      return {
        ...state,
        assets_infos: action.payload.assets_infos
      }
    case 'SHOW_EDIT_ALARM_MODAL':
      return {
        ...state,
        is_edit_alarm_modal_visible: action.payload,
        errors: {},
        toggle_alarm_error: {}
      }
    case 'ALARM_CREATED':
      return {
        ...state,
        alarms: state.alarms.concat(action.payload.data.alarm)
      }
    case 'ALARM_SELECTED':
      return {
        ...state,
        selected_alarm: action.payload
      }
    case 'EDITED_ALARM':
      return {
        ...state,
        alarms: state.alarms.map((alarm) => (alarm.asset_symbol === action.payload.data.alarm.asset_symbol) ? action.payload.data.alarm : alarm)
      }
    case 'DESTROYED_ALARM':
      return {
        ...state,
        alarms: state.alarms.filter((alarm) => alarm.asset_symbol !== action.payload.asset_symbol)
      }
    case 'USER_ALARMS_FETCHED':
      return {
        ...state,
        alarms: action.payload.alarms,
        alarms_loading: false
      }
    case 'CREATE_ALARM_ERROR':
      return {
        ...state,
        errors: action.payload.errors
      }
    case 'TOGGLED_ALARM':
      return {
        ...state,
        alarms: state.alarms.map((alarm) => (alarm.asset_symbol === action.payload.data.alarm.asset_symbol) ? action.payload.data.alarm : alarm),
        toggle_alarm_error: {}
      }
    case 'TOGGLE_ALARM_ERROR':
      return {
        ...state,
        toggle_alarm_error: action.payload.errors
      }
    case 'ALARMS_LOADING_SET':
      return {
        ...state,
        alarms_loading: action.payload
      }
    // case 'EDITED_PORTFOLIO_ASSET':
    //   return {
    //     ...state,
    //     portfolio_assets: state.portfolio_assets.map((asset) => (asset.symbol === action.payload.data.symbol) ? action.payload.data : asset)
    //     //state.markets.map(market => (market.id === action.payload.market_id) ? action.payload : market)
    //   }
    // case 'ADD_ASSET_ERROR':
    //   return {
    //     ...state,
    //     errors: action.payload.errors
    //   }
    // case 'EDIT_ASSET_ERROR':
    //   return {
    //     ...state,
    //     edit_errors: action.payload.errors
    //   }
    // case 'REMOVED_ASSET_FROM_PORTFOLIO':
    //   return {
    //     ...state,
    //     portfolio_assets: state.portfolio_assets.filter((asset) => asset.symbol !== action.payload),
    //     selected_portfolio_asset: state.portfolio_assets.filter((asset) => asset.symbol !== action.payload)[0].symbol
    //   }
    default:
      return state
  }
}
