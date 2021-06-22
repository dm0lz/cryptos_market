import React, { Component } from 'react'
import PortfolioRow from './portfolio_row'
import { Row, Table, Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../../assets/actions'
import * as portfolio_actions from './../../portfolio/actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'
import EditAssetModal from './edit_asset_modal'

const styles = {

}


class AssetOverview extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      //time_scale: '7d'
    }
  }

  componentDidMount(){

  }

  edit_selected_asset = () => {
    this.props.set_show_edit_asset_modal(true)
  }

  remove_selected_asset = () => {
    this.props.remove_selected_asset(this.props.selected_portfolio_asset)
  }

  render(){

    let total = this.props.portfolio_assets.map((asset) => {
        return parseFloat(asset.amount) * parseFloat(asset.asset_info.price_usd)
    }).reduce((pv,cv)=>{
       return pv + (parseFloat(cv)||0);
    },0)

    let selected_portfolio_asset = this.props.selected_portfolio_asset
    let asset = this.props.portfolio_assets.find((asset) => {
      return asset.symbol === selected_portfolio_asset
    })

    return(
      <section>
        <EditAssetModal asset={asset} />
        <h2 className='text-center'>{asset && asset.asset_info.name || ''}</h2>
        <hr/>
        <h4 className='text-center'><NumberFormat value={asset && asset.amount && (asset.amount * asset.asset_info.price_usd) || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} /></h4>
        <hr/>
        <h4 className='text-center'>{asset && asset.amount || 0} {asset && asset.symbol}</h4>
        {/*<h4 className='text-center'>{total && asset && asset.amount && ((asset.amount * asset.asset_info.price_usd * 100) / total).toFixed(2)}%</h4>*/}
        <hr/>
        <h4 className='text-center'>{asset && asset.asset_info.price_btc || 0} BTC</h4>
        <hr/>
        <h4 className='text-center'>{asset && asset.asset_info.price_usd || 0} USD</h4>
        <hr/>

        <Row>
          <Col md={6}>
            <Button className='btn btn-block' type="submit" onClick={this.remove_selected_asset}>Remove</Button>
          </Col>
          <Col md={6}>
            <Button className='btn btn-block' type="submit" onClick={this.edit_selected_asset}>Edit</Button>
          </Col>
        </Row>

      </section>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    portfolio_assets: state.PortfolioReducer.portfolio_assets,
    selected_portfolio_asset: state.PortfolioReducer.selected_portfolio_asset
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetOverview)
