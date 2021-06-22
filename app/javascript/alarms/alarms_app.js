import React, { Component } from "react";
import AlarmsContainer from "./containers/alarms_container";
import AlarmsNavBar from "../main/nav_bar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessions_actions from "./../sessions/actions";

class AlarmsApp extends Component {
  componentDidMount() {
    if (localStorage.session === "true") {
      this.props.set_sessions_from_local_storage();
    }
  }
  render() {
    return (
      <nav>
        <AlarmsNavBar user={this.props.user} />
        <AlarmsContainer />
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.SessionsReducer.session,
    jwt: state.SessionsReducer.jwt,
    user: state.SessionsReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(sessions_actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsApp);
