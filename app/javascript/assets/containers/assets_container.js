import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import AssetList from './../components/asset_list'
import { Grid, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import store from './../../main/store'

class AssetsContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.assets.length === 0){
      this.props.set_assets_loading(true)
      this.props.fetch_assets(this.props.current_page + 1)
    }
    //this.createSocket()
    //window.addEventListener('scroll', this.onScroll, false)
  }

  // onScroll = () => {
  //   if(window.location.pathname === '/'){
  //     if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
  //             && this.props.assets.length && !this.props.is_assets_loading ) {
  //       this.props.set_assets_loading(true)
  //       this.props.fetch_assets(this.props.current_page + 1)
  //     }
  //   }
  // }

  // createSocket() {
  //   this.tickers_consumer = Cable.createConsumer()
  //   this.tickers_subscription = this.tickers_consumer.subscriptions.create({
  //       channel: 'TickersChannel'
  //     }, {
  //     connected: () => {
  //       console.log('successfully connected to TickersChannel')
  //     },
  //     received: (data) => {
  //       //console.log(data.ticker)
  //       this.props.update_markets_ticker(this.props.markets, JSON.parse(data.ticker))
  //     }
  //   })
  // }

  // componentWillUnmount(){
  //   window.removeEventListener('scroll', this.onScroll)
  //   //this.tickers_subscription && this.tickers_consumer.subscriptions.remove(this.tickers_subscription)
  // }

  render() {
    if (this.props.is_assets_loading && !this.props.assets.length) {
			return (
        <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
      )
		}
    return(
      <Grid fluid={true}>
        { this.props.assets.length ?
            <AssetList markets={this.props.assets}></AssetList>
            :
            <p className='text-center no-result'>No result</p>
        }
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    assets: state.AssetsReducer.assets,
    current_page: state.AssetsReducer.current_page,
    is_assets_loading: state.AssetsReducer.is_assets_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetsContainer)
