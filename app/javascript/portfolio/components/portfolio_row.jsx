import React, { Component } from 'react'
import { Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../../assets/actions'
import * as portfolio_actions from './../actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'
import history from './../../main/history'
//import LineChart from './line_chart'
import axios from 'axios'


const styles = {
  arrow_up: {
    color: 'green'
  },
  arrow_down: {
    color: 'red'
  },
  line_chart_width: {
    width: '300px'
  }
}

class PortfolioRow extends Component {

  constructor(props){
    super(props)
    this.state = { style: styles }
  }

  navigateToShowAsset = () => {
    history.push('/' + this.props.asset.symbol)
  }

  select_portfolio_asset = (symbol) => {
    //console.log(symbol)
    if(this.props.assets_chart_data[symbol] === undefined){
      this.props.retrieve_assets_ohcl_candle(symbol, '7D')
    }
    this.props.update_selected_portfolio_asset(symbol)
  }

  render(){
    return(
      <tr className={this.props.portfolio_asset.asset_info.symbol === this.props.selected_portfolio_asset ? 'portfolio-asset-row active' : 'portfolio-asset-row'} onClick={() => this.select_portfolio_asset(this.props.portfolio_asset.asset_info.symbol)}>
        <td><span>{this.props.portfolio_asset.asset_info.rank}</span></td>
        <td><span className='portfolio-asset-symbol-title'><img src={this.props.portfolio_asset.asset_info.logo_path_thumb} />&nbsp;&nbsp;{this.props.portfolio_asset.asset_info.name} ({this.props.portfolio_asset.asset_info.symbol})</span></td>
        <td><span>{this.props.portfolio_asset.amount}</span></td>
        <td className='portfolio-asset-row-price'><NumberFormat value={this.props.portfolio_asset.asset_info.price_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} /></td>
        <td className='portfolio-asset-row-price'><NumberFormat value={this.props.portfolio_asset.asset_info.price_usd * this.props.portfolio_asset.amount || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} /></td>
        <td>{this.props.portfolio_asset.asset_info.percent_change_24h > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}{this.props.portfolio_asset.asset_info.percent_change_24h > 0 ? '+' + this.props.portfolio_asset.asset_info.percent_change_24h : this.props.portfolio_asset.asset_info.percent_change_24h}</td>
        <td>{this.props.portfolio_asset.asset_info.percent_change_7d > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}{this.props.portfolio_asset.asset_info.percent_change_7d > 0 ? '+' + this.props.portfolio_asset.asset_info.percent_change_7d : this.props.portfolio_asset.asset_info.percent_change_7d}</td>
			</tr>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selected_portfolio_asset: state.PortfolioReducer.selected_portfolio_asset,
    assets_chart_data: state.AssetsReducer.assets_chart_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioRow)
