import { combineReducers } from "redux";
import MarketsReducer from "../markets/reducers";
import AssetsReducer from "../assets/reducers";
import SlpTokensReducer from "../slp-tokens/reducers";
import SessionsReducer from "../sessions/reducers";
import RegistrationsReducer from "../registrations/reducers";
import PortfolioReducer from "../portfolio/reducers";
import AlarmsReducer from "../alarms/reducers";
import ExchangesReducer from "../exchanges/reducers";

const allReducers = combineReducers({
  MarketsReducer,
  AssetsReducer,
  SessionsReducer,
  RegistrationsReducer,
  AlarmsReducer,
  PortfolioReducer,
  ExchangesReducer,
  SlpTokensReducer,
});

export default allReducers;
