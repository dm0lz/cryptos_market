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

class EditAssetModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      asset_infos: [],
      selected_value: undefined,
      amount: 0,
      is_edit_asset_modal_visible: false,
      is_submited: false
    }
  }

  componentDidMount(){
  }

  componentWillReceiveProps(){
    if(this.props.asset)
      this.setState({amount: this.props.asset.amount})
      this.setState({is_submited: false})
  }

  close_asset_modal = () => {
    this.props.show_edit_asset_modal(false)
  }

  amount_form_update = (event) => {
    this.setState({is_submited: false})
    this.setState({amount: event.target.value})
  }

  asset_form_submit = (event) => {
    event.preventDefault()
    this.setState({is_submited: true})
    let payload = {
      symbol: this.props.asset.symbol,
      amount: this.state.amount
    }
    this.props.patch_edit_portfolio_asset(payload)
  }

  render(){
    return(
      <Modal show={this.props.is_edit_asset_modal_visible} onHide={this.close_asset_modal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Portfolio Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className='text-center sessions_error'>{this.props.edit_errors.code} {this.props.edit_errors.message}</p>
          <Form horizontal>
            <h4 className='text-center'>{this.props.asset && this.props.asset.symbol}</h4>
            <br/>
            <FormControl type="number" placeholder="Amount" value={this.state.amount} onChange={this.amount_form_update} />
            <br/>
             <Button className='btn btn-block btn-success' type="submit" disabled={this.state.is_submited} onClick={this.asset_form_submit}>Update</Button>
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
    is_edit_asset_modal_visible: state.PortfolioReducer.is_edit_asset_modal_visible,
    edit_errors: state.PortfolioReducer.edit_errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAssetModal)
