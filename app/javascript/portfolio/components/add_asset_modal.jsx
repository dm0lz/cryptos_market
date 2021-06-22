import React, { Component } from 'react'
import PortfolioRow from './portfolio_row'
import { Row, Table, FormControl, FormGroup, Form, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../../assets/actions'
import * as portfolio_actions from './../../portfolio/actions'
import uuid from 'uuid/v1'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import VirtualizedSelect from 'react-virtualized-select'

const styles = {

}

class AddAssetModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      assets_infos: [],
      selected_value: undefined,
      amount: 0,
      is_submited: false
    }
  }

  componentDidMount(){
    let payload = this.props.assets_infos.map((asset) => {
      return {
        value: asset.id,
        symbol: asset.symbol,
        label: asset.name + ' (' + asset.symbol + ')' + ' - ' + asset.price_usd + ' USD',
        usd_price: asset.price_usd
      }
    })
    this.setState({assets_infos: payload})
    // axios.get('/api/v1/public/asset_infos/all', {headers: {responseType: 'json'}})
    //   .then((response) => {
    //     let payload = response.data.assets_infos.map((asset) => {
    //       return {
    //         value: asset.id,
    //         symbol: asset.symbol,
    //         label: asset.name + ' (' + asset.symbol + ')'
    //       }
    //     })
    //     this.setState({assets_infos: payload})
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  close_asset_modal = () => {
    this.props.show_add_asset_modal(false)
  }

  amount_form_update = (event) => {
    this.setState({is_submited: false})
    this.setState({amount: event.target.value})
  }

  asset_form_submit = (event) => {
    event.preventDefault()
    this.setState({is_submited: true})
    let payload = {
      asset_info: this.state.selected_value,
      amount: this.state.amount
    }
    this.props.post_add_portfolio_asset(payload)
  }

  render(){
    let assets_infos = this.props.assets_infos.map((asset) => {
      return {
        value: asset.id,
        symbol: asset.symbol,
        label: asset.name + ' (' + asset.symbol + ')' + ' - ' + asset.price_usd + ' USD',
        usd_price: asset.price_usd
      }
    })
    return(
      <Modal show={this.props.is_add_asset_modal_visible} onHide={this.close_asset_modal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Asset to Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className='text-center sessions_error'>{this.props.errors.code} {this.props.errors.message}</p>
          <h4>Choose an Asset</h4>
          <Form horizontal>
            <VirtualizedSelect
              options={assets_infos}
              onChange={(selectValue) => this.setState({selected_value: selectValue})}
              value={this.state.selected_value}
            />
            <br/>
            <FormControl type="number" placeholder="Amount" value={this.state.amount} onChange={this.amount_form_update} />
            <br/>
             <Button className='btn btn-block btn-success' type="submit"  disabled={this.state.is_submited} onClick={this.asset_form_submit}>Create</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-danger' onClick={this.close_asset_modal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    portfolio_assets: state.PortfolioReducer.portfolio_assets,
    is_add_asset_modal_visible: state.PortfolioReducer.is_add_asset_modal_visible,
    errors: state.PortfolioReducer.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssetModal)
