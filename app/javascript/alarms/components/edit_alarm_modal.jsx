import React, { Component } from 'react'
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

class EditAlarmModal extends Component {

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
      selected_alarm: undefined,
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
    //         label: asset.name + ' (' + asset.symbol + ')' + ' - ' + asset.price_usd + ' USD',
    //         usd_price: asset.price_usd
    //       }
    //     })
    //     this.setState({assets_infos: payload})
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    if(this.props.selected_alarm){
      //let asset = this.state.assets_infos.find((asset) => asset.symbol === selected_asset_value.symbol)
      this.setState({
        selected_alarm: this.props.selected_alarm,
        is_max_limit_active: this.props.selected_alarm.has_max_limit,
        is_min_limit_active: this.props.selected_alarm.has_min_limit,
        min_limit: this.props.selected_alarm.has_min_limit ? this.props.selected_alarm.min_limit : '' ,
        max_limit: this.props.selected_alarm.has_max_limit ? this.props.selected_alarm.max_limit : ''
      })
      //this.setState({max_limit: asset.usd_price, min_limit: asset.usd_price})
    }
  }

  componentWillReceiveProps(){
  }

  close_asset_modal = () => {
    this.props.set_show_edit_alarm_modal(false)
  }

  max_limit_form_update = (event) => {
    this.setState({is_submited: false})
    this.setState({max_limit: event.target.value})
  }

  min_limit_form_update = (event) => {
    this.setState({is_submited: false})
    this.setState({min_limit: event.target.value})
  }

  edit_alarm_form_submit = (event) => {
    event.preventDefault()
    this.setState({is_submited: true})
    if(this.state.selected_asset_value === undefined){
      let alarm_asset_value = this.state.assets_infos.find(asset => asset.symbol === this.state.selected_alarm.asset_symbol)
      this.setState({selected_asset_value: alarm_asset_value})
    }
    if(!this.state.is_min_limit_active && !this.state.is_max_limit_active){
      this.props.set_create_alarm_error({message: "Please select a max limit or a min limit"})
      return
    }
    let max_limit = this.state.max_limit
    let min_limit = this.state.min_limit
    let payload = {
      asset_symbol: this.state.selected_alarm.asset_symbol,
      has_min_limit: this.state.is_min_limit_active,
      has_max_limit: this.state.is_max_limit_active,
      max_limit: this.state.is_max_limit_active ? max_limit : null,
      min_limit: this.state.is_min_limit_active ? min_limit : null
    }
    this.props.patch_edit_alarm(payload)
  }

  asset_select_update = (selected_asset_value) => {
    this.setState({is_submited: false})
    this.setState({selected_asset_value: selected_asset_value})
  }

  toggle_max_limit = () => {
    this.setState({is_submited: false})
    this.setState({is_max_limit_active: !this.state.is_max_limit_active})
  }

  toggle_min_limit = () => {
    this.setState({is_submited: false})
    this.setState({is_min_limit_active: !this.state.is_min_limit_active})
  }

  set_min_limit_state = (min_limit) => {
    this.setState({is_submited: false})
    this.setState({min_limit: min_limit})
  }

  set_max_limit_state = (max_limit) => {
    this.setState({is_submited: false})
    this.setState({max_limit: max_limit})
  }

  render(){
    let alarm_asset_value = undefined
    if(this.state.assets_infos){
      if(this.state.selected_asset_value){
        alarm_asset_value = this.state.selected_asset_value
      }else{
        alarm_asset_value = this.state.assets_infos.find(asset => asset.symbol === this.state.selected_alarm.asset_symbol)
      }
    }
    let min_limit = 0
    let max_limit = 0
    if(this.state.assets_infos.length){
      let asset = this.state.assets_infos.find((asset) => asset.symbol === this.state.selected_alarm.asset_symbol)
      if(!this.state.min_limit){
        min_limit = this.state.min_limit ? this.state.min_limit : asset.usd_price
        this.set_min_limit_state(min_limit)
      }
      if(!this.state.max_limit){
        max_limit = this.state.max_limit ? this.state.max_limit : asset.usd_price
        this.set_max_limit_state(max_limit)
      }
    }
    return(
      <Modal show={this.props.is_edit_alarm_modal_visible} onHide={this.close_asset_modal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className='text-center sessions_error'>{this.props.errors.code} {this.props.errors.message}</p>
          <h4>Selected Asset</h4>
          <Form horizontal>
            <VirtualizedSelect
              options={this.state.assets_infos}
              onChange={(val) => this.asset_select_update(val)}
              value={alarm_asset_value}
              disabled={true}
            />
            <br/>
            <Row>
              <Col md={6}>
                <span>
                  <Checkbox onClick={() => this.toggle_max_limit()} defaultChecked={this.state.is_max_limit_active}>
                    Send an email when price is Above
                  </Checkbox>
                </span>
                <FormControl type="number" placeholder="Amount" value={this.state.max_limit} onChange={this.max_limit_form_update} disabled={!this.state.is_max_limit_active} />
              </Col>
              <Col md={6}>
                <Checkbox onClick={this.toggle_min_limit} defaultChecked={this.state.is_min_limit_active}>
                  Send an email when price is Below
                </Checkbox>
                <FormControl type="number" placeholder="Amount" value={this.state.min_limit} onChange={this.min_limit_form_update} disabled={!this.state.is_min_limit_active} />
              </Col>
            </Row>
            <br/>
             <Button className='btn btn-block btn-success' disabled={this.state.is_submited} type="submit" onClick={(event) => this.edit_alarm_form_submit(event)}>Update</Button>
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
    is_edit_alarm_modal_visible: state.AlarmsReducer.is_edit_alarm_modal_visible,
    selected_alarm: state.AlarmsReducer.selected_alarm,
    errors: state.AlarmsReducer.errors,
    assets_infos: state.AlarmsReducer.assets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAlarmModal)
