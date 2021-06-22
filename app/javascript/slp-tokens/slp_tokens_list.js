import React, { Component } from "react";
import { render } from "react-dom";
import { Table } from "react-bootstrap";
import SlpTokenRow from "./slp_token_row";

class SlpTokensList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table responsive condensed hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Number of transactions </th>
            <th>Price</th>
            <th>Last 6 months</th>
          </tr>
        </thead>
        <tbody>
          {this.props.slpTokens &&
            this.props.slpTokens.map((token, index) => {
              return (
                <SlpTokenRow
                  token={token}
                  index={index}
                  key={index}
                ></SlpTokenRow>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default SlpTokensList;
