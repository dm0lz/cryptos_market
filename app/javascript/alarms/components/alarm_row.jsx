import React, { Component } from 'react'
import { Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as alarms_actions from './../actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'
import history from './../../main/history'
import axios from 'axios'


const styles = {
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  }
}

class AlarmRow extends Component {

  constructor(props){
    super(props)
    this.state = { style: styles }
  }


  navigateToShowAsset = () => {
    //history.push('/' + this.props.alarm.asset_symbol)
  }

  toggle_activation = () => {
    this.props.toggle_alarm_activation(this.props.alarm.asset_symbol)
  }

  destroy_alarm = () => {
    this.props.destroy_alarm(this.props.alarm.asset_symbol)
  }

  edit_alarm = () => {
    this.props.set_selected_alarm(this.props.alarm)
    this.props.set_show_edit_alarm_modal(true)
  }

  render(){
    let asset_infos = {}
    if(this.props.assets_infos.length){
      asset_infos = this.props.assets_infos.find(asset => asset.symbol === this.props.alarm.asset_symbol)
    }
    return(
      <tr className="asset_row" onClick={this.navigateToShowAsset}>
        <td></td>
        <td><img src={asset_infos && asset_infos.logo_path_thumb} /></td>
        <td><span>{this.props.alarm.asset_symbol}</span></td>
        <td><NumberFormat value={this.props.alarm.min_limit || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={9} /></td>
        <td><NumberFormat value={asset_infos.price_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={9} /></td>
        <td><NumberFormat value={this.props.alarm.max_limit || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={9} /></td>
        <td>
          {
            this.props.alarm.is_active ?
              <span style={this.state.style.green}><Glyphicon glyph="ok-circle" /></span>
              :
              <span style={this.state.style.red}><Glyphicon glyph="remove-circle" /></span>
          }
        </td>
        <td><span>{this.props.alarm.created_at} UTC</span></td>
        <td>
          {
            this.props.alarm.is_active ?
              <span onClick={this.toggle_activation} style={this.state.style.red}><Glyphicon glyph="sort" /> Desactivate</span>
              :
              <span onClick={this.toggle_activation} style={this.state.style.green}><Glyphicon glyph="sort" /> Activate</span>
          }
        </td>
        <td><Glyphicon glyph="cog" onClick={this.edit_alarm} /></td>
        <td><Glyphicon glyph="trash" onClick={this.destroy_alarm} /></td>
			</tr>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    //is_create_alarm_modal_visible: state.AlarmsReducer.is_create_alarm_modal_visible,
    //alarms: state.AlarmsReducer.alarms
    assets_infos: state.AlarmsReducer.assets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmRow)
