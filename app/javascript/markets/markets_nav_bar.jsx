
import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './actions'
import * as sessions_actions from './../sessions/actions'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import history from './../main/history'

class MarketsNavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      market_search_input: ''
    }
  }

  componentDidMount(){
    if(this.props.markets_infos['total_24h_volume_usd'] === undefined){
      this.props.fetch_markets_infos()
    }
    window.addEventListener('scroll', this.onScroll, false)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll)
  }

  search_market = (event) => {
    //let value = ''
    //if(event.target.value === 'none'){
    //  value = event.target.parentElement.getElementsByClassName('form-control')[0].value
    //}else {
    //  value = event.target.value
    //}
    this.props.set_markets_loading(true)
    this.props.click_market_search(this.state.market_search_input, this.props.current_page)
    //this.props.click_market_search(value, this.props.current_page)
  }

  key_press_search_market = (event) => {
    if(event.charCode === 13){
      this.search_market(event)
    }
  }

  reset_search_market = (event) => {
    let value = ''
    this.props.set_markets_loading(true)
    this.props.click_market_search(value, 0)
    this.setState({market_search_input: ''})
    //event.target.parentElement.getElementsByClassName('form-control')[0].value = ''
  }

  logout = () => {
    this.props.do_reset_local_storage_session()
  }

  navigate_to = (path) => {
    history.push(path)
  }

  onScroll = () => {
    if(window.location.pathname === '/asset-pairs'){
      if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
              && this.props.markets.length && !this.props.is_markets_loading ) {
        this.props.set_markets_loading(true)
        this.props.scroll_market_search(this.state.market_search_input, this.props.current_page + 1)
      }
    }
  }

  market_search_input_changed = (event) => {
    this.props.select_current_page(0)
    this.setState({market_search_input: event.target.value})
  }

  render(){
    return (
      <Navbar inverse fluid>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">SimpleMarketCap</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>

          <Nav>
            <NavItem eventKey={1} onClick={() => this.navigate_to('')}>
              Assets
            </NavItem>
            <NavItem active={true} eventKey={2} onClick={() => this.navigate_to('asset-pairs')}>
              Markets
            </NavItem>
            <NavItem eventKey={3} onClick={() => this.navigate_to('exchanges')}>
              Exchanges
            </NavItem>
            <NavItem eventKey={4} onClick={() => this.navigate_to('portfolio')}>
            Portfolio
            </NavItem>
            <NavItem eventKey={5} onClick={() => this.navigate_to('alarms')}>
              Alarms
            </NavItem>
            <NavItem eventKey={5} onClick={() => this.navigate_to('about')}>
              About
            </NavItem>
          </Nav>

          <Nav pullRight>

            { this.props.user.email === undefined ?

              <NavItem eventKey={6} onClick={() => this.navigate_to('sign_in')}>
                Login
              </NavItem>

              :

              <NavDropdown className='navbar-right' eventKey={6} title={'Logout'} id="basic-nav-dropdown">
                <MenuItem eventKey={6.1}>Edit Account</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={6.2} onClick={this.logout}>Logout {this.props.user.email}</MenuItem>
              </NavDropdown>

            }

          </Nav>

          <Navbar.Form pullRight className='search-area'>
            <FormGroup>
              <FormControl type="text" placeholder="Search Market" value={this.state.market_search_input} onChange={this.market_search_input_changed}  onKeyPress={this.key_press_search_market} />
            </FormGroup>{' '}
            <Button type="submit" value="none" className='btn btn-info' onClick={this.search_market}>Search</Button>&nbsp;
            <Button type="submit" value="none" className='btn btn-danger' onClick={this.reset_search_market}>Reset</Button>
          </Navbar.Form>


          <Navbar.Text pullRight className='global-market-infos'>
              <span className='global-market-info-line-1'>
                Market Cap : {' '}
                <NumberFormat value={this.props.markets_infos['total_market_cap_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
              </span>
              <span className='global-market-info-line-1'>
                24h Volume : {' '}
                <NumberFormat value={this.props.markets_infos['total_24h_volume_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
              </span>
          </Navbar.Text>

    		</Navbar.Collapse>
  	  </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    markets: state.MarketsReducer.markets,
    current_page: state.MarketsReducer.current_page,
    is_markets_loading: state.MarketsReducer.is_markets_loading,
    current_page: state.MarketsReducer.current_page,
    markets_infos: state.MarketsReducer.markets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, markets_actions, sessions_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsNavBar)
