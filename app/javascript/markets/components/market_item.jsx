import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import MarketTable from './market_table'
import MarketSpread from './market_spread'
import MarketChartIndex from './market_chart_index'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

const styles = {
  market_item: {
    'overflow': 'hidden',
  },
  title: {
    //'color': '#adf96c'
    color: '#ff7f0e'
  },
  item_header: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  header_price: {
    color: 'gold'
  },
  chart_glyph: {
    marginTop: '0.7em'
  },
  chart_list_glyph: {
    display: 'flex'
  },
  arrow_up: {
    color: 'green'
  },
  arrow_down: {
    color: 'red'
  }
}

const getHighestPrice = (pairs) => {
  let a = []
  pairs.map((pair) => a.push(pair.last_ticker.last) )
  let b = a.filter((x) => x !== null )
  let c = b.map((nb) => parseFloat(nb))
  return Math.max(...c)
}

class MarketItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles
    }
  }


  get_style = () => {
    return this.state.style.market_item
  }

  show_chart_tab = () => {
    let payload = {market_id: this.props.market.id, tab: 'chart'}
    this.props.select_tab(payload)
    //this.setState({current_tab: 'chart'})
  }

  show_table_tab = () => {
    let payload = {market_id: this.props.market.id, tab: 'table'}
    this.props.select_tab(payload)
    //this.setState({current_tab: 'table'})
  }

  show_spread_tab = () => {
    let payload = {market_id: this.props.market.id, tab: 'spread'}
    this.props.select_tab(payload)
    //this.setState({current_tab: 'spread'})
  }

  get_lowest_ask = (pairs) => {
    let a = []
    pairs.forEach((pair) => a.push(pair.last_ticker.ask) )
    let b = a.filter((x) => x !== null )
    let c = b.map((nb) => parseFloat(nb))
    return Math.min(...c)
  }

  get_highest_bid = (pairs) => {
    let a = []
    pairs.forEach((pair) => a.push(pair.last_ticker.bid) )
    let b = a.filter((x) => x !== null )
    let c = b.map((nb) => parseFloat(nb))
    return Math.max(...c)
  }

  get_spread = (pairs) => {
    let low = this.get_lowest_ask(pairs)
    let high = this.get_highest_bid(pairs)
    //return Math.round( ((high - low) / (high + low)) * 100 )
    return ( ((high - low) / (low)) * 100 ).toFixed(2)
  }

  get_percent_change = (pairs) => {
    let change = 0
    this.props.market.pairs.forEach((pair) => {
      if(pair.last_ticker.percent_change === null){
        return
      }
      change = pair.last_ticker.percent_change
    })
    if(change > 0){
      return (
        <div style={this.state.style.arrow_up}>{parseFloat(change).toFixed(2)} %&nbsp;<Glyphicon glyph="arrow-up" /></div>
      )
    }else {
      return (
        <div style={this.state.style.arrow_down}>{parseFloat(change).toFixed(2)} %&nbsp;<Glyphicon glyph="arrow-down" /></div>
      )
    }
  }

  get_latest_price = (pairs) => {
    let pair = pairs.find(pair => pair.last_to_be_updated === true)
    if(pair){
      return pair.last_ticker.last
    }else{
      return pairs.length > 0 ? pairs[0].last_ticker.last : 0
    }
  }

  render(){
    let tab = this.props.current_tab[this.props.market.id] || 'table'
    return(
      <div>
        {(() => {
          switch (tab) {
            /*case "chart":
              return (
                <div>
                  <div style={this.state.style.item_header}>
                    <div style={styles.chart_glyph} onClick={this.show_table_tab}>
                      <Glyphicon glyph="list" />
                    </div>
                    <h4 style={this.state.style.title}><img src={this.props.market.base_currency_logo} />&nbsp;&nbsp;{this.props.market.name}&nbsp;&nbsp;<img src={this.props.market.quote_currency_logo} /></h4>
                    <h4 style={this.state.style.title}>{this.get_percent_change(this.props.market.pairs)}</h4>
                    <h4 style={this.state.style.header_price}>{this.get_latest_price(this.props.market.pairs)}</h4>
                  </div>
                  <div style={this.state.style.item_header}>
                    <p>Ask: {this.get_lowest_ask(this.props.market.pairs)}</p>
                    <p>Bid: {this.get_highest_bid(this.props.market.pairs)}</p>
                    <p onClick={this.show_spread_tab}>
                      <Glyphicon glyph="search" /> Spread: {this.get_spread(this.props.market.pairs)}%
                    </p>
                  </div>
                  <MarketChartIndex market={this.props.market} charts_data={this.props.charts_data}></MarketChartIndex>
                </div>
              )*/
            case "spread":
              return (
                <div>
                <div style={this.state.style.item_header}>
                  <div style={styles.chart_list_glyph}>
                    <div style={styles.chart_glyph} onClick={this.show_table_tab}>
                      <Glyphicon glyph="list" />
                    </div>
                  </div>
                  <h4 style={this.state.style.title}><img src={this.props.market.base_currency_logo} />&nbsp;&nbsp;{this.props.market.name}&nbsp;&nbsp;<img src={this.props.market.quote_currency_logo} /></h4>
                  <h4 style={this.state.style.title}>{this.get_percent_change(this.props.market.pairs)}</h4>
                  <h4 style={this.state.style.header_price}>{this.get_latest_price(this.props.market.pairs)}</h4>
                  </div>
                  <div style={this.state.style.item_header}>
                    <p>Ask: {this.get_lowest_ask(this.props.market.pairs)}</p>
                    <p>Bid: {this.get_highest_bid(this.props.market.pairs)}</p>
                    <p onClick={this.show_spread_tab}>
                      <Glyphicon glyph="search" /> Spread: {this.get_spread(this.props.market.pairs)}%
                    </p>
                  </div>
                  <MarketSpread pairs={this.props.market.pairs}></MarketSpread>
                </div>
              )
            case "table":
              return (
                <div>
                  <div style={this.state.style.item_header}>
                  <div style={styles.chart_glyph} onClick={this.show_table_tab}>
                    <Glyphicon glyph="list" />
                  </div>
                  <h4 style={this.state.style.title}><img src={this.props.market.base_currency_logo} />&nbsp;&nbsp;{this.props.market.name}&nbsp;&nbsp;<img src={this.props.market.quote_currency_logo} /></h4>
                  <h4 style={this.state.style.title}>{this.get_percent_change(this.props.market.pairs)}</h4>
                  <h4 style={this.state.style.header_price}>{this.get_latest_price(this.props.market.pairs)}</h4>
                  </div>
                  <div style={this.state.style.item_header}>
                    <p>Ask: {this.get_lowest_ask(this.props.market.pairs)}</p>
                    <p>Bid: {this.get_highest_bid(this.props.market.pairs)}</p>
                    <p onClick={this.show_spread_tab}>
                      <Glyphicon glyph="search" /> Spread: {this.get_spread(this.props.market.pairs)}%
                    </p>
                  </div>
                  <MarketTable pairs={this.props.market.pairs}></MarketTable>
                </div>
              )
            default:
              return (<div></div>);
          }
        })()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    markets: state.MarketsReducer.markets,
    charts_data: state.MarketsReducer.charts_data,
    current_tab: state.MarketsReducer.current_tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketItem)
