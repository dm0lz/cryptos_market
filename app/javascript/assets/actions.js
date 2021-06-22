import axios from 'axios'
import Cable from 'actioncable'


export const assets_fetched = (assets) => {
  return {
    type: 'ASSETS_FETCHED',
    payload: assets
  }
}

export const asset_search_fetched = (assets) => {
  return {
    type: 'ASSET_SEARCH_FETCHED',
    payload: assets
  }
}


export const assets_loading = (is_loading) => {
  return {
    type: 'ASSETS_LOADING',
    payload: is_loading
  }
}

export const assets_ohcl_fetched = (obj) => {
  return {
    type: 'ASSETS_OHCL_FETCHED',
    payload: obj
  }
}

export const time_range_selected = (time_range) => {
  return {
    type: 'TIME_RANGE_SELECTED',
    payload: time_range
  }
}

export const assets_ordered_fetched = (assets) => {
  return {
    type: 'ASSETS_ORDERED_FETCHED',
    payload: assets
  }
}



export const fetch_assets = (page_nb) => {
  return (dispatch) => {
    axios.get('/api/v1/public/asset_infos?page=' + page_nb, {responseType: 'json'})
      .then((response) => {
        dispatch(assets_fetched({page_nb: page_nb, assets: response.data.assets_infos, assets_stats: response.data.assets_stats}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const set_selected_time_range = (time_range) => {
  return (dispatch) => {
    dispatch(time_range_selected(time_range))
  }
}


export const set_assets_loading = (is_loading) => {
  return (dispatch) => {
    dispatch(assets_loading(is_loading))
  }
}


export const asset_search = (value) => {
  return (dispatch) => {
    axios.get('/api/v1/public/asset_infos?asset_search=' + value, {responseType: 'json'})
      .then((response) => {
        dispatch(asset_search_fetched({page_nb: 0, assets: response.data.assets_infos}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const order_assets = (order_by, sort_order, current_page) => {
  // sort_order is 'ASC' or 'DESC'
  return (dispatch) => {
    window.scrollTo(0, 0)
    axios.get('/api/v1/public/asset_infos?order_by=' + order_by + '&sort=' + sort_order + '&page=' + current_page, {responseType: 'json'})
      .then((response) => {
        dispatch(assets_ordered_fetched({page_nb: current_page, assets: response.data.assets_infos, assets_stats: response.data.assets_stats}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


// Used by Assets listing line chart
export const retrieve_assets_ohcl = (symbol, time_scale) => {
  return (dispatch) => {
    //let symbol = symbol
    // histohour ==> 7 last days with 3 hours step
    // histoday ==> 7 last months with 3 days step
    // histominute ==> 3 last hours with 3 minutes step
    // aggreagte is step
    if(symbol === 'MIOTA'){
      symbol = 'IOT'
    }

    let limit = 60
    let request_type = 'histohour'
    let step = 3
    if(time_scale === '7d'){
      limit = 60
      step = 3
      request_type = 'histohour'
    }else if (time_scale === '1d') {
      limit = 24
      step = 1
      request_type = 'histohour'
    }else if (time_scale === '6h') {
      limit = 120
      step = 3
      request_type = 'histominute'
    }
    else if (time_scale === '1m') {
      limit = 30
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '3m') {
      limit = 90
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '6m') {
      limit = 180
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '1y') {
      limit = 360
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '2y') {
      limit = 720
      step = 1
      request_type = 'histoday'
    }


    axios.get('https://min-api.cryptocompare.com/data/' + request_type + '?tsym=USD&limit=' + limit + '&fsym=' + symbol + '&aggregate=' + step, {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json_arr = res["Data"]
        let arr = []
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time * 1000),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volumeto + item.volumefrom
          }
          arr.push(obj)
        })
        let obj = {}
        obj.market_name = symbol
        obj.charts_data = arr
        dispatch(assets_ohcl_fetched(obj))
        //this.setState({chart_data: arr})
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      })
  }
}


// Used by Assets Show Candle chart
export const retrieve_assets_ohcl_candle = (symbol, time_scale) => {
  return (dispatch) => {
    //let symbol = symbol
    // histohour ==> 7 last days with 3 hours step
    // histoday ==> 7 last months with 3 days step
    // histominute ==> 3 last hours with 3 minutes step
    // aggreagte is step
    if(symbol === 'MIOTA'){
      symbol = 'IOT'
    }

    let limit = 60
    let request_type = 'histohour'
    let step = 3
    if(time_scale === '7d'){
      limit = 360
      step = 1
      request_type = 'histohour'
    }else if (time_scale === '1d') {
      limit = 288
      step = 5
      request_type = 'histominute'
    }else if (time_scale === '6h') {
      limit = 360
      step = 1
      request_type = 'histominute'
    }
    else if (time_scale === '1m') {
      limit = 240
      step = 3
      request_type = 'histohour'
    }
    else if (time_scale === '7D') {
      limit = 2000
      step = 1
      request_type = 'histohour'
    } else if (time_scale === '3m') {
      limit = 90
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '6m') {
      limit = 180
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '1y') {
      limit = 360
      step = 1
      request_type = 'histoday'
    } else if (time_scale === '2y') {
      limit = 720
      step = 1
      request_type = 'histoday'
    }

    axios.get('https://min-api.cryptocompare.com/data/' + request_type + '?tsym=USD&limit=' + limit + '&fsym=' + symbol + '&aggregate=' + step, {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json_arr = res["Data"]
        let arr = []
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time * 1000),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volumeto + item.volumefrom
          }
          arr.push(obj)
        })
        let obj = {}
        obj.market_name = symbol
        obj.charts_data = arr
        dispatch(assets_ohcl_fetched(obj))
        //this.setState({chart_data: arr})
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      })
  }
}
