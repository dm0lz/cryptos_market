import React, { Component } from 'react'
import PortfolioRow from './portfolio_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../../assets/actions'
import uuid from 'uuid/v1'

const styles = {

}


class PortfolioList extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      //time_scale: '7d'
    }
  }

  render(){
    //let portfolio_assets = this.props.portfolio_assets
    // if(portfolio_assets.length > 0){
    //   //order by total
    //   portfolio_assets = portfolio_assets.sort((a, b) => (parseFloat(a.amount) * parseFloat(a.asset_info.price_usd)) < (parseFloat(b.amount) * parseFloat(b.asset_info.price_usd)) )
    // }
    return(
      <Table responsive condensed hover>
    		<thead>
    			<tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Price </th>
            <th>Total </th>
            <th>24h Change</th>
            <th>7d Change</th>
    			</tr>
    		</thead>
    		<tbody>
        {
          this.props.portfolio_assets.map((asset) =>
            <PortfolioRow key={uuid()} portfolio_asset={asset}></PortfolioRow>
          )
        }
        </tbody>
      </Table>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    portfolio_assets: state.PortfolioReducer.portfolio_assets
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList)
