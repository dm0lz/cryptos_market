import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Table } from 'react-bootstrap'
import MarketPair from './market_pair'

const styles = {
  red_flash: {
    color: 'red'
  }
}

const MarketTable = (props) => {
    let pairs = props.pairs.map((pair) => {
      let last_value = parseFloat(pair.last_ticker.last)
      let last_ticker_value = isNaN(last_value) ? 0 : last_value
      return {
        pair_id: pair.id,
        ticker: last_ticker_value,
        pair: pair
      }
    })
    let ordered_pairs = pairs.sort((a, b) => b.ticker - a.ticker)
    let pairs_array = ordered_pairs.map((pair) => pair.pair)
    return(
      <Table condensed responsive hover>
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Last</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {
            pairs_array.map((pair) =>
              <MarketPair key={pair.id} pair={pair}></MarketPair>
            )
          }
        </tbody>
      </Table>
    )

}

export default MarketTable
