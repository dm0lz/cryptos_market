import React, { Component } from 'react'
import MarketContainer from './containers/market_container'
import MarketsNavBar from './markets_nav_bar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessions_actions from './../sessions/actions'
import store from './../main/store'


class MarketsApp extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(localStorage.session === "true"){
      this.props.set_sessions_from_local_storage()
    }
  }

  render() {
    return(
      <nav>
        <MarketsNavBar user={this.props.user} />
        <MarketContainer />
      </nav>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    session: state.SessionsReducer.session,
    jwt: state.SessionsReducer.jwt,
    user: state.SessionsReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(sessions_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsApp)
