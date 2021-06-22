import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Cable from 'actioncable'
import axios from 'axios'
import { cloneDeep } from 'lodash'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      markets: []
    }
  }

  componentDidMount() {
    this.createSocket()
    this.getMarkets()
  }

  createSocket = () => {
    let cable = Cable.createConsumer();
    this.chats = cable.subscriptions.create({
      channel: 'TickersChannel'
    }, {
      connected: () => {
        console.log('connnected successfully')
      },
      received: (data) => {
        console.log(data.ticker)
        let pair_ticker = JSON.parse(data.ticker)
        this.updateMarketTicker(pair_ticker)
      }
    });
  }

  getMarkets = () => {
    axios.get('/api/v1/public/markets', {responseType: 'json'})
      .then((response) => {
        //console.log(response)
        this.setMarkets(response.data.markets)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  updateMarketTicker = (ticker) => {
    let markts = [...this.state.markets]
    let pair_ticker = ticker
    markts.map((market) =>
      market.pairs.map((pair) => {
        if(pair.id === pair_ticker.pair_id){
          const lastticker = {
            id: pair_ticker.id,
            ask: pair_ticker.ask,
            bid: pair_ticker.bid,
            last: pair_ticker.last
          }
          pair.last_ticker = lastticker
        }
      })
    )
    this.setState({markets: markts})
  }

  setMarkets = (markets) => {
    this.setState({
      markets: markets
    })
  }

  render() {
    return(
      <div>
        <MarketsList markets={this.state.markets}></MarketsList>
      </div>
    )
  }

}


export class Market extends Component {
  render(){
    return(
      <li>
        <div>
          {this.props.market.id}: {this.props.market.name}
          <ul>
            {
              this.props.market.pairs.map((pair) =>
                <li key={pair.id}>
                  {pair.exchange_name} ===>
                  Ask:{pair.last_ticker.ask} : Bid:{pair.last_ticker.bid} : Last:{pair.last_ticker.last}
                </li>
              )
            }
          </ul>
        </div>
      </li>
    )
  }
}

export class MarketsList extends Component {
  render(){
    return(
      <ul>
        {
          this.props.markets.map((market) =>
            <Market key={market.id} market={market}></Market>
          )
        }
      </ul>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
