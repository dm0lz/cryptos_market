import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import PortfolioList from './../components/portfolio_list'
import { Grid, Glyphicon, Row, Col, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as portfolio_actions from './../actions'
import * as assets_actions from './../../assets/actions'
import * as sessions_actions from './../../sessions/actions'
import * as alarms_actions from './../../alarms/actions'
import store from './../../main/store'
import history from './../../main/history'
import CandleChart from './../components/candle_chart'
import AreaChart from './../components/area_chart'
import LineChartShow from './../components/line_chart_show'
import AssetOverview from './../components/asset_overview'
import PortfolioPieChart from './../components/portfolio_pie_chart'
import AddAssetModal from './../components/add_asset_modal'


class PortfolioContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(localStorage.jwt && localStorage.jwt.length){
      this.props.fetch_portfolio_assets(localStorage.jwt)
      if(!this.props.assets_infos.length){
        this.props.fetch_assets_infos()
      }
    }else{
      history.push('sign_in')
    }
  }

  open_asset_modal = () => {
    this.props.set_show_add_asset_modal(true)
  }

  // one_month_scale = () => {
  //   this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1m')
  //   this.props.set_selected_time_range('1m')
  // }
  //
  // seven_days_scale = () => {
  //   this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '7d')
  //   this.props.set_selected_time_range('7d')
  // }
  //
  // one_day_scale = () => {
  //   this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1d')
  //   this.props.set_selected_time_range('1d')
  // }
  //
  // six_hours_scale = () => {
  //   this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '6h')
  //   this.props.set_selected_time_range('6h')
  // }

  set_candle_chart_type = () => {
    this.props.set_selected_chart_type('candle')
  }

  set_area_chart_type = () => {
    this.props.set_selected_chart_type('area')
  }

  set_line_chart_type = () => {
    this.props.set_selected_chart_type('line')
  }

  render() {

    let assets_chart_data = this.props.assets_chart_data[this.props.selected_portfolio_asset] === undefined ?
      []
      :
      this.props.assets_chart_data[this.props.selected_portfolio_asset]

    if(this.props.portfolio_assets_loading){
      return(
        <article>
          <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
        </article>
      )
    }

    if(!this.props.portfolio_assets_loading && !this.props.portfolio_assets.length){
      return(
        <article>
          { this.props.is_add_asset_modal_visible && <AddAssetModal assets_infos={this.props.assets_infos} /> }
          <br/><br/><br/><br/><br/><br/><br/>
          <p className='text-center'>You don't have any portfolio asset yet.</p>
          <br/>
          <Button className='btn btn-block' onClick={this.open_asset_modal}>Add Asset to Portfolio</Button>
        </article>
      )
    }

    return(
      <Grid fluid={true}>

        { this.props.is_add_asset_modal_visible && <AddAssetModal assets_infos={this.props.assets_infos} /> }

        <Row className="portfolio-chart-row">
          {
            !this.props.portfolio_assets.length &&
              <p className='text-center'>You don't have any portfolio asset yet.</p>
          }
          <Col xs={12} md={2} sm={2}>
            <AssetOverview />
          </Col>
          <Col xs={12} md={10} sm={10}>
            <header className="asset_show_header_right">
              <Button type="submit" value="none" className={this.props.selected_chart_type === 'candle' ? 'btn active' : 'btn'} onClick={this.set_candle_chart_type}><Glyphicon glyph="stats" />&nbsp;Candle</Button>&nbsp;
              <Button type="submit" value="none" className={this.props.selected_chart_type === 'area' ? 'btn active' : 'btn'} onClick={this.set_area_chart_type}><Glyphicon glyph="stats" />&nbsp;Area</Button>&nbsp;
              <Button type="submit" value="none" className={this.props.selected_chart_type === 'line' ? 'btn active' : 'btn'} onClick={this.set_line_chart_type}><Glyphicon glyph="stats" />&nbsp;Line</Button>&nbsp;
            </header>
            {
              assets_chart_data.length === 0 ?
                <div className="loader-small"></div>
                :
                <div className='candle-chart-show-portfolio'>
                  <h2 className='text-center'>{this.props.selected_portfolio_asset} - USD</h2>

                  {/*<CandleChart data={assets_chart_data} />*/}
                  {
                    chart_switcher(this.props.selected_chart_type, assets_chart_data)
                  }
                </div>
            }
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={8} sm={8}>
            <PortfolioList />
            <Button className='btn' onClick={this.open_asset_modal}>Add Asset</Button>
          </Col>
          <Col xs={12} md={4} sm={4}>
            <PortfolioPieChart />
          </Col>
        </Row>

      </Grid>
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
    jwt: state.SessionsReducer.jwt,
    portfolio_assets: state.PortfolioReducer.portfolio_assets,
    selected_portfolio_asset: state.PortfolioReducer.selected_portfolio_asset,
    assets_chart_data: state.AssetsReducer.assets_chart_data,
    is_add_asset_modal_visible: state.PortfolioReducer.is_add_asset_modal_visible,
    //selected_time_range: state.PortfolioReducer.selected_time_range,
    selected_chart_type: state.SessionsReducer.selected_chart_type,
    portfolio_assets_loading: state.PortfolioReducer.portfolio_assets_loading,
    assets_infos: state.AlarmsReducer.assets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions, sessions_actions, alarms_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer)
