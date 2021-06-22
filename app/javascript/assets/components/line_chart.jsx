import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	ScatterSeries,
	SquareMarker,
	LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
// import {
// 	OHLCTooltip,
// } from "react-stockcharts/lib/tooltip";
import CustomTooltip from './../../utils/custom_tooltip_line'
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class LineChart extends React.Component {
	render() {
		const { type, data: initialData, width, ratio, interpolation } = this.props;
		const { gridProps } = this.props;
		const margin = { left: 0, right: 0, top: 10, bottom: 10 };

		const height = 80;
		const gridHeight = height - margin.top - margin.bottom;
		const gridWidth = width - margin.left - margin.right;

		const showGrid = true;
		const yGrid = showGrid ? { innerTickSize: -1 * gridWidth } : {};
		const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {};

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 720)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={height}
				ratio={ratio}
				width={400}
				margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
				mouseMoveEvent={true}
				panEvent={true}
		    zoomEvent={true}
		    clamp={false}
			>
				<Chart id={1}
					yExtents={d => [d.high, d.low]}
				>
					{/*<XAxis
						axisAt="bottom"
						orient="bottom"

					/>
					<YAxis
						axisAt="right"
						orient="right"
						ticks={5}

					/>*/}
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<LineSeries
						yAccessor={d => d.close}
						interpolation={interpolation}
						stroke="#ff7f0e"
					/>
					<CustomTooltip forChart={1} origin={[0, 5]}/>
				</Chart>

				<CrossHairCursor />
			</ChartCanvas>

		);
	}
}

LineChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineChart.defaultProps = {
	type: "svg",
};
LineChart = fitWidth(LineChart);

export default LineChart;
