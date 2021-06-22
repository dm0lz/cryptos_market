import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Glyphicon } from "react-bootstrap";
import NavBar from "../main/nav_bar";
import * as sessions_actions from "./../sessions/actions";
import * as slp_tokens_actions from "./actions";
import SlpTokenList from "./slp_tokens_list";

class SlpTokensApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.session === "true") {
      this.props.set_sessions_from_local_storage();
    }
    if (this.props.slpTokens.length === 0) {
      this.props.fetch_tokens();
    }
  }

  render() {
    return (
      <div>
        <NavBar user={this.props.user} />
        <Grid fluid={true}>
          {this.props.slpTokens.length ? (
            <SlpTokenList slpTokens={this.props.slpTokens}></SlpTokenList>
          ) : (
            <div className="loader">
              <Glyphicon glyph="btc" />
              <Glyphicon glyph="eur" />
              <Glyphicon glyph="usd" />
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.SessionsReducer.user,
    slpTokens: state.SlpTokensReducer.slpTokens,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, sessions_actions, slp_tokens_actions),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SlpTokensApp);
