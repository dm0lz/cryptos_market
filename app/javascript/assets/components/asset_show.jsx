import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TypeChooser } from "react-stockcharts/lib/helper"
import CandleChart from './candle_chart'
import AreaChart from './area_chart'
import LineChartShow from './line_chart_show'
import AssetShowList from './asset_show_list'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import * as sessions_actions from './../../sessions/actions'
import { Glyphicon, Button } from 'react-bootstrap'
import history from './../../main/history'

class AssetShow extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, this.props.selected_time_range)
  }



  one_month_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1m')
    this.props.set_selected_time_range('1m')
  }

  three_month_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '3m')
    this.props.set_selected_time_range('3m')
  }

  six_month_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '6m')
    this.props.set_selected_time_range('6m')
  }

  one_year_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1y')
    this.props.set_selected_time_range('1y')
  }

  two_year_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '2y')
    this.props.set_selected_time_range('2y')
  }

  seven_days_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '7d')
    this.props.set_selected_time_range('7d')
  }

  one_day_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1d')
    this.props.set_selected_time_range('1d')
  }

  six_hours_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '6h')
    this.props.set_selected_time_range('6h')
  }

  set_candle_chart_type = () => {
    this.props.set_selected_chart_type('candle')
  }

  set_area_chart_type = () => {
    this.props.set_selected_chart_type('area')
  }

  set_line_chart_type = () => {
    this.props.set_selected_chart_type('line')
  }

  navigate_back = () => {
    history.push('/')
  }

  render(){
    let assets_chart_data = this.props.assets_chart_data[this.props.match.params.symbol] === undefined ?
                      [] :
                      this.props.assets_chart_data[this.props.match.params.symbol]
    if (assets_chart_data.length === 0) {
			return (
        <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
      )
		}
    return(
      <div className='chart-asset-show container'>
        <h2 className='text-center'>{this.props.match.params.symbol}-USD</h2>
        <header className="asset_show_header_right">
          <Button type="submit" value="none" className={this.props.selected_time_range === '2y' ? 'btn active' : 'btn'} onClick={this.two_year_scale}>2 years</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '1y' ? 'btn active' : 'btn'} onClick={this.one_year_scale}>1 year</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '6m' ? 'btn active' : 'btn'} onClick={this.six_month_scale}>6 Month</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '3m' ? 'btn active' : 'btn'} onClick={this.three_month_scale}>3 Month</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '1m' ? 'btn active' : 'btn'} onClick={this.one_month_scale}>1 Month</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '7d' ? 'btn active' : 'btn'} onClick={this.seven_days_scale}>7 Days</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '1d' ? 'btn active' : 'btn'} onClick={this.one_day_scale}>1 Day</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '6h' ? 'btn active' : 'btn'} onClick={this.six_hours_scale}>6 Hours</Button>
        </header>
        <header className="asset_show_header_left">
          <Button type="submit" value="none" className='btn' onClick={this.navigate_back}><Glyphicon glyph="arrow-left" />&nbsp;Back</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_chart_type === 'candle' ? 'btn active' : 'btn'} onClick={this.set_candle_chart_type}><Glyphicon glyph="stats" />&nbsp;Candle</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_chart_type === 'area' ? 'btn active' : 'btn'} onClick={this.set_area_chart_type}><Glyphicon glyph="stats" />&nbsp;Area</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_chart_type === 'line' ? 'btn active' : 'btn'} onClick={this.set_line_chart_type}><Glyphicon glyph="stats" />&nbsp;Line</Button>&nbsp;
        </header>

        {
          chart_switcher(this.props.selected_chart_type, assets_chart_data)
        }

        <AssetShowList symbol={this.props.match.params.symbol} />

      </div>
    )
  }
}

const chart_switcher = (chart_type, chart_data) => {
  switch(chart_type){
    case 'candle':
      return (
        <article className='candle-chart-show'>
          <CandleChart data={chart_data} />
        </article>
      )
    case 'area':
      return (
        <article className='line-chart-show'>
          <AreaChart data={chart_data} />
        </article>
      )
    case 'line':
      return (
        <article className='line-chart-show'>
          <LineChartShow data={chart_data} />
        </article>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    assets_chart_data: state.AssetsReducer.assets_chart_data,
    selected_time_range: state.AssetsReducer.selected_time_range,
    selected_chart_type: state.SessionsReducer.selected_chart_type
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, assets_actions, sessions_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetShow)
