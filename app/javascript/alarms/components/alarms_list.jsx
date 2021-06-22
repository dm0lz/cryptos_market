import React, { Component } from 'react'
import AlarmRow from './alarm_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as alarms_actions from './../actions'
import uuid from 'uuid/v1'

const styles = {

}


class AlarmsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles
    }
  }


  render(){

    return(
      <section>
      <p className='text-center toggle_alarm_error'>{this.props.toggle_alarm_error.code} {this.props.toggle_alarm_error.message}</p>
      <Table responsive condensed hover>
    		<thead>
    			<tr>
            <th></th>
            <th></th>
            <th>Asset </th>
    				<th>Min Limit</th>
    				<th>Current Price</th>
            <th>Max Limit</th>
            <th>Is Active</th>
            <th>Created At</th>
            <th>Toggle Activation</th>
            <th>Edit</th>
            <th>Remove</th>
    			</tr>
    		</thead>
    		<tbody>
        {
          this.props.alarms.map((alarm) =>
            <AlarmRow alarm={alarm} key={uuid()} />
          )
        }
        </tbody>
      </Table>
      </section>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    jwt: state.SessionsReducer.jwt,
    is_create_alarm_modal_visible: state.AlarmsReducer.is_create_alarm_modal_visible,
    is_edit_alarm_modal_visible: state.AlarmsReducer.is_edit_alarm_modal_visible,
    alarms: state.AlarmsReducer.alarms,
    toggle_alarm_error: state.AlarmsReducer.toggle_alarm_error
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsList)
