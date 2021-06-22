import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TypeChooser } from "react-stockcharts/lib/helper"
import CandleChart from './candle_chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'
import { Glyphicon, Button } from 'react-bootstrap'

class MarketShow extends Component {

  constructor(props){
    super(props)
    this.state = {
      market: {},
      time_scale: 900
    }
  }

  componentDidMount(){
    this.getMarket(this.props.match.params.market)
    this.retrieve_ohcl(this.props.match.params.market, 900)
  }

  getMarket = (market) => {
    axios.get("/api/v1/public/markets/" + market, {responseType: 'json'})
      .then((response) => {
        this.setMarket(response.data.market)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  setMarket = (market) => {
    this.setState({market: market})
  }


  retrieve_ohcl = (market, period) => {
    //let intent_nb = 0
    //let market_param = market.name.split("-").reverse().join("").toLowerCase()
    let market_param = market.split("-").join("").toLowerCase()
    let exchange_param = this.props.match.params.exchange_name
    //let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).getTime()
    //let start_timestamp = new Date().getTime() - (24 * 60 * 60 * 1000)
    //axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json', "Access-Control-Allow-Origin": "*"})
    axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=' + period, {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json = res["result"][period]
        let arr = []
        json.forEach((item) => {
          let obj = {
            date: new Date(item[0] * 1000),
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
            volume: item[5],
          }
          arr.push(obj)
        })
        let obj = {}
        obj.market_name = market
        obj.charts_data = arr
        this.props.got_hocl(obj)
        this.setState({time_scale: period})
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      })
  }

  one_minute_scale = () => {
    this.retrieve_ohcl(this.props.match.params.market, 60)
  }

  three_minutes_scale = () => {
    this.retrieve_ohcl(this.props.match.params.market, 180)
  }

  five_minutes_scale = () => {
    this.retrieve_ohcl(this.props.match.params.market, 300)
  }

  fifteen_minutes_scale = () => {
    this.retrieve_ohcl(this.props.match.params.market, 900)
  }

  one_hour_scale = () => {
    this.retrieve_ohcl(this.props.match.params.market, 3600)
  }

  one_day_scale = () => {
    this.retrieve_ohcl(this.props.match.params.market, 86400)
  }

  render(){
    let charts_data = this.props.charts_data[this.props.match.params.market] === undefined ?
                      [] :
                      this.props.charts_data[this.props.match.params.market]
    if (charts_data.length === 0) {
			return (
        <p className='text-center no-result'>No chart data yet</p>
      )
		}
    return(
      <div className='candle-chart'>
        <h2 className='text-center'>{this.state.market ? this.state.market.name : ''}</h2>
        <header className="market_show_header">
          <Button type="submit" className={this.state.time_scale === 60 ? 'btn active' : 'btn'} onClick={this.one_minute_scale}>1 Minute</Button>&nbsp;
          <Button type="submit" className={this.state.time_scale === 180 ? 'btn active' : 'btn'} onClick={this.three_minutes_scale}>3 Minutes</Button>&nbsp;
          <Button type="submit" className={this.state.time_scale === 300 ? 'btn active' : 'btn'} onClick={this.five_minutes_scale}>5 Minutes</Button>&nbsp;
          <Button type="submit" className={this.state.time_scale === 900 ? 'btn active' : 'btn'} onClick={this.fifteen_minutes_scale}>15 Minutes</Button>&nbsp;
          <Button type="submit" className={this.state.time_scale === 3600 ? 'btn active' : 'btn'} onClick={this.one_hour_scale}>1 Hour</Button>&nbsp;
          <Button type="submit" className={this.state.time_scale === 86400 ? 'btn active' : 'btn'} onClick={this.one_day_scale}>1 Day</Button>&nbsp;
        </header>
        <CandleChart data={charts_data} />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    charts_data: state.MarketsReducer.charts_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketShow)
