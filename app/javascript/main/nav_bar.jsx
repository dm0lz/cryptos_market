import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from '../assets/actions'
import * as sessions_actions from '../sessions/actions'
import * as markets_actions from '../markets/actions'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import history from './history'

class NavBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      pathName: window.location.pathname.replace('/', '')
    }
  }

  componentDidMount(){
    if(this.props.markets_infos['total_24h_volume_usd'] === undefined){
      this.props.fetch_markets_infos()
    }
  }

  search_asset = (event) => {
    let value = ''
    if(event.target.value === 'none'){
      value = event.target.parentElement.getElementsByClassName('form-control')[0].value
    }else {
      value = event.target.value
    }
    this.props.set_assets_loading(true)
    this.props.asset_search(value)
  }

  key_press_search_asset = (event) => {
    if(event.charCode === 13){
      this.search_asset(event)
    }
  }

  reset_search_asset = (event) => {
    let value = ''
    this.props.set_assets_loading(true)
    this.props.asset_search(value)
    event.target.parentElement.getElementsByClassName('form-control')[0].value = ''
  }

  logout = () => {
    this.props.do_reset_local_storage_session()
  }

  navigate_to = (path) => {
    history.push(path)
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
            <NavItem active={this.state.pathName === ''} eventKey={0} onClick={() => this.navigate_to('')}>
              All Coins
            </NavItem>
            <NavItem active={this.state.pathName === 'slp-tokens'} eventKey={1} onClick={() => this.navigate_to('slp-tokens')}>
              SLP Tokens
            </NavItem>
            {/*<NavItem eventKey={2} onClick={() => this.navigate_to('asset-pairs')}>
              Markets
            </NavItem>*/}
            {/*<NavItem eventKey={3} onClick={() => this.navigate_to('exchanges')}>
              Exchanges
            </NavItem>*/}
            <NavItem active={this.state.pathName === 'portfolio'} eventKey={4} onClick={() => this.navigate_to('portfolio')}>
            Portfolio
            </NavItem>
            <NavItem active={this.state.pathName === 'alarms'} eventKey={5} onClick={() => this.navigate_to('alarms')}>
              Alarms
            </NavItem>
            <NavItem active={this.state.pathName === 'about'} eventKey={5} onClick={() => this.navigate_to('about')}>
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

          { this.state.pathName === "" && (

            <Navbar.Form pullRight className='search-area'>
              <FormGroup>
                <FormControl type="text" placeholder="Search Asset" onKeyPress={this.key_press_search_asset} />
              </FormGroup>{' '}
              <Button type="submit" value="none" className='btn btn-info' onClick={this.search_asset}>Search</Button>&nbsp;
              <Button type="submit" value="none" className='btn btn-danger' onClick={this.reset_search_asset}>Reset</Button>
            </Navbar.Form>
          )}


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
    assets: state.AssetsReducer.assets,
    current_page: state.AssetsReducer.current_page,
    is_assets_loading: state.AssetsReducer.is_assets_loading,
    markets_infos: state.MarketsReducer.markets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, assets_actions, sessions_actions, markets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
