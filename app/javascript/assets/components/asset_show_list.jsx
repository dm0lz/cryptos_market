import React, { Component } from 'react'
import axios from 'axios'
import { Glyphicon, Button, Table } from 'react-bootstrap'
import NumberFormat from 'react-number-format'

export default class AssetShowList extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      data: {}
    }
  }

  componentDidMount(){
    axios.get('/api/v1/public/asset_infos/' + this.props.symbol.toUpperCase(), {responseType: 'json'})
    .then((response) => {
      let res = response.data
      this.setState({data: res.asset_info});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  urlParser = (string) => {
    const match = string.match(/\b(https|http)?:\/\/\S+/gi);
    return match ? match[0] : null;
  }

  render() {
    const {data} = this.state;
    const link = data.description && this.urlParser(data.description);
    const description = data.description && data.description.replace(link, `<a href=${link} target='_blank'>${link}</a>`);
    return (
      <div className='container'>
        <hr/>
          <div dangerouslySetInnerHTML={{ __html: description}}></div>
        <hr/>
        <Table responsive condensed hover>
          <thead>
            <tr>
              <th>price </th>
              <th>volume 24h</th>
              <th>percent change 1h</th>
              <th>percent change 24h</th>
              <th>percent change 7d</th>
              <th>market cap</th>
              <th>circulating supply</th>
              <th>total supply</th>
              <th>max supply</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.isLoading
              ? (
                <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
              ) :
            ( <tr>
                <td>
                  <NumberFormat value={data.price_usd} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} />
                </td>
                <td>
                  <NumberFormat value={data.volume_24h} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={0} />
                </td>
                <td>{data.percent_change_1h && parseFloat(data.percent_change_1h).toFixed(1) || 0}%</td>
                <td>{data.percent_change_24h && parseFloat(data.percent_change_24h).toFixed(1)}%</td>
                <td>{data.percent_change_7d && parseFloat(data.percent_change_7d).toFixed(1)}%</td>
                <td>
                  <NumberFormat value={data.market_cap} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={0} />
                </td>
                <td>
                  <NumberFormat value={data.available_supply} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={0} />
                </td>
                <td>
                  <NumberFormat value={data.total_supply} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={0} />
                </td>
                <td>
                  <NumberFormat value={data.max_supply} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={0} />
                </td>
            </tr> )
          }
          </tbody>
        </Table>
      </div>
    )
  }

}

