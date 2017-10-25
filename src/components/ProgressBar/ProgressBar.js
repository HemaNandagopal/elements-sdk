import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

export default class ProgressBar extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    type: PropTypes.oneOf(['default', 'animated']),
    alignLabel: PropTypes.oneOf(['left', 'center', 'right']),
    labelText: PropTypes.string,
    id: PropTypes.string.isRequired
  };

  static defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    type: 'default',
    alignLabel: 'center'
  };

  calculateRatio() {
    if (this.props.value < this.props.min) return this.props.min;
    if (this.props.value > this.props.max) return this.props.max;
    return Math.round((this.props.value - this.props.min) / (this.props.max - this.props.min) * 100);
  }

  render() {
    const { min, max, type, alignLabel, labelText, id } = this.props;

    return (
      <div className={`progress-bar-container progress-bar-text-${alignLabel}`}>
        <label className="pe-label" htmlFor={id}>
          {this.calculateRatio()}{labelText}
        </label>
        <span className="pe-progress-bar-rail">
          <div
            id={id}
            className={type === 'animated' ? 'pe-progress-bar pb-animated' : 'pe-progress-bar'}
            tabIndex="-1"
            role="progressbar"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={this.calculateRatio()}
            style={{width: `${this.calculateRatio()}%`}}
          />
        </span>
      </div>
    )
  }
}
