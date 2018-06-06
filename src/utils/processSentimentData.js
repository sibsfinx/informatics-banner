import { map, filter, uniq } from 'lodash';
import spacetime from 'spacetime';
import { removeSpaces, removeNonprintableChars } from './utils';

// 0 is not used.  -5 or +5 are the extreme neg/pos values.
// it is timestamp,neg,pos format correlating the timestamps in the original chat.txt file

const processSentimentData = (data) => {
  const lines = data.split('\n');
  try {
    const msgs = map(lines, (line) => {
      let msgString = line.split(',');
      return {
        timestamp: msgString[0],
        negative: msgString[1],
        positive: msgString[2],
        score: parseFloat(msgString[1]) + parseFloat(msgString[2])
      }
    })
    return msgs;
  } catch (e) {
    console.log(e);
  }
}

export default processSentimentData;
