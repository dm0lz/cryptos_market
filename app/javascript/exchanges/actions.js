import axios from 'axios'

export const exchanges_fetched = (exchanges) => {
  return {
    type: 'EXCHANGES_FETCHED',
    payload: exchanges
  }
}

export const exchanges_loading_set = (bool) => {
  return {
    type: 'EXCHANGES_LOADING_SET',
    payload: bool
  }
}

export const fetch_exchanges = () => {
  return (dispatch) => {
    dispatch(exchanges_loading_set(true))
    axios.get('/api/v1/public/exchanges', {headers: {responseType: 'json'}})
      .then((response) => {
        dispatch(exchanges_fetched({exchanges: response.data.exchanges}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
