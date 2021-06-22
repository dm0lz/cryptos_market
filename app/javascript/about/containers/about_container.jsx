import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon, Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap'


export default class AboutContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      message: '',
      errors: [],
      loading: false
    };
  }

  componentDidMount(){

  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  submitForm = (event) => {
    event.preventDefault();
    const validEmail = this.validateEmail(this.state.email);
    const emptyMessage = this.state.message.length === 0;
    if (emptyMessage || !validEmail) {
      this.setErrorMessages(emptyMessage, validEmail);
      return false
    } else {
      this.setState({errors: [], loading: true});
      axios
        .post("/api/v1/public/contact_us", {
          email: this.state.email,
          message: this.state.message,
        })
        .then((response) => {
          window.location.href = '/';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  setErrorMessages = (emptyMessage, validEmail) => {
    const errMsg = 'Message content cannot be empty';
    const errEmail = 'Email is invalid';
    if (emptyMessage && !validEmail) {
      this.setState({errors: [errMsg, errEmail]})
    } else if (!validEmail) {
      this.setState({errors: [errEmail]})
    } else {
      this.setState({errors: [errMsg]})
    }
  }

  validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }


  render() {
    return(
      <Grid fluid={true}>
        <br/>
        <h2 className="text-center">Contact US</h2>

        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <hr />{" "}

          <ul>
            {this.state.errors && this.state.errors.map((e, i) => {
              return <li key={i}>{e}</li>
            })}
          </ul>
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <FormControl
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.inputChange}
              />{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup controlId="zz">
            <Col sm={3}> </Col>
            <Col sm={6}>
              {" "}
              <textarea rows={3}
                className='form-control'
                placeholder="Message"
                name="message"
                value={this.state.message}
                onChange={this.inputChange} />
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
                onClick={this.submitForm}
                disabled={this.state.loading}
              >
                Submit
              </Button>{" "}
            </Col>
            <Col sm={3}> </Col>
          </FormGroup>

        </Form>
        <br/>
      </Grid>
    )
  }

}
