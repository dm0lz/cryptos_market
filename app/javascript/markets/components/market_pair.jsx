import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
//import { withRouter } from 'react-router-dom'
import history from './../../main/history'

const MarketPair = (props) => {

  const navigateToShowMarket = () => {
    let market_name = props.pair.last_ticker.market_name
    if(!props.pair.exchange_get_user_pair_path.length){return}
    let url = props.pair.exchange_get_user_pair_path.replace('BASE_CURRENCY_PARAM', market_name.split('-')[0]).replace('QUOTE_CURRENCY_PARAM', market_name.split('-')[1])
    window.open(url, '_blank')
    //history.push('/' + props.pair.exchange_name + '/' + props.pair.last_ticker.market_name)
  }

  let css_ticker = props.pair.last_to_be_updated ? 'ticker_row' : ''
  return(
    <tr key={props.pair.id} className={css_ticker} onClick={navigateToShowMarket}>
      <td>{props.pair.exchange_name}</td>
      <td>{props.pair.last_ticker.last}</td>
      <td>{props.pair.last_ticker.volume}</td>
    </tr>
  )

}

export default MarketPair
