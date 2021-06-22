import React, { Component } from "react";
import Cable from "actioncable";
import axios from "axios";
import {
  Grid,
  Glyphicon,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessions_actions from "./../actions";
import history from "./../../main/history";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registration: {
        email: "",
        password: "",
        password_confirmation: "",
        is_submited: false,
      },
    };
  }

  componentDidMount() {
    if (localStorage.session === "true") {
      history.push("/");
    }
  }

  email_form_update = (event) => {
    this.setState({ is_submited: false });
    this.setState({
      registration: {
        email: event.target.value,
        password: this.state.registration.password,
        password_confirmation: this.state.registration.password_confirmation,
      },
    });
  };

  password_form_update = (event) => {
    this.setState({ is_submited: false });
    this.setState({
      registration: {
        password: event.target.value,
        email: this.state.registration.email,
        password_confirmation: this.state.registration.password_confirmation,
      },
    });
  };

  password_confirmation_form_update = (event) => {
    this.setState({ is_submited: false });
    this.setState({
      registration: {
        password_confirmation: event.target.value,
        email: this.state.registration.email,
        password: this.state.registration.password,
      },
    });
  };

  registration_form_submit = (event) => {
    event.preventDefault();
    this.setState({ is_submited: true });
    this.props.submit_form_registrations(this.state.registration);
    //console.log(this.state.sessions)
  };

  navigate_to_sign_in = () => {
    history.push("sign_in");
  };

  navigate_to_reset_password = () => {
    window.location.href = "/users/password/new";
  };

  render() {
    return (
      <Grid fluid={true}>
        <br />
        <h2 className="text-center">Register</h2>

        <p className="text-center sessions_error">
          {this.props.errors.code}{" "}
          {this.props.errors.message &&
            this.props.errors.message.length &&
            this.props.errors.message.join(", ")}
        </p>

        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <hr />{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <FormControl
                type="email"
                placeholder="Email"
                value={this.state.registration.email}
                onChange={this.email_form_update}
              />{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.registration.password}
                onChange={this.password_form_update}
              />{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordConfirmation">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <FormControl
                type="password"
                placeholder="Password Confirmation"
                value={this.state.registration.password_confirmation}
                onChange={this.password_confirmation_form_update}
              />{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <Button
                className="btn btn-block btn-success"
                type="submit"
                onClick={this.registration_form_submit}
                disabled={this.state.is_submited}
              >
                Sign Up
              </Button>{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <Button
                className="btn btn-block btn-info"
                type="submit"
                onClick={this.navigate_to_sign_in}
              >
                Sign in
              </Button>{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <Button
                className="btn btn-block btn-warning"
                onClick={this.navigate_to_reset_password}
              >
                Reset Password
              </Button>{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>
        </Form>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    //jwt: state.SessionsReducer.jwt,
    //session: state.SessionsReducer.session,
    //user: state.SessionsReducer.user,
    errors: state.RegistrationsReducer.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(sessions_actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
