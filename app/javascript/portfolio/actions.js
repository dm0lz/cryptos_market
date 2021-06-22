import axios from "axios";

export const portfolio_assets_fetched = (portfolio_assets) => {
  return {
    type: "PORTFOLIO_ASSETS_FETCHED",
    payload: portfolio_assets,
  };
};

export const show_add_asset_modal = (bool) => {
  return {
    type: "SHOW_ADD_ASSET_MODAL",
    payload: bool,
  };
};

export const show_edit_asset_modal = (bool) => {
  return {
    type: "SHOW_EDIT_ASSET_MODAL",
    payload: bool,
  };
};

export const set_selected_portfolio_asset = (symbol) => {
  return {
    type: "SET_SELECTED_PORTFOLIO_ASSET",
    payload: symbol,
  };
};

export const portfolio_assets_loading_set = (bool) => {
  return {
    type: "PORTFOLIO_ASSETS_LOADING_SET",
    payload: bool,
  };
};

export const added_asset_to_portfolio = (payload) => {
  return {
    type: "ADDED_ASSET_TO_PORTFOLIO",
    payload: payload,
  };
};

export const add_asset_error = (error) => {
  return {
    type: "ADD_ASSET_ERROR",
    payload: error,
  };
};

export const edit_asset_error = (error) => {
  return {
    type: "EDIT_ASSET_ERROR",
    payload: error,
  };
};

export const removed_asset_from_portfolio = (symbol) => {
  return {
    type: "REMOVED_ASSET_FROM_PORTFOLIO",
    payload: symbol,
  };
};

export const edited_portfolio_asset = (asset) => {
  return {
    type: "EDITED_PORTFOLIO_ASSET",
    payload: asset,
  };
};

export const reset_local_storage_session = () => {
  localStorage.setItem("jwt", "");
  localStorage.setItem("session", false);
  localStorage.setItem("email", "");
  localStorage.setItem("user", {});
  localStorage.clear();
};

export const fetch_portfolio_assets = (jwt_token) => {
  return (dispatch) => {
    dispatch(portfolio_assets_loading_set(true));
    axios
      .get("/api/v1/private/portfolio", {
        headers: { Authorization: jwt_token, responseType: "json" },
      })
      .then((response) => {
        dispatch(
          portfolio_assets_fetched({
            portfolio_assets: response.data.data.portfolio_assets,
          })
        );
        dispatch(portfolio_assets_loading_set(false));
        if (response.data.data.portfolio_assets.length) {
          dispatch(
            set_selected_portfolio_asset(
              response.data.data.portfolio_assets[0].symbol
            )
          );
          dispatch(
            retrieve_assets_ohcl_candle(
              response.data.data.portfolio_assets[0].symbol,
              "7D"
            )
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          reset_local_storage_session();
          window.location.href = "sign_in";
        }
        console.log(error);
      });
  };
};

export const post_add_portfolio_asset = (payload) => {
  return (dispatch) => {
    axios
      .post("/api/v1/private/portfolio/add_asset", payload, {
        headers: { Authorization: localStorage.jwt, responseType: "json" },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(added_asset_to_portfolio(response.data));
        dispatch(set_selected_portfolio_asset(response.data.data.symbol));
        dispatch(retrieve_assets_ohcl_candle(response.data.data.symbol, "7D"));
        dispatch(show_add_asset_modal(false));
      })
      .catch((error) => {
        if (error.response.status === 422) {
          dispatch(add_asset_error({ errors: error.response.data.error }));
          //reset_local_storage_session()
        }
        console.log(error);
      });
  };
};

export const patch_edit_portfolio_asset = (payload) => {
  return (dispatch) => {
    axios
      .patch(
        "/api/v1/private/portfolio/edit_asset",
        { symbol: payload },
        { headers: { Authorization: localStorage.jwt, responseType: "json" } }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(edited_portfolio_asset(response.data));
        dispatch(show_edit_asset_modal(false));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          dispatch(edit_asset_error({ errors: error.response.data.error }));
          //reset_local_storage_session()
        }
      });
  };
};

export const remove_selected_asset = (payload) => {
  return (dispatch) => {
    axios
      .patch(
        "/api/v1/private/portfolio/remove_asset",
        { symbol: payload },
        { headers: { Authorization: localStorage.jwt, responseType: "json" } }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(removed_asset_from_portfolio(payload));
      })
      .catch((error) => {
        // if(error.response.status === 422){
        //dispatch(add_asset_error({errors: error.response.data.error}))
        //reset_local_storage_session()
        // }
        console.log(error);
      });
  };
};

export const update_selected_portfolio_asset = (symbol) => {
  return (dispatch) => {
    dispatch(set_selected_portfolio_asset(symbol));
  };
};

export const set_show_add_asset_modal = (bool) => {
  return (dispatch) => {
    dispatch(show_add_asset_modal(bool));
  };
};

export const set_show_edit_asset_modal = (bool) => {
  return (dispatch) => {
    dispatch(show_edit_asset_modal(bool));
  };
};

export const set_portfolio_assets_loading = (bool) => {
  return (dispatch) => {
    dispatch(portfolio_assets_loading_set(bool));
  };
};

export const assets_ohcl_fetched = (obj) => {
  return {
    type: "ASSETS_OHCL_FETCHED",
    payload: obj,
  };
};

// Used by Assets Show Candle chart
export const retrieve_assets_ohcl_candle = (symbol, time_scale) => {
  return (dispatch) => {
    //let symbol = symbol
    // histohour ==> 7 last days with 3 hours step
    // histoday ==> 7 last months with 3 days step
    // histominute ==> 3 last hours with 3 minutes step
    // aggreagte is step
    if (symbol === "MIOTA") {
      symbol = "IOT";
    }

    let limit = 60;
    let request_type = "histohour";
    let step = 3;
    if (time_scale === "7d") {
      limit = 60;
      step = 3;
      request_type = "histohour";
    } else if (time_scale === "1d") {
      limit = 96;
      step = 15;
      request_type = "histominute";
    } else if (time_scale === "6h") {
      limit = 120;
      step = 3;
      request_type = "histominute";
    } else if (time_scale === "1m") {
      limit = 120;
      step = 6;
      request_type = "histohour";
    } else if (time_scale === "7D") {
      limit = 2000;
      step = 1;
      request_type = "histohour";
    }

    axios
      .get(
        "https://min-api.cryptocompare.com/data/" +
          request_type +
          "?tsym=USD&limit=" +
          limit +
          "&fsym=" +
          symbol +
          "&aggregate=" +
          step,
        { responseType: "json" }
      )
      .then((response) => {
        let res = response.data;
        let json_arr = res["Data"];
        let arr = [];
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time * 1000),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volumeto + item.volumefrom,
          };
          arr.push(obj);
        });
        let obj = {};
        obj.market_name = symbol;
        obj.charts_data = arr;
        dispatch(assets_ohcl_fetched(obj));
        //this.setState({chart_data: arr})
      })
      .catch((error) => {
        if (error.response.status === 429) {
          return false;
        }
        if (error.response.status === 400) {
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      });
  };
};
