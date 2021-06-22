import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap';

export default class MarketSpread extends Component {

  constructor(props){
    super(props)
  }

  get_lowest_ask = (pairs) => {
    let arr = []
    pairs.forEach((pair) => {
      if(pair.last_ticker.ask !== null)
        arr.push({pair: pair, lowest_ask: pair.last_ticker.ask})
    })
    let sorted_arr = arr.sort((x, y) => x.lowest_ask.localeCompare(y.lowest_ask))
    let lowest_ask = sorted_arr[0]
    return lowest_ask
  }

  get_highest_bid = (pairs) => {
    let arr = []
    pairs.forEach((pair) => {
      if(pair.last_ticker.bid !== null)
        arr.push({pair: pair, highest_bid: pair.last_ticker.bid})
    })
    let sorted_arr = arr.sort((x, y) => x.highest_bid.localeCompare(y.highest_bid))
    let highest_bid = sorted_arr[sorted_arr.length -1]
    return highest_bid
  }

  get_spread = (pairs) => {
    let low = parseFloat(this.get_lowest_ask(pairs).lowest_ask)
    let high = parseFloat(this.get_highest_bid(pairs).highest_bid)
    //return Math.round( ((high - low) / (high + low)) * 100 )
    return ( ((high - low) / (low)) * 100 ).toFixed(2)
  }

  render(){
    let bid = this.get_highest_bid(this.props.pairs)
    let ask = this.get_lowest_ask(this.props.pairs)
    let spread = this.get_spread(this.props.pairs)
    return(
      <div>
        <h6>Lowest Ask</h6>
        <p>{ask.pair.exchange_name} : {ask.lowest_ask} : volume : {ask.pair.last_ticker.volume}</p>
        <h6>Highest Bid</h6>
        <p>{bid.pair.exchange_name} : {bid.highest_bid} : volume : {bid.pair.last_ticker.volume}</p>
        <h6>Spread</h6>
        <p>{spread} %</p>

      </div>
    )
  }

}
