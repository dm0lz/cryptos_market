import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import MarketList from './../components/market_list'
import { Grid, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'
import store from './../../main/store'

const styles = {}

class MarketContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.markets.length === 0){
      this.props.set_markets_loading(true)
      this.props.fetch_markets(this.props.current_page + 1)
    }
    //if(localStorage.getItem('jwt')){
      this.createSocket()
    //}
    //window.addEventListener('scroll', this.onScroll, false)
  }

  // onScroll = () => {
  //   if(window.location.pathname === '/asset-pairs'){
  //     if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
  //             && this.props.markets.length && !this.props.is_markets_loading ) {
  //       this.props.set_markets_loading(true)
  //       this.props.fetch_markets(this.props.current_page + 1)
  //     }
  //   }
  // }

  createSocket() {
    //const token = localStorage.getItem('jwt')
    this.tickers_consumer = Cable.createConsumer()
    // if(window.location.port === '3000'){
    //   this.tickers_consumer = Cable.createConsumer('ws://localhost:3000/cable')
    // }else{
    //   this.tickers_consumer = Cable.createConsumer('ws://95.85.52.224/cable')
    // }
    this.tickers_subscription = this.tickers_consumer.subscriptions.create({
        channel: 'TickersChannel'
      }, {
      connected: () => {
        console.log('successfully connected to TickersChannel')
      },
      received: (data) => {
        //console.log(data.ticker)
        this.props.update_markets_ticker(this.props.markets, JSON.parse(data.ticker))
      }
    })
  }

  componentWillUnmount(){
    //window.removeEventListener('scroll', this.onScroll)
    this.tickers_subscription && this.tickers_consumer.subscriptions.remove(this.tickers_subscription)
  }

  render() {
    if (!this.props.markets.length) {
      if(!this.props.is_markets_loading){
        return (
          <p className='text-center no-result'>No result</p>
        )
      }
			return (
        <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
      )
		}
    return(
      <Grid fluid={true}>
        <MarketList markets={this.props.markets}></MarketList>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    markets: state.MarketsReducer.markets,
    current_page: state.MarketsReducer.current_page,
    is_markets_loading: state.MarketsReducer.is_markets_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)
