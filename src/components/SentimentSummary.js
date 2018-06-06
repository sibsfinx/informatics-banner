import React, { Component } from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router';
import _ from 'lodash';
import prepareData from  '../utils/prepareData';
import spacetime from 'spacetime';
import Chartjs from 'chart.js';

const SentimentSummary = React.createClass({
  componentDidMount() {

    this.chartOptions = {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Sentiment'
          }
        }]
      }
    };

    const data = this.props.data;

    let ctx = this.refs.barChartjs.getContext('2d');

    // var gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    // gradientFill.addColorStop(0, 'hsla(53, 93%, 59%, 1)');
    // gradientFill.addColorStop(0.7, 'hsla(184, 95%, 37%, 0.5)');
    // gradientFill.addColorStop(1, 'hsla(184, 95%, 37%, 0.3)');

    const timelineByParticipantChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: _.map( data, (d) => { return d.datetime; }),
        datasets: [
          {
            data: _.map( data, (d) => { return d.positive; }),
            fill: true,
            label: 'Sentiment (positive)',
            showLine: true,
            backgroundColor: 'hsla(184, 95%, 37%, 0.7)'
          },
          {
            data: _.map( data, (d) => { return d.negative; }),
            fill: true,
            label: 'Sentiment (negative)',
            showLine: true,
            backgroundColor: 'hsla(5, 95%, 37%, 0.8)'
          }
        ]
      },
      options: this.chartOptions
    });

    window.timelineByParticipantChart = timelineByParticipantChart;
  },

  render() {
    return <div>
      <h2>Sentiment analysis</h2>
      <section className="line-chart">
        <canvas ref="barChartjs"></canvas>
      </section>
    </div>
  }

});

export default SentimentSummary;
