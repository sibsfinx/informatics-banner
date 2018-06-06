import _ from 'lodash';
import spacetime from 'spacetime';

window.spacetime = spacetime;

const calculateData = function({chatData, sentimentData}) {
  const merged = _.map(chatData.msgs, (d) => {
    _.assign(d, _.find(sentimentData, {timestamp: d.timestamp.toString()}));
    return d;
  });
  let messagesCount = chatData.msgs.length;
  let daysCount = _.uniq(_.map(chatData.msgs, (m) => {
    return spacetime(m.datetime.epoch).hour();
  })).length;
  const participants = chatData.participants;
  let hoursCount = _.countBy(chatData.msgs, (m) => {
    return spacetime(m.datetime.epoch).hour();
  });
  let hoursDist = _.map(hoursCount, (k, v) => {
    return {
      hour: v,
      count: k
    }
  });
  let participant = chatData.participants[0];

  let messagesByParticipant = _.map(chatData.participants, (p) => {
    let messages = _.filter(merged, (m) => {
      return m.participant === p;
    });
    return {
      participant: p,
      messages
    };
  });
  let timelineByParticipant = _.map( messagesByParticipant, (mbp) => {
    let msgCount = _.map( _.countBy(mbp.messages, (m) => {
        //return m.datetime.format('numeric-uk');
        return spacetime(m.datetime.epoch).format('numeric-uk');
      }), (k, v) => {
        return {
          datetime: v,
          count: k
        }
    });
    let sentimentSums =  _.groupBy(mbp.messages, (m) => {
      //return m.datetime.format('numeric-uk')
      return spacetime(m.datetime.epoch).format('numeric-uk')
    });
    let sentiment = _.map(sentimentSums, (k, v) => {
      return {
        datetime: v,
        score: _.sumBy(k, 'score'),
      }
    });
    //let sentimentSorted = _.sortBy(sentiment, 'datetime');
    let sentimentSorted = _.sortBy(sentiment, (s) => {
      let dt = s.datetime.split('/');
      return spacetime(dt[1] + '/' + dt[0] + '/' + dt[2]).epoch;
    });
    window._sentimentSorted = sentimentSorted;
    let sentimentCumulative = _.map( sentimentSorted, (sent, index) => {
      let cumulative = 0;
      let sums = _.map( window._sentimentSorted.slice(0, index + 1), (s) => {
          if (s.score) {
            cumulative += s.score;
          }
          return cumulative;
      });
      return {
        datetime: sent.datetime,
        score: cumulative
      };
    });
    let mergedMsgs =  _.map(msgCount, (d) => {
      _.assign(d, _.find(sentimentCumulative, {datetime: d.datetime.toString()}));
      return d;
    });
    return {
      participant: mbp.participant,
      messages: _.map(mergedMsgs, (m) => {
        return {
          count: m.count,
          score: m.score,
          datetime: m.datetime
        }
      }),
      maxCount:  _.maxBy(mergedMsgs, (m) => { return m.count; } ).count,
      maxSentiment: _.maxBy(mergedMsgs, (m) => { return m.score; } ).score
    }
  });
  let maxCount = _.maxBy(timelineByParticipant, 'maxCount').maxCount;
  let maxSentiment = _.maxBy(timelineByParticipant, 'maxSentiment').maxSentiment;
  let messagesMax = Math.max(maxCount, maxSentiment);
  let output = {
    messagesCount,
    daysCount,
    hoursDist,
    participants,
    timelineByParticipant,
    messagesMax
  }
  return output;
};

export default calculateData;

