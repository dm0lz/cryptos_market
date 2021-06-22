import React, { Component } from 'react'
import PortfolioRow from './portfolio_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../../assets/actions'
import * as portfolio_actions from './../actions'

import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'

const styles = {}

import {PieChart, Pie, Sector, Cell, Legend} from 'recharts'
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const COLORS = ['#dc6f13', '#3ab73a', '#a75b76', '#5a96ca', '#FFBB28', '#FF8042', '#0088FE', 'blue'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white">{`$ ${value.toFixed(2)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

class TwoLevelPieChart extends Component {
	constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }

  onPieEnter = (data, index) => {
    this.props.update_selected_portfolio_asset(data.name)
    this.props.retrieve_assets_ohcl_candle(data.name, '7D')
    // this.setState({
    //   activeIndex: index
    // })
  }

	render () {
    const renderLegend = (props) => {
      const { payload } = props;
      return (
        <ul>
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{color: entry.payload.fill}}>{entry.value} : {(entry.payload.percent * 100).toFixed(1)}%</li>
          ))
        }
        </ul>
      );
    }
    let index = this.props.pie_chart_data.findIndex(data => data.name === this.props.activeIndex)
  	return (
    	<PieChart width={400} height={380}>
        <Pie
        	activeIndex={index}
          activeShape={renderActiveShape}
          data={this.props.pie_chart_data}
          cx={300}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#72aadc"
          onMouseEnter={this.onPieEnter}
          dataKey="value"
        >
          {
          	this.props.pie_chart_data.map((entry, index) => <Cell key={uuid()} fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
          {/*<Legend layout="vertical" align='right' verticalAlign='bottom' content={renderLegend} iconType='square'/>*/}
       </PieChart>
    );
  }
}







class PortfolioPieChart extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles
    }
  }

  componentDidMount(){

  }

  render(){

    let pie_chart_data = this.props.portfolio_assets.map((asset) => {
      return {
        name: asset.symbol,
        value: parseFloat(asset.amount) * parseFloat(asset.asset_info.price_usd)
      }
    })

    let total = this.props.portfolio_assets.map((asset) => {
        return parseFloat(asset.amount) * parseFloat(asset.asset_info.price_usd)
    }).reduce((pv,cv)=>{
       return pv + (parseFloat(cv)||0);
    },0)

    return(
      <section>
        <h5 className='text-center'>{this.props.portfolio_assets.length} Assets - <NumberFormat value={total || 0} displayType={'text'} thousandSeparator={" "} suffix={' USD'} decimalScale={2} /></h5>
        <hr/>
        <TwoLevelPieChart pie_chart_data={pie_chart_data}
          activeIndex={this.props.selected_portfolio_asset}
          update_selected_portfolio_asset={this.props.update_selected_portfolio_asset}
          retrieve_assets_ohcl_candle={this.props.retrieve_assets_ohcl_candle} />
      </section>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    portfolio_assets: state.PortfolioReducer.portfolio_assets,
    selected_portfolio_asset: state.PortfolioReducer.selected_portfolio_asset
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPieChart)
