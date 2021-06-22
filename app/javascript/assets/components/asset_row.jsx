import React, { Component } from 'react'
import AssetRow from './asset_row'
import { Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'
import history from './../../main/history'
import LineChart from './line_chart'
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

class AssetsRow extends Component {

  constructor(props){
    super(props)
    this.state = { style: styles }
  }

  componentDidMount () {
    if(this.props.assets_chart_data[this.props.asset.symbol] === undefined)
      this.props.retrieve_assets_ohcl(this.props.asset.symbol, this.props.time_scale)
  }

  componentWillUnmount() {
  }

  navigateToShowAsset = () => {
    history.push('/' + this.props.asset.symbol)
  }

  render(){
    let asset_symbol = this.props.asset.symbol === 'MIOTA' ? 'IOT' : this.props.asset.symbol
    let assets_chart_data = this.props.assets_chart_data[asset_symbol] === undefined ?
                      [] :
                      this.props.assets_chart_data[asset_symbol]
    return(
      <tr className="asset_row" onClick={this.navigateToShowAsset}>
				<td><span>{this.props.asset.rank}</span></td>
        <td><span className='asset-symbol-title'><img src={this.props.asset.logo_path_thumb} />&nbsp;&nbsp;{this.props.asset.name} ({this.props.asset.symbol})</span></td>
        <td className='asset-row-price'><NumberFormat value={this.props.asset.price_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} /></td>
				<td><NumberFormat value={this.props.asset.volume_usd_24h || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td><NumberFormat value={this.props.asset.market_cap_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td>{this.props.asset.percent_change_7d > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}&nbsp;{this.props.asset.percent_change_7d > 0 ? '+' + this.props.asset.percent_change_7d : this.props.asset.percent_change_7d}</td>
        <td>{this.props.asset.percent_change_24h > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}&nbsp;{this.props.asset.percent_change_24h > 0 ? '+' + this.props.asset.percent_change_24h : this.props.asset.percent_change_24h}</td>
        <td style={this.state.style.line_chart_width}>
          { assets_chart_data.length > 0 ?
            <LineChart data={assets_chart_data} />
            :
            <div className="loader-row"></div>
          }
        </td>
			</tr>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    assets: state.AssetsReducer.assets,
    current_page: state.AssetsReducer.current_page,
    is_assets_loading: state.AssetsReducer.is_assets_loading,
    assets_chart_data: state.AssetsReducer.assets_chart_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetsRow)
