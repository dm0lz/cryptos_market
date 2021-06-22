"use strict";
//normal location : react-stockcharts/lib/tooltip
import React, { Component } from "react";
//import React, { PropTypes, Component } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import PropTypes from 'prop-types';
import GenericChartComponent from "react-stockcharts/lib/GenericChartComponent";

import { isDefined, functor } from "react-stockcharts/lib/utils";
import ToolTipText from "react-stockcharts/lib/tooltip/ToolTipText";
import ToolTipTSpanLabel from "react-stockcharts/lib/tooltip/ToolTipTSpanLabel";

class CustomTooltip extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
	}
	renderSVG(moreProps) {
		var { className } = this.props;
		var { chartConfig: { width, height } } = moreProps;
		var { currentItem } = moreProps;

		var { onClick, xDisplayFormat, fontFamily, fontSize, accessor, volumeFormat, ohlcFormat } = this.props;

		var displayDate, open, high, low, close, volume;

		displayDate = open = high = low = close = volume = "n/a";

		if (isDefined(currentItem)
				&& isDefined(accessor(currentItem))
				&& isDefined(accessor(currentItem).close)) {
			var item = accessor(currentItem);
			volume = isDefined(item.volume)
				? volumeFormat(item.volume)
				: "n/a";

			displayDate = xDisplayFormat(item.date);
			open = ohlcFormat(item.open);
			high = ohlcFormat(item.high);
			low = ohlcFormat(item.low);
			close = ohlcFormat(item.close);
		}

		var { origin: originProp } = this.props;
		var origin = functor(originProp);
		var [x, y] = origin(width, height);

		return (
			<g className={`react-stockcharts-toottip-hover ${className}`}
				transform={`translate(${ x }, ${ y })`} onClick={onClick}>
				<ToolTipText x={0} y={0}
					fontFamily={fontFamily} fontSize={fontSize}>
					<ToolTipTSpanLabel className='tooltip-span-label-line-chart' key="label" x={0} dy="5">Date: </ToolTipTSpanLabel>
					<tspan className='tooltip-span-label-line-chart' key="value">{displayDate}</tspan>
					{/*<ToolTipTSpanLabel key="label_O"> O: </ToolTipTSpanLabel><tspan key="value_O">{open}</tspan>
					<ToolTipTSpanLabel key="label_H"> H: </ToolTipTSpanLabel><tspan key="value_H">{high}</tspan>
					<ToolTipTSpanLabel key="label_L"> L: </ToolTipTSpanLabel><tspan key="value_L">{low}</tspan>*/}
					<ToolTipTSpanLabel className='tooltip-span-label-line-chart' key="label_C"> Quote: </ToolTipTSpanLabel><tspan className='tooltip-span-label-line-chart' key="value_C">{close}</tspan>
					<ToolTipTSpanLabel className='tooltip-span-label-line-chart' key="label_Vol"> Vol: </ToolTipTSpanLabel><tspan className='tooltip-span-label-line-chart' key="value_Vol">{volume}</tspan>
				</ToolTipText>
			</g>
		);
	}
	render() {
		return (
      <GenericChartComponent clip={false} svgDraw={this.renderSVG} drawOn={["mousemove"]} drawOnMouseMove />
    )
	}
}

CustomTooltip.propTypes = {
	className: PropTypes.string,
	accessor: PropTypes.func.isRequired,
	xDisplayFormat: PropTypes.func.isRequired,
	ohlcFormat: PropTypes.func.isRequired,
	origin: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.func
	]).isRequired,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	onClick: PropTypes.func,
	volumeFormat: PropTypes.func,
};

CustomTooltip.defaultProps = {
	accessor: (d) => { return { date: d.date, open: d.open, high: d.high, low: d.low, close: d.close, volume: d.volume }; },
	xDisplayFormat: timeFormat("%b-%d-%H:%M"),
	volumeFormat: format(".4s"),
	ohlcFormat: format(".2f"),
	origin: [0, 0]
};

export default CustomTooltip;
