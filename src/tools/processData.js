import csv from 'csv';
import fs from 'fs';
import _ from 'lodash';
import spacetime from 'spacetime';
import processChatData from '../utils/processData';
import { removeSpaces, removeNonprintableChars } from '../utils/utils';

// timestamp,datetime,member,type,content,wordcount,lettercount

const CHAT_TXT_URL = './src/data/chat.txt';
const OUTPUT_FILE = './dist/chat.csv';
const PROCESSED_OUTPUT_FILE = './src/data/processed.txt';

let procPromise = new Promise((resolve, reject) => {
  fs.readFile(CHAT_TXT_URL, 'utf8', (err, data) => {
    if (err) reject(err);
    const processed = processChatData(data);
    const prepared = _.map(processed.msgs, (m) => {
      return {
        timestamp: m.timestamp,
        datetime: m.datetime.format('dmy') + ' ' + m.datetime.format('time-h24'),
        member: m.participant,
        type: 'text',
        content: m.content,
        wordcount: m.content.split(' ').length,
        lettercount: removeNonprintableChars(removeSpaces(m.content)).length
      }
    });
    resolve({prepared, processed});
  })
});

procPromise.then( ({prepared, processed}) => {
  let header = 'timestamp,datetime,member,type,content,wordcount,lettercount';
  let content = _.map(prepared, (r) => {
    return Object.values(r).join(',');
  }).join('\n');
  let filecontent = header + '\n' + content;
  fs.writeFile(OUTPUT_FILE, filecontent, function(err) {
    if (err) throw err;
    console.log("CSV file saved successfully: " + OUTPUT_FILE);
  });
  let processedContent = JSON.stringify(processed);
  fs.writeFile(PROCESSED_OUTPUT_FILE, processedContent, (err) => {
    if (err) throw err;
    console.log('Processed data saved successfully: ' + PROCESSED_OUTPUT_FILE);
  });

});
