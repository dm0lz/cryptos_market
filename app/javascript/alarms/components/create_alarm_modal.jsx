import React, { Component } from 'react'
//import PortfolioRow from './portfolio_row'
import { Row, Col, FormControl, FormGroup, Form, Modal, Button, Checkbox } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as alarms_actions from './../actions'
import uuid from 'uuid/v1'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import VirtualizedSelect from 'react-virtualized-select'

const styles = {

}

class CreateAlarmModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      assets_infos: [],
      selected_asset_value: undefined,
      usd_price: 0,
      max_limit: 0,
      min_limit: 0,
      is_min_limit_active: false,
      is_max_limit_active: false,
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

    //this.setState({assets_infos: this.props.assets_infos})


    // axios.get('/api/v1/public/asset_infos/all', {headers: {responseType: 'json'}})
    //   .then((response) => {
    //     let payload = response.data.assets_infos.map((asset) => {
    //       return {
    //         value: asset.id,
    //         symbol: asset.symbol,
    //         label: asset.name + ' (' + asset.symbol + ')',
    //         usd_price: asset.price_usd
    //       }
    //     })
    //     this.setState({assets_infos: payload})
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  componentWillReceiveProps(){
    let payload = this.props.assets_infos.map((asset) => {
      return {
        value: asset.id,
        symbol: asset.symbol,
        label: asset.name + ' (' + asset.symbol + ')' + ' - ' + asset.price_usd + ' USD',
        usd_price: asset.price_usd
      }
    })
    this.setState({assets_infos: payload})
  }

  close_asset_modal = () => {
    this.props.set_show_create_alarm_modal(false)
  }

  max_limit_form_update = (event) => {
    this.setState({is_submited: false})
    this.setState({max_limit: event.target.value})
  }

  min_limit_form_update = (event) => {
    this.setState({is_submited: false})
    this.setState({min_limit: event.target.value})
  }

  create_alarm_form_submit = (event) => {
    event.preventDefault()
    this.setState({is_submited: true})
    if(this.state.selected_asset_value === undefined){
      this.props.set_create_alarm_error({message: "Please select an Asset"})
      return
    }
    if(!this.state.is_min_limit_active && !this.state.is_max_limit_active){
      this.props.set_create_alarm_error({message: "Please select a max limit or a min limit"})
      return
    }
    let max_limit = this.state.max_limit
    let min_limit = this.state.min_limit
    let payload = {
      asset_symbol: this.state.selected_asset_value.symbol,
      has_min_limit: this.state.is_min_limit_active,
      has_max_limit: this.state.is_max_limit_active,
      max_limit: this.state.is_max_limit_active ? max_limit : null,
      min_limit: this.state.is_min_limit_active ? min_limit : null
    }
    this.props.post_create_alarm(payload)
  }

  asset_select_update = (selected_asset_value) => {
    this.setState({is_submited: false})
    this.setState({selected_asset_value: selected_asset_value})
    //let asset = this.state.assets_infos.find((asset) => asset.symbol === selected_asset_value.symbol)
    //this.setState({max_limit: asset.usd_price, min_limit: asset.usd_price})
    this.setState({max_limit: selected_asset_value.usd_price, min_limit: selected_asset_value.usd_price})
  }

  toggle_max_limit = () => {
    this.setState({is_submited: false})
    let checkbox_checked = this.state.is_max_limit_active
    this.setState({is_max_limit_active: !checkbox_checked})
  }

  toggle_min_limit = () => {
    this.setState({is_submited: false})
    let checkbox_checked = this.state.is_min_limit_active
    this.setState({is_min_limit_active: !checkbox_checked})
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
      <Modal show={this.props.is_create_alarm_modal_visible} onHide={this.close_asset_modal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className='text-center sessions_error'>{this.props.errors.code} {this.props.errors.message}</p>
          <h4>Choose an Asset</h4>
          <Form horizontal>
            <VirtualizedSelect
              options={assets_infos}
              onChange={(val) => this.asset_select_update(val)}
              value={this.state.selected_asset_value}
            />
            <br/>
            <Row>
              <Col md={6}>
                <span>
                  <Checkbox onClick={this.toggle_max_limit} >
                    Send an email when price is Above
                  </Checkbox>
                </span>
                <FormControl type="number" placeholder="Amount" value={this.state.max_limit} onChange={this.max_limit_form_update} disabled={!this.state.is_max_limit_active} />
              </Col>
              <Col md={6}>
                <Checkbox onClick={this.toggle_min_limit} >
                  Send an email when price is Below
                </Checkbox>
                <FormControl type="number" placeholder="Amount" value={this.state.min_limit} onChange={this.min_limit_form_update} disabled={!this.state.is_min_limit_active} />
              </Col>
            </Row>
            <br/>
             <Button className='btn btn-block btn-success' type="submit" disabled={this.state.is_submited} onClick={this.create_alarm_form_submit}>Create</Button>
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
    is_create_alarm_modal_visible: state.AlarmsReducer.is_create_alarm_modal_visible,
    errors: state.AlarmsReducer.errors,
    assets_infos: state.AlarmsReducer.assets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlarmModal)
