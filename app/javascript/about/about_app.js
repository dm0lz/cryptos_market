import React, { Component } from "react";
import AboutContainer from "./containers/about_container";
import AboutNavBar from "../main/nav_bar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessions_actions from "./../sessions/actions";

class AboutApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <AboutNavBar user={this.props.user} />
        <AboutContainer />
      </nav>
    );
  }
}

// export default AboutApp;

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

export default connect(mapStateToProps, mapDispatchToProps)(AboutApp);
