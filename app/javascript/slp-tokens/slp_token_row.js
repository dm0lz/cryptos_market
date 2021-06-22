import React, { Component } from "react";
import { render } from "react-dom";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SlpTokenIcon from "../images/slp-icon.png";
import SlpLineChart from "./line_chart";
import * as slp_tokens_actions from "./actions";

const coinPaprikaSymbolMapper = {
  SPICE: "spice-spice",
  HONK: "honk-honk-honk",
};
class SlpTokenRow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { symbol } = this.props.token;
    if (Object.keys(coinPaprikaSymbolMapper).includes(symbol)) {
      if (this.props.tokensOhlc[symbol] === undefined) {
        this.props.fetchOhlc(coinPaprikaSymbolMapper[symbol], symbol);
      }
    }
  }

  render() {
    const { token } = this.props;
    const tokenOhlc = this.props.tokensOhlc[token.symbol] || [];
    return (
      <tr className="asset_row">
        <td>
          <span>{this.props.index + 1}</span>
        </td>
        <td>
          <div>
            {
              <img
                src={"https://tokens.bch.sx/64/" + token.genesisId + ".png"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = SlpTokenIcon;
                }}
                width="35px"
                height="35px"
              />
            }
            &nbsp;&nbsp;&nbsp;
            <span>{token.name}</span>
          </div>
        </td>
        <td>
          <span>
            <div className="badge">{token.symbol}</div>
          </span>
        </td>
        <td>
          <span>
            <NumberFormat
              value={token.transactionsNumber}
              displayType={"text"}
              thousandSeparator={true}
            ></NumberFormat>
          </span>
        </td>
        <td>
          {tokenOhlc.length ? (
            <span>
              <NumberFormat
                value={tokenOhlc[tokenOhlc.length - 1].close}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              ></NumberFormat>
            </span>
          ) : null}
        </td>
        <td>{tokenOhlc.length ? <SlpLineChart data={tokenOhlc} /> : null}</td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tokensOhlc: state.SlpTokensReducer.tokensOhlc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(slp_tokens_actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlpTokenRow);
