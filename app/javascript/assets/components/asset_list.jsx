import React, { Component } from 'react'
import AssetRow from './asset_row'
import { Row, Table, FormControl, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import uuid from 'uuid/v1'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class AssetList extends Component {

  constructor(props){
    super(props)
    this.state = {
      percent_change_24h_sort_order: 'ASC',
      percent_change_7d_sort_order: 'ASC',
      volume_usd_24h_sort_order: 'ASC',
      rank_sort_order: 'ASC',
      order_attribute: 'rank'
      //time_scale: '7d'
    }
  }

  componentDidMount(){
    //this.createSocket()
    // window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount(){
    // window.removeEventListener('scroll', this.onScroll)
    //this.tickers_subscription && this.tickers_consumer.subscriptions.remove(this.tickers_subscription)
  }

  // onScroll = () => {
  //   if(window.location.pathname === '/'){
  //     if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
  //             && this.props.assets.length && !this.props.is_assets_loading ) {
  //               if(this.state.order_attribute === 'rank'){
  //                 this.props.set_assets_loading(true)
  //                 this.props.order_assets('rank', this.state.rank_sort_order, this.props.current_page + 1)
  //               }else if (this.state.order_attribute === 'percent_change_24h') {
  //                 this.props.set_assets_loading(true)
  //                 this.props.order_assets('percent_change_24h', this.state.percent_change_24h_sort_order, this.props.current_page + 1)
  //               }
  //               else if (this.state.order_attribute === 'volume_usd_24h') {
  //                 this.props.set_assets_loading(true)
  //                 this.props.order_assets('volume_usd_24h', this.state.volume_usd_24h_sort_order, this.props.current_page + 1)
  //               }else if (this.state.order_attribute === 'percent_change_7d') {
  //                 this.props.set_assets_loading(true)
  //                 this.props.order_assets('percent_change_7d', this.state.percent_change_7d_sort_order, this.props.current_page + 1)
  //               }
  //     }
  //   }
  // }

  //filterList = (event) => {
  //  let updatedList = this.props.markets
  //  updatedList = updatedList.filter((item) => {
  //    return item.name.toLowerCase().search(
  //      event.target.value.toLowerCase()) !== -1
  //  })
  //  return updatedList
  //}

  one_month_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '1m')
    })
    //this.setState({time_scale: '1m'})
    this.props.set_selected_time_range('1m')
  }

  three_month_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '3m')
    })
    //this.setState({time_scale: '1m'})
    this.props.set_selected_time_range('3m')
  }

  six_month_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '6m')
    })
    //this.setState({time_scale: '1m'})
    this.props.set_selected_time_range('6m')
  }

  one_year_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '1y')
    })
    //this.setState({time_scale: '1m'})
    this.props.set_selected_time_range('1y')
  }

  seven_days_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '7d')
    })
    this.props.set_selected_time_range('7d')
    //this.setState({time_scale: '7d'})
  }

  one_day_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '1d')
    })
    this.props.set_selected_time_range('1d')
    //this.setState({time_scale: '1d'})
  }

  six_hour_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '6h')
    })
    this.props.set_selected_time_range('6h')
    //this.setState({time_scale: '6h'})
  }

  order_by_last_day_change = () => {
    this.toggle_percent_change_24h_sort_order()
    //this.props.order_assets('percent_change_24h', this.state.percent_change_24h_sort_order, 0)
    this.setState({order_attribute: 'percent_change_24h'})
  }

  order_by_rank = () => {
    this.toggle_rank_sort_order()
    //this.props.order_assets('percent_change_24h', this.state.percent_change_24h_sort_order, 0)
    this.setState({order_attribute: 'rank'})
  }

  order_by_last_day_volume = () => {
    this.toggle_volume_usd_24h_sort_order()
    this.setState({order_attribute: 'volume_usd_24h'})
  }

  order_by_last_week_change = () => {
    this.toggle_percent_change_7d_sort_order()
    this.setState({order_attribute: 'percent_change_7d'})
  }

  toggle_percent_change_7d_sort_order = () => {
    let sorting = ''
    if(this.state.percent_change_7d_sort_order === 'DESC'){
      this.setState({percent_change_7d_sort_order: 'ASC'})
      sorting = 'ASC'
    }else if (this.state.percent_change_7d_sort_order === 'ASC') {
      this.setState({percent_change_7d_sort_order: 'DESC'})
      sorting = 'DESC'
    }
    this.props.order_assets('percent_change_7d', sorting, 1)
  }

  toggle_percent_change_24h_sort_order = () => {
    let sorting = ''
    if(this.state.percent_change_24h_sort_order === 'DESC'){
      this.setState({percent_change_24h_sort_order: 'ASC'})
      sorting = 'ASC'
    }else if (this.state.percent_change_24h_sort_order === 'ASC') {
      this.setState({percent_change_24h_sort_order: 'DESC'})
      sorting = 'DESC'
    }
    this.props.order_assets('percent_change_24h', sorting, 1)
  }

  toggle_volume_usd_24h_sort_order = () => {
    let sorting = ''
    if(this.state.volume_usd_24h_sort_order === 'DESC'){
      this.setState({volume_usd_24h_sort_order: 'ASC'})
      sorting = 'ASC'
    }else if (this.state.volume_usd_24h_sort_order === 'ASC') {
      this.setState({volume_usd_24h_sort_order: 'DESC'})
      sorting = 'DESC'
    }
    this.props.order_assets('volume_usd_24h', sorting, 1)
  }

  toggle_rank_sort_order = () => {
    let sorting = ''
    if(this.state.rank_sort_order === 'DESC'){
      this.setState({rank_sort_order: 'ASC'})
      sorting = 'ASC'
    }else if (this.state.rank_sort_order === 'ASC') {
      this.setState({rank_sort_order: 'DESC'})
      sorting = 'DESC'
    }
    this.props.order_assets('rank', sorting, 1)
  }

  handlePagination = (data) => {
    const selected = data.selected;
    if(this.state.order_attribute === 'rank'){
      this.props.set_assets_loading(true)
      this.props.order_assets('rank', this.state.rank_sort_order, selected + 1)
    } else if (this.state.order_attribute === 'percent_change_24h') {
      this.props.set_assets_loading(true)
      this.props.order_assets('percent_change_24h', this.state.percent_change_24h_sort_order, selected + 1)
    } else if (this.state.order_attribute === 'volume_usd_24h') {
      this.props.set_assets_loading(true)
      this.props.order_assets('volume_usd_24h', this.state.volume_usd_24h_sort_order, selected + 1)
    } else if (this.state.order_attribute === 'percent_change_7d') {
      this.props.set_assets_loading(true)
      this.props.order_assets('percent_change_7d', this.state.percent_change_7d_sort_order, selected + 1)
    }
  }

  render(){
    return(
      <section>
        <p className='text-right assets-under-header'>{this.props.assets_stats.watched_assets_count} assets</p>
        <Table responsive condensed hover>
      		<thead>
      			<tr>
      				<th className={this.state.order_attribute === 'rank' ? 'active-sorting' : ''} onClick={this.order_by_rank}><Glyphicon glyph="sort" />&nbsp;Rank</th>
              <th>Name</th>
              <th>Price </th>
      				<th className={this.state.order_attribute === 'volume_usd_24h' ? 'active-sorting' : ''} onClick={this.order_by_last_day_volume}><Glyphicon glyph="sort" />&nbsp;24h Volume</th>
              <th className={this.state.order_attribute === 'rank' ? 'active-sorting' : ''} onClick={this.order_by_rank}><Glyphicon glyph="sort" />&nbsp;Market Cap</th>
              <th className={this.state.order_attribute === 'percent_change_7d' ? 'active-sorting' : ''} onClick={this.order_by_last_week_change}><Glyphicon glyph="sort" />&nbsp;7d Change</th>
              <th className={this.state.order_attribute === 'percent_change_24h' ? 'active-sorting' : ''} onClick={this.order_by_last_day_change}><Glyphicon glyph="sort" />&nbsp;24h Change</th>
              <th>
                <span className={this.props.selected_time_range === '1y' ? 'scale_link active_scale' : 'scale_link'} onClick={this.one_year_scale}>1y</span>&nbsp;&nbsp;&nbsp;
                <span className={this.props.selected_time_range === '6m' ? 'scale_link active_scale' : 'scale_link'} onClick={this.six_month_scale}>6m</span>&nbsp;&nbsp;&nbsp;
                <span className={this.props.selected_time_range === '3m' ? 'scale_link active_scale' : 'scale_link'} onClick={this.three_month_scale}>3m</span>&nbsp;&nbsp;&nbsp;
                <span className={this.props.selected_time_range === '1m' ? 'scale_link active_scale' : 'scale_link'} onClick={this.one_month_scale}>1m</span>&nbsp;&nbsp;&nbsp;
                <span className={this.props.selected_time_range === '7d' ? 'scale_link active_scale' : 'scale_link'} onClick={this.seven_days_scale}>7d</span>&nbsp;&nbsp;&nbsp;
                <span className={this.props.selected_time_range === '1d' ? 'scale_link active_scale' : 'scale_link'} onClick={this.one_day_scale}>1d</span>&nbsp;&nbsp;&nbsp;
                <span className={this.props.selected_time_range === '6h' ? 'scale_link active_scale' : 'scale_link'} onClick={this.six_hour_scale}>6h</span>
              </th>
      			</tr>
      		</thead>
      		<tbody>
          {
            this.props.is_assets_loading
        			? (
                <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
              ) :
            ( this.props.assets.map((asset) =>
              <AssetRow time_scale={this.props.selected_time_range} key={uuid()} asset={asset}></AssetRow>
            ) )
          }
          </tbody>
        </Table>
        <PaginationWrapper style={{ visibility: this.props.is_assets_loading ? 'hidden' : 'visible' }}>
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={"..."}
                         breakClassName={"break-me"}
                         pageCount={this.props.assets_stats.watched_assets_count / 15}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePagination}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
        </PaginationWrapper>
      </section>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    assets: state.AssetsReducer.assets,
    assets_stats: state.AssetsReducer.assets_stats,
    current_page: state.AssetsReducer.current_page,
    is_assets_loading: state.AssetsReducer.is_assets_loading,
    selected_time_range: state.AssetsReducer.selected_time_range
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetList)
