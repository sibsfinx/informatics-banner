import React, { Component } from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router';
import _ from 'lodash';
import prepareData from  '../utils/prepareData';
import spacetime from 'spacetime';
import Chartjs from 'chart.js';

const generateColors = (n) => {
  let colors = new Array;
  let i = 1;
  while (i < n + 2) {
    let color = 'hsl(' + Math.floor(50 - (i*70/n)) + ', ' + Math.floor(95 - (i*20/n)) + '%, ' + Math.floor(57 + (i*30/n)) + '%)';
    colors.push(color);
    i++;
  };
  return colors;
};


class HoursDist extends Component {
  componentDidMount() {
    this.chartOptions = {
      showLines: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Hour'
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Messages'
          }
        }]
      }
    };

    const hoursDistChart = new Chart(this.refs.barChartjs, {
      type: 'bar',
      data: {
        labels: _.map(this.props.data, (d) => { return d.hour }),
        datasets: [{
          data: _.map(this.props.data, (d) => { return d.count }),
          fill: true,
          label: 'Messages by hour',
          backgroundColor: generateColors(this.props.data.length)
        }]
      },
      options: this.chartOptions
    });

  }

  render() {
    return <div>
      <br/>
      <section className="line-chart">
        <canvas ref="barChartjs"></canvas>
      </section>

    </div>
  }

}

export default HoursDist;
