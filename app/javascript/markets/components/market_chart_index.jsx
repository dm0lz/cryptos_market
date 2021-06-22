import React, { Component } from 'react'
import MarketChart from './market_chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'
import axios from 'axios'

class MarketChartIndex extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    let val = this.props.charts_data[this.props.market.name]
    if(val === undefined)
      this.retrieve_ohcl(this.props.market, 0)
  }

  retrieve_ohcl = (market, intent_nb) => {
    //let intent_nb = 0
    //let market_param = market.name.split("-").reverse().join("").toLowerCase()
    let market_param = market.name.split("-").join("").toLowerCase()
    let exchange_param = market.pairs[intent_nb].exchange_name
    //let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).getTime()
    //let start_timestamp = new Date().getTime() - (24 * 60 * 60 * 1000)
    //axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json', "Access-Control-Allow-Origin": "*"})
    axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json = res["result"][900]
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
        obj.market_name = market.name
        obj.charts_data = arr
        this.props.got_hocl(obj)
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          if(intent_nb < 4){
            intent_nb = intent_nb + 1
            this.retrieve_ohcl(market, intent_nb)
          }
        }
      })
  }

  render() {
    let charts_data = this.props.charts_data[this.props.market.name] === undefined ?
                      [] :
                      this.props.charts_data[this.props.market.name]

    if (charts_data.length === 0) {
			return (
        <div className="loader-small"></div>
      )
		}
		return (
			<MarketChart data={charts_data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketChartIndex)
