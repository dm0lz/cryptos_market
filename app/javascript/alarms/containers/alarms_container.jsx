import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateAlarmModal from './../components/create_alarm_modal'
import * as alarms_actions from './../actions'
import AlarmsList from './../components/alarms_list'
import EditAlarmModal from './../components/edit_alarm_modal'
import history from './../../main/history'

class AlarmsContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(localStorage.jwt && localStorage.jwt.length){
      this.props.fetch_user_alarms(localStorage.jwt)
      if(!this.props.assets_infos.length){
        this.props.fetch_assets_infos()
      }
    }else{
      history.push('sign_in')
    }
  }

  open_create_alarm_modal = () => {
    this.props.set_show_create_alarm_modal(true)
  }


  render() {

    if(this.props.alarms_loading){
      return(
        <article>
          <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
        </article>
      )
    }

    return(
      <Grid fluid={true}>
        <br/>
        { this.props.is_create_alarm_modal_visible && <CreateAlarmModal assets_infos={this.props.assets_infos} /> }
        { this.props.is_edit_alarm_modal_visible && <EditAlarmModal /> }
        { this.props.alarms.length ?
            <AlarmsList alarms={this.props.alarms} />
            :
            <article>
              <br/><br/><br/><br/><br/><br/><br/>
              <p className='text-center'>You don't have any Alarm yet.</p>
            </article>
        }
        <Button className='btn btn-block' type="submit"  onClick={this.open_create_alarm_modal}>Create a New Alarm</Button>
      </Grid>
    )
  }

}



const mapStateToProps = (state) => {
  return {
    jwt: state.SessionsReducer.jwt,
    is_create_alarm_modal_visible: state.AlarmsReducer.is_create_alarm_modal_visible,
    is_edit_alarm_modal_visible: state.AlarmsReducer.is_edit_alarm_modal_visible,
    alarms: state.AlarmsReducer.alarms,
    assets_infos: state.AlarmsReducer.assets_infos,
    alarms_loading: state.AlarmsReducer.alarms_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsContainer)
