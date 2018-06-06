import React, { Component } from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router';
import _ from 'lodash';
import prepareData from  '../utils/prepareData';
import spacetime from 'spacetime';
import Chartjs from 'chart.js';

const HoursDist = React.createClass({
  componentDidMount() {

    this.chartOptions = {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Date'
          }
        }],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Activity (messages)'
            },
            ticks: {
              suggestedMin: 0,
              max: Math.floor(this.props.max*1.3)
            }
          },
          {
            position: 'right',
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Sentiment score per day'
            },
            ticks: {
              display: false
            }
          }
        ]
      }
    };

    const data = this.props.data.messages;

    let ctx = this.refs.barChartjs.getContext('2d');

    var gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'hsla(184, 95%, 37%, 0.3)');
    gradientFill.addColorStop(0.1, 'hsla(53, 93%, 59%, 1)');
    gradientFill.addColorStop(0.7, 'hsla(184, 95%, 37%, 0.5)');
    gradientFill.addColorStop(1, 'hsla(184, 95%, 37%, 0.3)');

    const timelineByParticipantChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: _.map( data, (d) => { return d.datetime; }),
        datasets: [
          {
            data: _.map( data, (d) => { return d.count; }),
            fill: true,
            label: 'Participant activity',
            showLine: true,
            backgroundColor: gradientFill
          },
          {
            data: _.map( data, (d) => { return d.score; }),
            fill: false,
            label: 'Message Sentiment Score',
            showLine: true,
            backgroundColor: 'hsla(0, 95%, 70%, 1)',
            borderColor: 'hsla(0, 95%, 70%, 0.5)'
          }
        ]
      },
      options: this.chartOptions
    });
  },

  render() {
    return <div>
      <h2>{this.props.data.participant}</h2>
      <section className="line-chart">
        <canvas ref="barChartjs"></canvas>
      </section>
    </div>
  }

});

export default HoursDist;
