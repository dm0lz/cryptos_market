import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap';
import uuid from 'uuid/v1'

const ExchangeRow = (props) => {
  return(
    <tr>
      <td></td>
      <td>{props.exchange.name}</td>
      <td>{props.exchange.base_url}</td>
      <td>{props.exchange.country}</td>
      <td>{props.exchange.markets_nb}</td>
      <td>{props.exchange.watched_markets_nb}</td>
      <td>{props.exchange.last_ticker_request}</td>
    </tr>
  )
}

export default ExchangeRow
