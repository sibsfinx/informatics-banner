import React, { Component } from 'react'
import { render } from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import HoursDist from './HoursDist';
import ParticipantTimeline from './ParticipantTimeline';
import prepareData from '../utils/prepareData';
import calculateData from '../utils/calculateData';
import processChatData from '../utils/processData';
import processSentimentData from '../utils/processSentimentData';

const CHAT_TXT_URL = '../data/chat.txt';
const SENTIMENT_TEXT_URL = '../data/sentiment.txt';
const PROCESSED_TXT_URL = '../data/processed.txt';

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    let prep = $.when(
      //prepareData(CHAT_TXT_URL),
      prepareData(PROCESSED_TXT_URL),
      prepareData(SENTIMENT_TEXT_URL)
    ).then( (preprocessedData, sentimentData) => {
      //).then( (chatData, preprocessedData, sentimentData) => {
      let p = new Promise((resolve, reject) => {
        //if (err) reject(err);
        //let processedChatData = processChatData(chatData[0]);
        let processedSentimentData = processSentimentData(sentimentData[0]);
        let preprocessedChatData = JSON.parse(preprocessedData[0]);
        let calculated = calculateData({
          chatData: preprocessedChatData,
          sentimentData: processedSentimentData
        });
        resolve(calculated);
      });
      p.then( (calculated) => {
        this.setState({
          data: calculated
        });
      });
    });
  }

  handleChange(event) {
    let f = event.target.files[0];
    let reader = new FileReader();
  }

  renderGraphs() {
    if (this.state.data) {
      return (
        <div>
          <Row>
            <Col xs={4} className="content-block-sm text-center">
              Messages
              <h2 className="section-title">{this.state.data.messagesCount}</h2>
            </Col>
            <Col xs={4} className="content-block-sm text-center">
              Days
              <h2 className="section-title">{this.state.data.daysCount}</h2>
            </Col>
            <Col xs={4} className="content-block-sm text-center">
              Participants
              <h2 className="section-title">{this.state.data.participants.length}</h2>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col md={8} mdOffset={2} className="content-block-sm">
              <HoursDist data={this.state.data.hoursDist} />
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col md={8} mdOffset={2} className="content-block-sm">
              { this.state.data.timelineByParticipant.map( (p, i) =>
                <ParticipantTimeline data={p} max={this.state.data.messagesMax} />
              )}
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div>
          <div className="app-spinner-block">
            <div className="app-spinner">
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return <div>
      <div className="container">
        { this.renderGraphs() }
      </div>
    </div>
  }

}

export default Graphs;
