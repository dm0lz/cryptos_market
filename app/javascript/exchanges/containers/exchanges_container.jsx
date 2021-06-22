import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon, Table } from 'react-bootstrap'
import ExchangeRow from './../components/exchange_row'
import uuid from 'uuid/v1'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as exchanges_actions from './../actions'

class ExchangesContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(!this.props.exchanges.length){
      this.props.fetch_exchanges()
    }
  }

  render() {
    if(this.props.exchanges_loading){
      return(
        <article>
          <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
        </article>
      )
    }
    let exchanges = this.props.exchanges.sort((a, b) => a.name.localeCompare(b.name)) || []
    return(
      <Grid fluid={true}>
        <br/>
        <Table responsive condensed hover>
      		<thead>
      			<tr>
      				<th></th>
              <th>Name</th>
              <th>Base Api Url</th>
              <th>Country</th>
              <th>Total Markets Nb</th>
              <th>Watched Markets Nb</th>
      				<th>Last Ticker Update</th>
      			</tr>
      		</thead>
      		<tbody>
          {
            exchanges.map((exchange) =>
              <ExchangeRow key={uuid()} exchange={exchange}></ExchangeRow>
            )
          }
          </tbody>
        </Table>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    exchanges: state.ExchangesReducer.exchanges,
    exchanges_loading: state.ExchangesReducer.exchanges_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(exchanges_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangesContainer)
